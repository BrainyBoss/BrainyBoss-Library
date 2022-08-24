"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginSchema = exports.registerSchema = exports.updateBookSchema = exports.createBookSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createBookSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    datePublished: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().lowercase().required(),
    pageCount: joi_1.default.string().lowercase().required(),
    genre: joi_1.default.string().lowercase().required(),
    // authorId: Joi.string().lowercase().required(),
    publisher: joi_1.default.string().lowercase().required(),
});
exports.updateBookSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    completed: joi_1.default.string().lowercase(),
    description: joi_1.default.string().lowercase().required(),
    pageCount: joi_1.default.string().lowercase().required(),
    genre: joi_1.default.string().lowercase().required(),
    // authorId: Joi.string().lowercase().required(),
    publisher: joi_1.default.string().lowercase().required(),
});
exports.registerSchema = joi_1.default.object().keys({
    // firstname:Joi.string().required(),
    AuthorName: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string().length(11).pattern(/^[0-9]+$/).required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: joi_1.default.ref("password")
}).with('password', 'confirm_password').messages({
    'message': `confirm password should be same as password`
});
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});
//Generate Token
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
