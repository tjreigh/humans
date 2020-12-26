import { NowRequest, NowResponse } from '@vercel/node';
import { expectMethod, purge, AsyncVercelReturn, tryHandleFunc } from './util/funcs';

const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	expectMethod(req, res, 'PURGE');

	await purge();
	console.log('purged');
	return res.status(204).send('Purged');
};

export default (req: NowRequest, res: NowResponse) => tryHandleFunc(req, res, handle);
