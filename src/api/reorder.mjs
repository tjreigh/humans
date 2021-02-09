import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('hi');

const { items } = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json'), 'utf8'));

const newItems = [];

for (const item of items) {
	const newItem = {
		loc: 'lhs',
		...item,
	};

	newItems.push(newItem);
}

const newObj = { items: newItems };

//console.log(newObj);

fs.writeFile(path.join(__dirname, 'items.json'), JSON.stringify(newObj, null, 2), err => {
	if (err) console.log(err);
});
