import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { hash } from 'bcryptjs';
import { Item } from '../types/item';
import { isItem } from '../api/util/funcs';

Vue.use(Vuex);

type UserData = [string, string];

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

	const items = data.map(item => {
		return prepareItem(item);
	});

	// Sort items in increasing order by ID
	return items.sort((a, b) => {
		if (a && b) {
			return a.id - b.id;
		} else return -1;
	});
};

const getUser = async (username: string, pass: string): Promise<void> => {
	const hashed = hash(pass, 10);

	const req = await fetch('/api/auth/login', {
		method: 'POST',
		mode: 'same-origin',
		body: JSON.stringify({ username, hashed }),
	});
};

export default new Vuex.Store({
	state: {
		items: [] as Item[],
		user: '',
	},
	getters: {
		oneItem: state => (id: number): Item | undefined => {
			return state.items.find(itm => itm.id === id);
		},
		isAuthenticated: state => !!state.user,
		user: state => state.user,
	},
	mutations: {
		setItems(state, items) {
			state.items = items;
		},
		setUser(state, username) {
			state.user = username;
		},
		logoutUser(state) {
			state.user = '';
		},
	},
	actions: {
		async fetchItems({ commit }) {
			commit('setItems', await getItems());
		},
		async trySetUser({ commit }, [username, pass]: UserData) {
			commit('setUser', await getUser(username, pass));
		},
	},
	plugins: [createPersistedState()],
});
