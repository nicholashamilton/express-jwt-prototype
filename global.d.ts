import { Request } from 'express';
import { IUser } from './user';

export interface IUserAuthRequest extends Request {
	currentUser?: IUser;
}