import Vue from 'vue';
import Vuex from 'vuex';
import { Item } from '../types/item';

Vue.use(Vuex);

const getItems = async () => {
	let its: Item[] = [];
	await fetch('https://lhs-humans.glitch.me/data')
		.then(res => res.json())
		.then(data => {
			its = data.items.map((item: Item) => {
				// Append domain to paths without it, ignore paths that already have domain
				if (item.img.match(/^\/?media\//)) item.img = `https://legacystudentmedia.com/${item.img}`;
				return item;
			});
			return data;
		});
	return its;
};
let items: Item[] = [];
getItems().then(its => (items = its));

export default new Vuex.Store({
	state: {
		items: items,
	},
	getters: {
		allItems: state => {
			return state.items;
		},
		oneItem: state => (id: number) => {
			return state.items.find((itm: Item) => itm.id === id);
		},
	},
});
