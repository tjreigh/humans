import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '../../types/item';
import { db } from './db';

interface _IDObj {
	id: number;
}

export const getNextId = async () => {
	const idObj = (await db.get('nextId')) as _IDObj;
	return idObj.id;
};

export const incNextId = async () => {
	const updates = {
		id: db.util.increment(),
	};

	await db.update(updates, 'nextId');
};

export const cleanBody = (req: NowRequest, res: NowResponse) => {
	try {
		return JSON.parse(req.body);
	} catch {
		return res.status(400).send('Malformed JSON');
	}
};

export const purge = async () => {
	const data = db.fetch() as any;
	const items: Item[] = data.items;

	for (const i of items) {
		await db.delete(i.id.toString());
	}
};
