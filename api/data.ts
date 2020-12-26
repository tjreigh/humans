import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';
import { Item } from '../types/item';
import { expectMethod, AsyncVercelReturn, tryHandleFunc } from './util/funcs';

const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	if (!db) return;
	expectMethod(req, res, 'GET');

	const results = await db.fetch();
	const data: Item[] = [];

	for await (const result of results) {
		data.push(result as any);
	}

	return res.json(data.flat());
};

export default (req: NowRequest, res: NowResponse) => tryHandleFunc(req, res, handle);
