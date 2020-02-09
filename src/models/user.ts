import mongoose from 'mongoose';
import { IUser } from '../../user';
import Goal from './goal';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
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
        default: 'user',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal'
    }],
    following: [{

    }],
    followers: [{

    }]
});

export default mongoose.model<IUser & mongoose.Document>('User', UserSchema);