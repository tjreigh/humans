export enum AuthLevel {
	User = 1,
	Editor,
	Manager,
}

type PassReset = {
	resetToken: string;
	tokenExpires: Date;
};

export type User = {
	username: string;
	password: string;
	email?: string;
	authLevel?: AuthLevel;
	resetPayload?: PassReset;
};
