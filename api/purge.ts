import { NowRequest, NowResponse } from '@vercel/node';
import { db } from './util/db';

export default (req: NowRequest, res: NowResponse) => {
	db.reset().sync();
	res.send('OK');
};
