import mongoose from 'mongoose';

interface IGoal {
    title: string;
    completed: boolean;
}

const GoalSchema = new mongoose.Schema({
    title: {
        type: String
    },
    completed: {
        type: Boolean
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    completes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IGoal & mongoose.Document>('Goal', GoalSchema);