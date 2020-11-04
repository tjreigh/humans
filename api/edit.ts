import { NowRequest, NowResponse } from '@vercel/node';
import { db, findItem } from './util/db';

export default (req: NowRequest, res: NowResponse) => {
	const { body } = req;
	const clean = JSON.parse(body);

	const item = findItem(clean.id);
	if (!item) return res.status(404).send(`Item with id ${clean.id} does not exist`);

	if (clean.img != null) item.img = clean.img;
	if (clean.desc != null) item.desc = clean.desc;

	db.sync();
};
