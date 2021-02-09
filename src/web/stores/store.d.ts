import { CommitOptions, DispatchOptions, Store } from 'vuex';
import { Actions, ActionNames, Getters, Mutations, MutationNames, State } from './types';

interface TypedStore extends Store<State> {
	getters: Getters;
	commit: <M extends MutationNames>(
		mutation: M,
		payload: Parameters<Actions[typeof mutation]>[1],
		options?: CommitOptions
	) => ReturnType<Mutations[M]>;
	dispatch: <A extends ActionNames>(
		action: A,
		payload?: Parameters<Actions[typeof action]>[1],
		options?: DispatchOptions
	) => ReturnType<Actions[A]>;
}

declare module 'vue/types/vue' {
	interface Vue {
		$tStore: TypedStore;
	}
}
