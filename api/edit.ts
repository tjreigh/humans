import { NowRequest, NowResponse } from '@vercel/node';
import { DetaBaseUpdates } from 'deta';
import { Item } from '../types/item';
import { db } from './util/db';
import { cleanBody, expectMethod, AsyncVercelReturn, tryHandleFunc } from './util/funcs';

type EditBody = {
	id: string;
	img: string;
	desc: string;
};

// TODO: handle updates for nonexistent props
const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	if (!db) return;
	expectMethod(req, res, 'PUT');

	const { id, img, desc } = cleanBody<EditBody>(req);

	const item = await db.get(id);
	if (!item) return res.status(404).send(`Item with id ${id} does not exist`);

	const updates: Partial<Item> = {
		img: img ?? undefined,
		desc: desc ?? undefined,
	};

	await db.update(updates as DetaBaseUpdates, id);
	res.status(204).send('Updated');
};

export default (req: NowRequest, res: NowResponse) => tryHandleFunc(req, res, handle);
