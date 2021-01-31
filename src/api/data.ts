import { NowRequest, NowResponse } from '@vercel/node';
import { db } from '@api/util/db';
import { Item } from '@typings';
import { NowReturn, tryHandleFunc, DBInitError } from '@api/util/funcs';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	if (!db) throw new DBInitError();

	const results = await db.fetch();
	const data: Item[] = [];

	for await (const result of results) {
		data.push(result as any);
	}

	return res.json(data.flat());
};

export default tryHandleFunc(handle, 'GET');
