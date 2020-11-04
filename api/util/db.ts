import path from 'path';
import { Item, ItemStore } from '../../types/item';
import { JSONDB } from './jsondb';

export const db = new JSONDB<ItemStore>(path.join(__dirname, '../items.json'), {
	items: [],
});

export const findItem = (id: number): Item | undefined => {
	return db.data.items.find(item => item.id === id);
};
