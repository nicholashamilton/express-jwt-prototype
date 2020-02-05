export interface IUser {
	username: string;
	email: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	_id?: string;
}

export interface IAuthServiceMessage {
	user?: IUser;
	token?: string;
	error?: string;
}