export interface UserInterface {
	username: string,
	email: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	salt?: string;
	_id?: string
}

export interface AuthServiceInterface {
	user?: UserInterface,
	token?: string,
	error?: string
}