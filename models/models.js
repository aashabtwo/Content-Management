const mongoose = require('mongoose');
// user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
}, { timestamps: true })

const User = mongoose.model('UserSchema', userSchema);

// schema for posts
const questionSchema = new mongoose.Schema({
    post: {
        type: Object,
        required: true
    },
    comment: {
        type: Array,
        default: []
    }
})

const Question = mongoose.model('Questions', questionSchema);

// article schema
const articleSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Article = mongoose.model('ArticleSchema', articleSchema);

module.exports = {
    User,
    Question,
    Article
}