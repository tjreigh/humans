import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '../types/item';
import { db } from './util/db';
import {
	cleanBody,
	expectMethod,
	getNextId,
	incNextId,
	AsyncVercelReturn,
	tryHandleFunc,
} from './util/funcs';

const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	if (!db) return;
	expectMethod(req, res, 'POST');

	const body = cleanBody<Item>(req);
	const nextId = (await getNextId()) ?? 0;

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

	await db.put(obj, nextId.toString());
	await incNextId();
	res.status(201).json(obj);
};

export default (req: NowRequest, res: NowResponse) => tryHandleFunc(req, res, handle);
