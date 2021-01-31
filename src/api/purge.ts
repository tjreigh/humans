import { NowRequest, NowResponse } from '@vercel/node';
import { purge, NowReturn, tryHandleFunc } from '@api/util/funcs';

const handle = async (req: NowRequest, res: NowResponse): NowReturn => {
	await purge();
	console.log('purged');
	return res.status(204).send('Purged');
};

export default tryHandleFunc(handle, 'PURGE');
