import Vue from 'vue';
import Vuex from 'vuex';
import { Item } from '../types/item';

/* DISCLAIMER: Vuex is not strictly necessary for this app
	 I could pass items around as props, but things get messy on reload
	 Using state management makes things cleaner overall and more scalable
*/

Vue.use(Vuex);

const getItems = () =>
	fetch('/api/data')
		.then(res => res.json())
		.then(data =>
			data.items.map((item: Item) => {
				// Append domain to paths without it, ignore paths that already have domain
				if (item.img.match(/^\/?media\//)) item.img = `https://legacystudentmedia.com/${item.img}`;
				return item;
			})
		);

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
			commit('setItems', await getItems());
		},
	},
});
