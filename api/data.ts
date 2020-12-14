import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';
import { Item } from '../types/item';
import { expectMethod } from './util/funcs';

export default async (req: NowRequest, res: NowResponse) => {
	if (!db) return;
	expectMethod(req, res, 'GET');

	const results = await db.fetch();
	const data: Item[] = [];

	for await (const result of results) {
		data.push(result as any);
	}

	res.json(data.flat());
};
