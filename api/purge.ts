import { NowRequest, NowResponse } from '@vercel/node';
import { expectMethod, purge, VercelFunc } from './util/funcs';

export default async (req: NowRequest, res: NowResponse): VercelFunc => {
	expectMethod(req, res, 'PURGE');

	await purge();
	return res.status(204);
};
