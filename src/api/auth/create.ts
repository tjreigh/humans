import { NowRequest, NowResponse } from '@vercel/node';
import { users, sessions } from '@api/util/db';
import { hash } from 'bcryptjs';
import { cleanBody, NowReturn, tryHandleFunc, DBInitError } from '@api/util/funcs';
import { User } from '@typings';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	if (!users) throw new DBInitError();

	const body = cleanBody<{ payload: string }>(req);
	const decodedBody = Buffer.from(body.payload, 'base64').toString('utf8');
	const [username, password, email] = decodedBody.split(':');

	const tryUser = await users.get(username);
	if (tryUser) return res.status(409).send(`User with username "${username}" already exists`);

	console.log(body);
	console.log(decodedBody);
	console.log(password);
	const hashedPassword = await hash(password, 10);
	const trySession = await sessions?.fetch({ password: hashedPassword });

	//if (trySession) return res.stat

	const user: User = {
		username,
		password: hashedPassword,
		email,
	};

	await users.put(user, username);

	return res.status(201).send('User created');
};

export default tryHandleFunc(handle, 'POST');
