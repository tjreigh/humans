import { NowRequest, NowResponse } from '@vercel/node';
import { compare } from 'bcryptjs';
import { auth as db } from '../util/db';
import { cleanBody, AsyncVercelReturn, LoginBody, tryHandleFunc, DBInitError } from '../util/funcs';

const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	if (!db) throw new DBInitError('Database initialization failed');

	const body = cleanBody<LoginBody>(req);
	const username = body?.user as string;
	const pass = body?.pass as string;

	const dbPass = (await db.get(username)) as string;

	const match = await compare(pass, dbPass);
	if (match) return res.status(200);
};

export default tryHandleFunc(handle, 'POST');
