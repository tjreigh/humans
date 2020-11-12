import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';
import { cleanBody } from './add';

export default async (req: NowRequest, res: NowResponse) => {
	if (req.method?.toUpperCase() !== 'DELETE')
		return res.status(405).send('Invalid HTTP method (expected DELETE)');

	const body = cleanBody(req, res);

	const item = await db.get(body.id);
	if (!item) return res.status(404).send(`Item with id ${body.id} does not exist`);

	await db.delete(body.id);
	res.json(item);
};
