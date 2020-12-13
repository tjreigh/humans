import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '../../types/item';
import { db } from './db';

interface _IDObj {
	id: number;
}

/**
 * Fetches the nextId value from the database
 * @returns The nextId value from the database
 */
export const getNextId = async () => {
	const idObj = (await db.get('nextId')) as _IDObj;
	return idObj?.id ?? 0;
};

/**
 * Increments or resets the nextId value in the database
 * @param base - If provided, nextId will be reset to this value;
 * if not provided, existing value will be incremented
 * @returns The value nextId is set to
 */
export const incNextId = async (base?: number) => {
	// Add nextId to db if doesn't already exist
	if ((await getNextId()) === 0) {
		await db.put({ id: 1 }, 'nextId');
		return 0;
	}

	const updates = {
		id: base ?? db.util.increment(),
	};

	await db.update(updates, 'nextId');
	return parseInt(JSON.stringify(updates.id));
};

/**
 * Attempt to parse the request body of a Vercel serverless function
 * @param req - Vercel serverless function request object
 * @param res - Vercel serverless function response object
 * @returns If parsing succeeds, returns parsed body; otherwise returns HTTP 400 response
 */
export const cleanBody = (req: NowRequest, res: NowResponse) => {
	try {
		return JSON.parse(req.body);
	} catch {
		return res.status(400).send('Malformed JSON');
	}
};

export const purge = async () => {
	const results = await db.fetch();
	const data: Array<Item[]> = [];

	for await (const res of results) {
		data.push(res as any);
	}

	for await (const item of data) {
		item.forEach(async item => await db.delete(item.id.toString()));
		//await db.delete(item.id.toString());
	}
};

/**
 * Checks if a request's HTTP method matches a provided expected method
 * @param req - Vercel serverless function request object
 * @param res - Vercel serverless function response object
 * @param method - Expected HTTP method
 * @returns If method does not match, returns HTTP 405 response with expected method
 */
export const expectMethod = (req: NowRequest, res: NowResponse, method: string) => {
	if (req.method?.toUpperCase() !== method)
		return res.status(405).send(`Invalid HTTP method (expected ${method})`);
};

export const isItem = (item: any): item is Item => {
	const keys = ['id', 'img', 'desc'];
	return item ? keys.every(key => Object.prototype.hasOwnProperty.call(item, key)) : false;
};
