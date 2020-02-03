import UserModel from '../models/user';
import * as jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { UserInterface } from '../../user';

export default class AuthService {
      public async signUp(user: UserInterface): Promise<any> {
        const { username, email, password, firstName, lastName } = user;

        const { error } = this.validateUser(user);
        if (error) return { error };

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) return { error: 'Email is already being used...' };

        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) return { error: 'Username is already being used, please pick another...' };

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRecord = await UserModel.create({
            password: hashedPassword,
            email,
            salt: 10,
            firstName,
            lastName
        });

        await userRecord.save();

        const token = this.generateJWT(userRecord);

        return {
            user: {
                email: userRecord.email,
                username: userRecord.username,
            },
			token
        }
    }

    private validateUser(user: UserInterface): any {
        const schema = {
            username: Joi.string().min(3).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(3).max(255).required(),
            firstName: Joi.string().min(2).max(50),
            lastName: Joi.string().min(2).max(50)
        };
        return Joi.validate(user, schema);
    }

    private generateJWT(user: UserInterface) {
        return jwt.sign({
            data: {
                _id: user._id,
                username: user.username,
                email: user.email
			}
		}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
	}
}