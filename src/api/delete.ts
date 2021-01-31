import { NowRequest, NowResponse } from '@vercel/node';
import { db } from '@api/util/db';
import { cleanBody, expectAuth, NowReturn, tryHandleFunc, DBInitError } from '@api/util/funcs';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	if (!db) throw new DBInitError();

	const body = cleanBody<{ id: string }>(req);

	const item = await db.get(body.id);
	if (!item) return res.status(404).send(`Item with id ${body.id} does not exist`);

	await db.delete(body.id);
	res.json(item);
};

export default tryHandleFunc(handle, 'DELETE');
