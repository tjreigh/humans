import { NowRequest, NowResponse } from '@vercel/node';
import { hash } from 'bcryptjs';
import { users, sessions, cleanBody, NowReturn, tryHandleFunc, DBInitError } from '@util';
import { User } from '@typings';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	if (!users) throw new DBInitError();

	const body = cleanBody<{ payload: string }>(req);
	const decodedBody = Buffer.from(body.payload, 'base64').toString('utf8');
	const [username, password, email, strLevel] = decodedBody.split(':');
	const authLevel = parseInt(strLevel);

	const tryUser = await users.get(username);
	if (tryUser) return res.status(409).send(`User with username "${username}" already exists`);

	console.log(body);
	console.log(decodedBody);
	console.log(password);

	const hashedPassword = await hash(password, 10);
	const trySession = await sessions?.fetch({ username });

	if (trySession) return res.status(409).send(``);

	const user: User = {
		username,
		password: hashedPassword,
		email,
		authLevel,
	};

	await users.put(user, username);

	return res.status(201).send('User created');
};

export default tryHandleFunc(handle, 'POST');
