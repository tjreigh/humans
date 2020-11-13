import { NowRequest, NowResponse } from '@vercel/node';
import { purge } from './util/funcs';

export default (req: NowRequest, res: NowResponse) => {
	if (req.method?.toUpperCase() !== 'PURGE')
		return res.status(405).send('Invalid HTTP method (expected PURGE)');

	purge();
	res.status(204).send('Database purged');
};
