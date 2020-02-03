export interface UserInterface {
	username: string,
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
	salt?: string;
	_id?: string
}