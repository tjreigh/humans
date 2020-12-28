import { NowRequest, NowResponse } from '@vercel/node';
import { auth as db } from 'api/util/db';
import { cleanBody, LoginBody, tryHandleFunc, DBInitError, SyncVercelReturn } from 'api/util/funcs';

const handle = (req: NowRequest, res: NowResponse): SyncVercelReturn => {
	if (!db) throw new DBInitError('Database initialization failed');

	const body = cleanBody<LoginBody>(req);
};

export default tryHandleFunc(handle, 'POST');
