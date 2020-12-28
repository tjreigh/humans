import { NowRequest, NowResponse } from '@vercel/node';
import { purge, AsyncVercelReturn, tryHandleFunc } from './util/funcs';

const handle = async (req: NowRequest, res: NowResponse): AsyncVercelReturn => {
	await purge();
	console.log('purged');
	return res.status(204).send('Purged');
};

export default tryHandleFunc(handle, 'PURGE');
