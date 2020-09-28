export interface Item {
	id: number;
	img: string;
	desc: string;
}

export interface ItemStore {
	items: Item[];
}
