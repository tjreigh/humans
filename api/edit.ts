import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '../types/item';
import { db } from './util/db';
import { cleanBody } from './add';
import { DetaBaseUpdates } from 'deta';

export default async (req: NowRequest, res: NowResponse) => {
	if (req.method?.toUpperCase() !== 'PUT')
		return res.status(405).send('Invalid HTTP method (expected PUT)');

	const body = cleanBody(req, res);

	const item = await db.get(body.id);
	if (!item) return res.status(404).send(`Item with id ${body.id} does not exist`);

	const updates: Partial<Item> = {
		img: body.img ?? undefined,
		desc: body.desc ?? undefined,
	};

	await db.update(updates as DetaBaseUpdates, body.id);
	res.status(204).send('Updated');
};
