export enum AuthLevel {
	User = 1,
	Editor,
	Manager,
}

interface PassReset {
	resetToken: string;
	tokenExpires: Date;
}

export interface User {
	username: string;
	password: string;
	email: string;
	authLevel: AuthLevel;
	resetPayload?: PassReset;
}

export interface Session extends User {
	key: string;
}
