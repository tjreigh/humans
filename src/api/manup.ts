import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '@typings';
import { db, cleanBody, incNextId, purge, NowReturn, tryHandleFunc, DBInitError } from '@util';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	if (!db) throw new DBInitError();

	await purge();

	const { items } = cleanBody<{ items: Item[] }>(req);
	const dateNow = Date.now();
	const newItems: Item[] = [];
	let nextId = await incNextId(0);

	for (const itm of items) {
		const loc = itm.img
			.toLowerCase()
			.trim()
			.startsWith('http')
			? 'other'
			: '';

		const obj: Item = {
			id: itm.id ?? nextId,
			img: itm.img,
			loc: itm.loc ?? loc,
			desc: itm.desc,
			date: itm.date ?? dateNow,
		};

		nextId++;

		// Check obj for any undefined values and return property name of any
		for (const [key, value] of Object.entries(obj)) {
			if (value == null) {
				return res.status(422).send(`Request body is missing property "${key}"`);
			}
		}

		newItems.push(obj);
	}

	console.log(newItems);
	await incNextId(nextId);
	await Promise.all(newItems.map(itm => db?.put(itm, itm.id.toString())));
	console.log('done');
	return res.status(201).json(newItems);
};

export default tryHandleFunc(handle, 'PUT');
