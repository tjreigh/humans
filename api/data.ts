import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';
import { Item } from '../types/item';
import { AsyncVercelReturn, tryHandleFunc, DBInitError } from './util/funcs';

const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	if (!db) throw new DBInitError('Database initialization failed');

	const results = await db.fetch();
	const data: Item[] = [];

	for await (const result of results) {
		data.push(result as any);
	}

	return res.json(data.flat());
};

export default tryHandleFunc(handle, 'GET');
