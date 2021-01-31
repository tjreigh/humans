import { isItem } from 'api/util/funcs';
import { Item } from '@api/node_modules/@app/web/types';

function prepareItem(item: Item): Item | undefined {
	if (!isItem(item)) return;

	// Append domain to paths without it, ignore paths that already have domain
	if (item.img.match(/^\/?media\//)) item.img = `https://legacystudentmedia.com/${item.img}`;
	return item;
}

export async function getItems(): Promise<Item[]> {
	const req = await fetch('/api/data');
	const data: Item[] = await req.json();

	console.log(data);

	const items = data.map(item => prepareItem(item));

	// Sort items in descending order by ID
	const sorted = items.sort((a, b) => {
		if (a && b) {
			return b.id - a.id;
		} else return -1;
	});

	return sorted.filter(itm => isItem(itm)) as Item[];
}
