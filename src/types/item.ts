export interface Item {
	id: number;
	img: string;
	desc: string;
	loc: 'lhs' | 'cloud' | 'other';
	date?: number;
}

export interface ItemStore {
	items: Item[];
}
