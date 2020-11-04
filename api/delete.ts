import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';

export default (req: NowRequest, res: NowResponse) => {
	const { body } = req;
	const clean = JSON.parse(body);

	const item = db.data.items.find(item => item.id === clean.id);
	if (!item) return res.status(404).send(`Item with id ${clean.id} does not exist`);

	db.data.items = db.data.items.filter(item => item.id !== clean.id);

	db.sync();
	res.json(item);
};
