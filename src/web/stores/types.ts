import { ActionContext } from 'vuex';
import { Item, User } from '@typings';

export type RawCreds = [string, string];

export class State {
	items: Item[] = [];
	user: User | null = null;
}

export interface Getters {
	oneItem: (state: State) => (id: number) => Item;
	isAuthenticated: (state: State) => boolean;
	user: (state: State) => User | null;
}

export enum MutationNames {
	SetItems,
	SetUser,
	LogoutUser,
}

export interface Mutations {
	[MutationNames.SetItems]: (state: State, items: Item[]) => void;
	[MutationNames.SetUser]: (state: State, user: User) => void;
	[MutationNames.LogoutUser]: (state: State) => void;
}

type CommitContext = {
	commit<K extends MutationNames>(
		key: K,
		payload: Parameters<Mutations[typeof key]>[1]
	): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export enum ActionNames {
	FetchItems,
	TryLoginUser,
}

export interface Actions {
	[ActionNames.FetchItems]({ commit }: CommitContext): Promise<void>;
	[ActionNames.TryLoginUser](
		{ commit }: CommitContext,
		[username, password]: RawCreds
	): Promise<boolean>;
}
