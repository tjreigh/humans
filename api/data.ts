import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';

export default (req: NowRequest, res: NowResponse) => {
	res.json(db.data);
	console.log('Sent data');
};
