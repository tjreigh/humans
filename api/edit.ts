import { NowRequest, NowResponse } from '@vercel/node';
import { DetaBaseUpdates } from 'deta';
import { Item } from '../types/item';
import { db } from './util/db';
import { cleanBody, expectMethod } from './util/funcs';

// TODO: handle updates for nonexistent props
export default async (req: NowRequest, res: NowResponse) => {
	expectMethod(req, res, 'PUT');

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
