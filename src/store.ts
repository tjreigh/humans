import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { Item } from '../types/item';

Vue.use(Vuex);

const prepareItem = (input: string): Item => {
	const item: Item = input as any;
	// Append domain to paths without it, ignore paths that already have domain
	if (item.img.match(/^\/?media\//)) item.img = `https://legacystudentmedia.com/${item.img}`;
	return item;
};

const getItems = async (): Promise<Item[][]> => {
	const data: string[][] = await fetch('/api/data').then(res => res.json());
	console.log(data);
	return data.map(x =>
		x.map(item => {
			console.log(item);
			return prepareItem(item);
		})
	);
};

export default new Vuex.Store({
	state: {
		items: [] as Item[],
	},
	getters: {
		oneItem: state => (id: number): Item | undefined => {
			return state.items.find(itm => itm.id === id);
		},
	},
	mutations: {
		setItems(state, items) {
			state.items = items;
		},
	},
	actions: {
		async fetchItems({ commit }) {
			commit('setItems', (await getItems()).flat());
		},
	},
	plugins: [createPersistedState()],
});
