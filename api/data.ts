import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';
import { Item } from '../types/item';

export default async (req: NowRequest, res: NowResponse) => {
	if (req.method?.toUpperCase() !== 'GET')
		return res.status(405).send('Invalid HTTP method (expected GET)');

	const results = await db.fetch();
	const data: Item[] = [];

	for await (const result of results) {
		data.push(result as any);
	}

	res.json(data);
};
