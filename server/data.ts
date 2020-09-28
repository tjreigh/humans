import { Database, open } from 'sqlite';
import { Item, ItemStore } from '../types/item';
import fs from 'fs';

export class DataController {
	private db: Database;

	constructor(path: string) {
		open({
			filename: path,
			driver: Database,
		}).then(db => this.db = db);
	}

	get data(): Array<Item> {
		const arr: Item[] = [];
		this.db.get(`SELECT * FROM items`)
			.then(row => {
				arr.push(row);
			});
		return arr;
	}

	async regenDB() {
		await this.db.exec(`CREATE TABLE posts (id INT, img TEXT, desc TEXT)`);
		await this.db.exec(``);
	}

	async fillDB() {
		const raw: any = fs.readFileSync('./items.json');
		const data: ItemStore = JSON.parse(raw);
	}
}
