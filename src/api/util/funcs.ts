import { NowRequest, NowResponse } from '@vercel/node';
import { parse } from 'cookie';
import { Item } from '@app/web/types';
import { db, sessions } from './db';

interface _IDObj {
	id: number;
}

class InvalidJSONError extends Error {
	constructor(args?: string) {
		super(args ?? 'Malformed JSON');
	}
}

export class DBInitError extends Error {
	constructor(args?: string) {
		super(args ?? 'Database initialization failed');
	}
}

export type NowReturn = Promise<void | NowResponse>;
export type NowFunc = (req: NowRequest, res: NowResponse) => NowReturn;

export const tryHandleFunc = (
	handle: NowFunc,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PURGE'
) => async (req: NowRequest, res: NowResponse): NowReturn => {
	if (req.method?.toUpperCase() !== method) {
		return res.status(405).send(`Invalid HTTP method (expected ${method})`);
	}

	try {
		if (!process.env.NODE_ENV) return;
		await handle(req, res);
	} catch (err) {
		const stackOrObj = err.stack ?? err;
		if (err instanceof InvalidJSONError) return res.status(422).send(stackOrObj);
		else if (err instanceof DBInitError) return res.status(503).send(stackOrObj);
		return res.status(500).send(`Uncaught internal server error: \n${stackOrObj}`);
	}
};

export const expectAuth = (handle: NowFunc) => async (
	req: NowRequest,
	res: NowResponse
): NowReturn => {
	const rawCookies = req.headers.cookie!.split('; ');
	const session = rawCookies.find(c => {
		const split = c.split('=');
		if (split[0] === 'session') return split[1];
		return undefined;
	});

	if (!session) return res.status(401).send('Expected authorization');

	const dbSession = await sessions?.get(session);

	if (!(dbSession === session)) return res.status(403).send('Session not authenticated');

	return handle(req, res);
};

/**
 * Fetches the nextId value from the database
 * @returns The nextId value from the database
 */
export const getNextId = async (): Promise<number> => {
	if (!db) throw new DBInitError();
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
	if (!db) throw new DBInitError();
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
	if (!db) throw new DBInitError();
	const results = await db.fetch();
	const data: Item[] = [];

	for await (const res of results) {
		data.push(res as any);
	}

	await Promise.all(data.flat().map(item => db?.delete(item.id.toString())));
};

export const isItem = (item: unknown): item is Item => {
	const keys = ['id', 'img', 'desc'];
	return item ? keys.every(key => Object.prototype.hasOwnProperty.call(item, key)) : false;
};
