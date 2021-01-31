import { Deta, DetaBase, DetaInstance } from 'deta';

const key = process.env?.DETA_KEY;
let deta: DetaInstance;
let db: DetaBase | null = null;
let users: DetaBase | null = null;
let sessions: DetaBase | null = null;

// Disclaimer: this is not good
try {
	deta = Deta(key!);
	db = deta.Base('humans');
	users = deta.Base('users');
	sessions = deta.Base('sessions');
} catch (e) {
	console.warn(`Failed to register Deta instance: ${e}`);
}

export { db, users, sessions };
