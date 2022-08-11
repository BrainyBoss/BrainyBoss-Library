"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthor = exports.LoginUser = exports.addAuthor = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const authorModel_1 = require("../model/authorModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const booksModel_1 = require("../model/booksModel");
async function addAuthor(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const duplicateEmail = await authorModel_1.AuthorsInstance.findOne({ where: { email: req.body.email } });
        if (duplicateEmail) {
            return res.status(409).json({
                msg: "Email already exist"
            });
        }
        const duplicatePhone = await authorModel_1.AuthorsInstance.findOne({ where: { phoneNumber: req.body.phoneNumber } });
        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone already exist"
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await authorModel_1.AuthorsInstance.create({
            id: id,
            AuthorName: req.body.AuthorName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: passwordHash
        });
        res.status(201).json({
            msg: "You have successfully created an author page",
            record
        });
    }
    catch (err) {
        res.status(500).json({
            msg: 'message has been registered',
            route: '/register'
        });
    }
}
exports.addAuthor = addAuthor;
async function LoginUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const User = await authorModel_1.AuthorsInstance.findOne({ where: { email: req.body.email } });
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validAuthor = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validAuthor) {
            res.status(401).json({
                message: "summary of different episodes"
            });
        }
        if (validAuthor) {
            res.status(200).cookie('token', token, {
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json({
                message: "you can have access to the library",
                token,
                User
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: 'summary of books per week',
            route: '/login'
        });
    }
}
exports.LoginUser = LoginUser;
async function getAuthor(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await authorModel_1.AuthorsInstance.findAndCountAll({ limit, offset,
            include: [{
                    model: booksModel_1.BooksInstance,
                    as: 'Books'
                }
            ]
        });
        res.status(200).json({
            msg: "You have successfully fetch all books from their arvhive",
            count: record.count,
            record: record.rows,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Failed to get record",
            route: "/get",
        });
    }
}
exports.getAuthor = getAuthor;
