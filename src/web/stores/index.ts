import Vue, { PluginObject } from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { State, Getters, MutationNames, ActionNames, Actions, Mutations } from './types';
import { getItems } from './items';
import { tryLogin } from './users';
import { User } from '@typings';

// New store object with awareness of types
const typedStore: PluginObject<void> = {
	install(VueInstance: typeof Vue) {
		Object.defineProperty(VueInstance.prototype, '$tStore', {
			get() {
				return this.$store;
			},
		});
	},
};

Vue.use(Vuex);
Vue.use(typedStore);

const getters: GetterTree<State, State> & Getters = {
	oneItem: state => id => state.items?.find(itm => itm.id === id),
	isAuthenticated: state => !!state.user,
	user: state => state.user,
};

const mutations: MutationTree<State> & Mutations = {
	[MutationNames.SetItems]: (state, items) => {
		state.items = items;
	},
	[MutationNames.SetUser]: (state, user) => {
		state.user = user;
		console.log('setUser ', user.username);
	},
	[MutationNames.LogoutUser]: state => {
		Vue.prototype.$cookies.remove('session');
		state.user = null;
	},
};

const actions: ActionTree<State, State> & Actions = {
	[ActionNames.FetchItems]: async ({ commit }) => {
		const maybeItems = await getItems();
		if (maybeItems) commit(MutationNames.SetItems, maybeItems);
		else commit(MutationNames.SetItems, null);
	},
	[ActionNames.TryLoginUser]: async ({ commit }, [username, pass]) => {
		const didLogin = await tryLogin([username, pass]);

		if (didLogin) {
			const res = await fetch('api/auth/self');
			const user = (await res.json()) as User;
			commit(MutationNames.SetUser, user);
		}

		return didLogin;
	},
};

export const store = new Vuex.Store<State>({
	state: new State(),
	getters,
	mutations,
	actions,
	plugins: [createPersistedState()],
});

export { State, MutationNames, ActionNames } from './types';
export default store;
