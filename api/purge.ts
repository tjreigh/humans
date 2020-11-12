import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';
import { Item } from '../types/item';

export const purge = async () => {
	const data = db.fetch() as any;
	const items: Item[] = data.items;

	for (const i of items) {
		await db.delete(i.id.toString());
	}
};

export default (req: NowRequest, res: NowResponse) => {
	if (req.method?.toUpperCase() !== 'PURGE')
		return res.status(405).send('Invalid HTTP method (expected PURGE)');

	purge();
	res.status(204).send('Database purged');
};
