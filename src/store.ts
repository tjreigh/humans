import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { Item } from '../types/item';
import { isItem } from '../api/util/funcs';

Vue.use(Vuex);

const prepareItem = (item: Item): Item | undefined => {
	if (!isItem(item)) return;
	// Append domain to paths without it, ignore paths that already have domain
	if (item.img.match(/^\/?media\//)) item.img = `https://legacystudentmedia.com/${item.img}`;
	return item;
};

const getItems = async (): Promise<(Item | undefined)[]> => {
	const req = await fetch('/api/data');
	const data: Item[] = await req.json();
	console.log(data);
	return data.map(item => {
		return prepareItem(item);
	});
};

export default new Vuex.Store({
	state: {
		items: [] as Item[],
		single: {} as Item | undefined,
	},
	getters: {
		oneItem: state => (id: number): Item | undefined => {
			state.single = state.items.find(itm => itm.id === id);
			return state.single;
		},
	},
	mutations: {
		setItems(state, items) {
			state.items = items;
		},
	},
	actions: {
		async fetchItems({ commit }) {
			commit('setItems', await getItems());
		},
	},
	plugins: [createPersistedState()],
});
