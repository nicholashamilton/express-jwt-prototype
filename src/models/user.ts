import mongoose from 'mongoose';
import { UserInterface } from '../../user';

const UserSchema = new mongoose.Schema({
  	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
  	},
  	password: {
		type: String,
		required: true,
  	},
  	firstName: {
    	type: String
  	},
  	lastName: {
    	type: String
  	},
  	role: {
		type: String,
    	default: 'user', // Possible values: user | admin
  	},
  	salt: {
    	type: String,
    	required: true,
  	}
});

export default mongoose.model<UserInterface & mongoose.Document>('User', UserSchema);