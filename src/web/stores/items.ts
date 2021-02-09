import { isItem } from '@util';
import { Item } from '@typings';

function prepareItem(item: Item): Item | undefined {
	if (!isItem(item)) return;

	// Append domain to paths without it, ignore paths that already have domain
	if (item.img.match(/^\/?media\//)) item.img = `https://legacystudentmedia.com/${item.img}`;
	if (item.loc.toLowerCase() === 'lhs') `https://legacystudentmedia.com/${item.img}`;
	return item;
}

export async function getItems(): Promise<Item[] | null> {
	// TODO: detect if on vercel and modify path
	// const isDevEnv = process.env.NODE_ENV!.trim().substring(0, 3) === 'dev';
	// const baseUrl = '/api/data';
	// const apiUrl = isDevEnv ? `https://humans.tjdoescode.vercel.app${baseUrl}` : baseUrl;

	const req = await fetch('/api/data');

	if (req.ok) {
		const rawData: Item[] = await req.json();

		const items = rawData.map(item => prepareItem(item));

		return items as Item[];
	} else {
		return null;
	}
}
