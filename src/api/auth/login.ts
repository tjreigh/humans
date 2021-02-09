import { NowRequest, NowResponse } from '@vercel/node';
import { compare } from 'bcryptjs';
import { sessions, users, cleanBody, NowReturn, tryHandleFunc, DBInitError } from '@util';
import { User, Session } from '@typings';
import { v4 as uuidv4 } from 'uuid';
import { serialize } from 'cookie';
import { addDays } from 'date-fns';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	if (!users || !sessions) throw new DBInitError();

	const body = cleanBody<{ payload: string }>(req);
	const rawBinary = Buffer.from(body.payload, 'base64').toString('utf8');
	const [username, password] = rawBinary.split(':');

	const dbUser = (await users.get(username)) as User;

	const match = await compare(password, dbUser.password);

	if (match) {
		const qTrySession = await sessions?.fetch({ username }, 1, 1);
		let sess = [];

		for await (const s of qTrySession) {
			sess.push((s as unknown) as Session);
		}

		sess = sess.flat();

		if (sess.length > 0) await sessions.delete(sess[0].key);

		const sessionId = uuidv4();

		const expires = addDays(new Date(Date.now()), 7);
		const cookie = serialize('session', sessionId, { expires, httpOnly: true, secure: true });
		res.setHeader('Set-Cookie', [cookie]);

		sessions.put(dbUser, sessionId);

		return res.status(200).send('');
	}

	return res.status(403).send('Account with username and password not found');
};

export default tryHandleFunc(handle, 'POST');
