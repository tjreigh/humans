import { Deta, DetaBase, DetaInstance } from 'deta';

const key = process.env?.DETA_KEY;
let deta: DetaInstance;
let db: DetaBase | null = null;
let auth: DetaBase | null = null;

// Disclaimer: this is not good
try {
	deta = Deta(key!);
	db = deta.Base('humans');
	auth = deta.Base('auth');
} catch (e) {
	console.warn(`Failed to register Deta instance: ${e}`);
}

export { db, auth };
