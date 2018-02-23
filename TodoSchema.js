import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: String
});

export const todoModel = mongoose.model('Todo', todoSchema);
