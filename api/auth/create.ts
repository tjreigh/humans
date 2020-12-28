import { NowRequest, NowResponse } from '@vercel/node';
import { auth as db } from '../util/db';
import { hash } from 'bcryptjs';
import { cleanBody, AsyncVercelReturn, LoginBody, tryHandleFunc, DBInitError } from '../util/funcs';

const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	if (!db) throw new DBInitError('Database initialization failed');

	const body = cleanBody<LoginBody>(req);

	const hashed = await hash(body.pass, 10);
	//db.put();
	return res.status(201);
};

export default tryHandleFunc(handle, 'POST');
