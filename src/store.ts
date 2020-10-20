import { reactive, readonly } from 'vue';
import { Item } from '../types/item';

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class Store<T extends Object> {
	protected state: T;

	constructor() {
		const data = this.data();
		this.setup(data);
		this.state = reactive(data) as T;
	}

	protected abstract data(): any;

	// eslint-disable-next-line
	protected setup(data: T): void {}

	public getState(): T {
		return readonly(this.state) as T;
	}
}

interface Items extends Object {
	items: Item[];
}

class ItemStore extends Store<Items> {
	protected async data(): Promise<Items> {
		return {
			items: await this.getItems(),
		};
	}

	getItems = () =>
		fetch('https://lhs-humans.glitch.me/data')
			.then(res => res.json())
			.then(data =>
				data.items.map((item: Item) => {
					// Append domain to paths without it, ignore paths that already have domain
					if (item.img.match(/^\/?media\//)) item.img = `https://legacystudentmedia.com/${item.img}`;
					return item;
				})
			);

	oneItem = (id: number) => this.getState().items.find(itm => itm.id === id);
}

export const store: ItemStore = new ItemStore();
