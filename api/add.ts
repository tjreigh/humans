import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';

export default (req: NowRequest, res: NowResponse) => {
	const { body } = req;
	console.log(body);
	const clean = JSON.parse(body);

	const obj = {
		id: db.data.items[0].id + 1,
		img: clean.img,
		desc: clean.desc,
	};

	db.data.items.unshift(obj);

	if (!Object.values(obj).every(e => e)) return res.status(422).send('Request body has undefined properties');
	console.log(obj);
	db.sync();
	res.send('OK');
};
