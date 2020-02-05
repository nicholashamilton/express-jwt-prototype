import UserModel from '../models/user';
import * as jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { IUser, IAuthServiceMessage } from '../../user';

export default class AuthService {

    public async login(email: string, password: string): Promise<IAuthServiceMessage> {
        const userDocument = await UserModel.findOne({ email });
        if (!userDocument) {
            return { error: 'User not found' };
        }
        const match = await bcrypt.compare(password, userDocument.password);
        if (match) {
            const token = this.generateJWT(userDocument);
            return {
                user: {
                    email: userDocument.email,
                    username: userDocument.username,
                },
                token
            }
        }
        return { error: 'Password do not match.' };
    }

    public async signUp(user: IUser): Promise<IAuthServiceMessage> {
        const { username, email, password, firstName, lastName } = user;

        const { error } = this.validateUserObject(user);
        if (error) return { error: error.details[0].message };

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) return { error: 'Email is already being used...' };

        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) return { error: 'Username is already being used, please pick another...' };

        const hashedPassword = await bcrypt.hash(password, 10);
        const userDocument = await UserModel.create({
            username,
            password: hashedPassword,
            email,
            salt: 10,
            firstName,
            lastName
        });
        await userDocument.save();

        const token = this.generateJWT(userDocument);
        return {
            user: {
                email: userDocument.email,
                username: userDocument.username,
            },
            token
        }
    }

    private validateUserObject(user: IUser): Joi.ValidationResult<IUser> {
        const schema = {
            username: Joi.string().min(3).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(3).max(255).required(),
            firstName: Joi.string().min(2).max(50),
            lastName: Joi.string().min(2).max(50)
        };
        return Joi.validate(user, schema);
    }

    private generateJWT(user: IUser): string {
        return jwt.sign({
            data: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    }
}