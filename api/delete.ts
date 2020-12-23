import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';
import { cleanBody, expectAuth, expectMethod, VercelFunc } from './util/funcs';

export default async (req: NowRequest, res: NowResponse): VercelFunc => {
	if (!db) return;
	expectMethod(req, res, 'DELETE');
	expectAuth(req, res);

	const body = cleanBody(req, res);

	const item = await db.get(body.id);
	if (!item) return res.status(404).send(`Item with id ${body.id} does not exist`);

	await db.delete(body.id);
	res.json(item);
};
