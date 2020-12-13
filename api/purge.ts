import { NowRequest, NowResponse } from '@vercel/node';
import { expectMethod, purge } from './util/funcs';

export default async (req: NowRequest, res: NowResponse) => {
	expectMethod(req, res, 'PURGE');

	await purge();
	res.status(204);
};
