import { NowRequest, NowResponse } from '@vercel/node';
import { DetaBaseUpdates } from 'deta';
import { Item } from '../types';
import { db } from './util/db';
import { cleanBody, AsyncVercelReturn, tryHandleFunc, DBInitError } from './util/funcs';

type EditBody = {
	id: string;
	img: string;
	desc: string;
};

// TODO: handle updates for nonexistent props
const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	if (!db) throw new DBInitError();
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

export default tryHandleFunc(handle, 'PUT');
