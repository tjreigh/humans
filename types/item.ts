export interface Item {
	id: number;
	img: string;
	desc: string;
	date?: number;
}

export interface ItemStore {
	items: Item[];
}
