import { CommitOptions, DispatchOptions, Store } from 'vuex';
import { Actions, ActionNames, Getters, Mutations, MutationNames, State } from './types';

interface TypedStore extends Store<State> {
	getters: Getters;
	commit: <M extends MutationNames>(
		mutation: M,
		payload: Mutations[typeof mutation],
		options?: CommitOptions
	) => ReturnType<Mutations<M>>;
	dispatch: <A extends ActionNames>(
		action: A,
		payload?: Parameters<Actions[typeof action]>[1],
		options?: DispatchOptions
	) => ReturnType<Actions<M>>;
}

declare module 'vue/types/vue' {
	interface Vue {
		$tStore: TypedStore;
	}
}
