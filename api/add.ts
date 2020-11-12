import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '../types/item';
import { db } from './util/db';

export const cleanBody = (req: NowRequest, res: NowResponse) => {
	const { body } = req;
	let clean;

	try {
		clean = JSON.parse(body);
	} catch {
		return res.status(400).send('Malformed JSON');
	}

	return clean;
};

interface IDObj {
	id: number;
}

export default async (req: NowRequest, res: NowResponse) => {
	if (req.method?.toUpperCase() !== 'POST')
		return res.status(405).send('Invalid HTTP method (expected POST)');

	const body: Item = cleanBody(req, res);

	const idObj = (await db.get('nextId')) as IDObj;
	const nextId = idObj.id;

	const obj = {
		id: nextId,
		img: body.img,
		desc: body.desc,
		date: Date.now(),
	};

	Object.values(obj).every((x, idx) => {
		if (x == null) {
			res.status(422).send(`Request body is missing property "${Object.keys(obj)[idx]}"`);
			return false;
		}
		return true;
	});

	const updates = {
		id: db.util.increment(),
	};

	await db.put(obj, nextId.toString());
	await db.update(updates, 'nextId');
	res.json(obj);
};
