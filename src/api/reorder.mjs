import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { items } = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json'), 'utf8'));

let count = 0;

for (const item of items) {
	item.id = count;
	count++;
}
