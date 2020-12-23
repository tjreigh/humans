import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '../types/item';
import { db } from './util/db';
import { cleanBody, expectMethod, incNextId, purge, VercelFunc } from './util/funcs';

export default async (req: NowRequest, res: NowResponse): VercelFunc => {
	if (!db) return;
	expectMethod(req, res, 'PUT');

	await purge();

	const { items } = cleanBody(req, res);
	const dateNow = Date.now();
	const newItems: Item[] = [];
	let nextId = (await incNextId(0)) as number;

	items.forEach((itm: Item) => {
		const obj = {
			id: nextId,
			img: itm.img,
			desc: itm.desc,
			date: dateNow,
		};

		if (nextId) nextId++;

		// Check obj for any undefined values and return property name of any
		Object.values(obj).every((x, idx) => {
			if (x == null) {
				res.status(422).send(`Request body is missing property "${Object.keys(obj)[idx]}"`);
				return false;
			}
			return true;
		});

		newItems.push(obj as Item);
	});

	newItems.map(async itm => await db?.put(itm, itm.id.toString()));
	return res.status(204);
};
