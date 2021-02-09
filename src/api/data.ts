import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '@typings';
import { db, NowReturn, tryHandleFunc, DBInitError, isItem } from '@util';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	if (!db) throw new DBInitError();

	const results = await db.fetch();
	const rawData: Item[] = [];

	for await (const result of results) {
		rawData.push(result as any);
	}

	// Sort items in descending order by ID
	const sorted = rawData.flat().sort((a, b) => {
		if (a && b) {
			return b.id - a.id;
		} else return -1;
	});

	const items = sorted.filter(itm => isItem(itm));

	return res.json(items);
};

export default tryHandleFunc(handle, 'GET');
