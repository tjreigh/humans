import { NowRequest, NowResponse } from '@vercel/node';
import { Item } from '../../types/item';
import { db } from './db';

interface _IDObj {
	id: number;
}

class InvalidJSONError extends Error {
	constructor(args?: string) {
		super(args);
	}
}

export type AsyncVercelReturn = Promise<NowResponse | undefined>;
export type AsyncVercelFunc = (req: NowRequest, res: NowResponse) => AsyncVercelReturn;

export type LoginBody = {
	user: string;
	pass: string;
};

export const tryHandleFunc = async (
	req: NowRequest,
	res: NowResponse,
	handle: AsyncVercelFunc
): AsyncVercelReturn => {
	try {
		await handle(req, res);
	} catch (err) {
		if (err instanceof InvalidJSONError) return res.status(422).send('Malformed JSON');
		return res.status(500).send(`Uncaught internal server error: \n${err}`);
	}
};

/**
 * Fetches the nextId value from the database
 * @returns The nextId value from the database
 */
export const getNextId = async (): Promise<number> => {
	if (!db) throw Error('Database instantiation failed');
	const idObj = (await db.get('nextId')) as _IDObj;
	return idObj?.id ?? null;
};

/**
 * Increments or resets the nextId value in the database
 * @param base - If provided, nextId will be reset to this value;
 * if not provided, existing value will be incremented
 * @returns The value nextId is set to
 */
export const incNextId = async (base?: number): Promise<number> => {
	if (!db) throw Error('Database instantiation failed');
	// Add nextId to db if doesn't already exist
	if (!(await getNextId())) {
		await db.put({ id: 1 }, 'nextId');
		return 1;
	}

	const updates = {
		id: base ?? db.util.increment(),
	};

	await db.update(updates, 'nextId');
	const id = await getNextId();
	return id;
};

/**
 * Attempt to parse the request body of a Vercel serverless function
 * @param req - Vercel serverless function request object
 * @returns Attempted parsed body (possibly an error)
 */
export const cleanBody = <T>(req: NowRequest): T => {
	try {
		return JSON.parse(req.body) as T;
	} catch (err) {
		throw new InvalidJSONError('Malformed JSON');
	}
};

export const purge = async (): Promise<void> => {
	if (!db) throw Error('Database instantiation failed');
	const results = await db.fetch();
	const data: Item[] = [];

	for await (const res of results) {
		data.push(res as any);
	}

	await Promise.all(data.flat().map(item => db?.delete(item.id.toString())));
};

/**
 * Checks if a request's HTTP method matches a provided expected method
 * @param req - Vercel serverless function request object
 * @param res - Vercel serverless function response object
 * @param method - Expected HTTP method
 * @returns If method does not match, returns HTTP 405 response with expected method
 */
export const expectMethod = (
	req: NowRequest,
	res: NowResponse,
	method: string
): void | NowResponse => {
	if (req.method?.toUpperCase() !== method)
		return res.status(405).send(`Invalid HTTP method (expected ${method})`);
};

export const expectAuth = (req: NowRequest, res: NowResponse): string | NowResponse => {
	const authHeader = req.headers?.authorization;
	if (!authHeader?.startsWith('Basic'))
		return res.status(401).send('This method requires authentication');
	return authHeader
		.split(' ')
		.slice(1, 2)
		.toString();
};

export const isItem = (item: unknown): item is Item => {
	const keys = ['id', 'img', 'desc'];
	return item ? keys.every(key => Object.prototype.hasOwnProperty.call(item, key)) : false;
};
