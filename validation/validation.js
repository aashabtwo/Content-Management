const Joi = require('@hapi/joi');

// to validate registration body
const registerSchema = Joi.object({
    firstName: Joi.string().min(1).max(20).required().trim(),
    lastName: Joi.string().min(1).max(20).required().trim(),
    email: Joi.string().email().lowercase().required().trim(),
    department: Joi.string().min(4).max(30).required().trim(),
    roll: Joi.string().min(4).max(10).required().trim(),
    batch: Joi.string().min(4).max(4).required().trim(),
    password: Joi.string().min(6).required().trim(),
    confirmPassword: Joi.ref('password')

});

// to validate login body
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

// to validate question body
const questionSchema = Joi.object({
    question: Joi.string().min(1).required()
});

// to validate comment body
const commentSchema = Joi.object({
    comment: Joi.string().min(1).required()
});

// to validate reply body
const replySchema = Joi.object({
    reply: Joi.string().min(1).required()
});

// to validate article body
const articleSchema = Joi.object({
    author: Joi.string().required(),
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(100),
    content: Joi.string().min(1).required()
})

// exporting validation schemas
module.exports = {
    registerSchema,
    authSchema,
    questionSchema,
    commentSchema,
    replySchema,
    articleSchema
}