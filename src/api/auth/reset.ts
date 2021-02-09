import { NowRequest, NowResponse } from '@vercel/node';
import { users, cleanBody, tryHandleFunc, DBInitError, NowReturn } from '@util';
import { User } from '@typings';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	if (!users) throw new DBInitError();

	const body = cleanBody<User>(req);
	if (!body.resetPayload) throw new Error('');

	const dbUser = (await users.get('')) as User;

	res.status(201).send('');
};

export default tryHandleFunc(handle, 'POST');
