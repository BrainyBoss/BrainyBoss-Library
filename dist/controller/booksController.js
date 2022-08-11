"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooks = exports.updateBooks = exports.getSingleBook = exports.getBooks = exports.addBooks = void 0;
const uuid_1 = require("uuid");
const booksModel_1 = require("../model/booksModel");
const authorModel_1 = require("../model/authorModel");
const utils_1 = require("../utils/utils");
async function addBooks(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        console.log(req.user);
        // const verified = req.user;
        let book = { ...req.body, id };
        const record = await booksModel_1.BooksInstance.create(book);
        res.status(201).json({
            message: "You have succesfully created a book request",
            record // a shoreter way of writing record:record
        }); //note that json was used instead of send. its more proper for json docs. 
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        });
    }
}
exports.addBooks = addBooks;
;
async function getBooks(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await authorModel_1.AuthorsInstance.findAndCountAll({ limit, offset,
            include: [{
                    model: booksModel_1.BooksInstance,
                    as: 'Books'
                }
            ],
            attributes: ['id', 'AuthorName', 'email', 'phoneNumber']
        });
        res.status(200).json({
            msg: "You have successfully fetch all books",
            count: record.count,
            record: record.rows,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.getBooks = getBooks;
async function getSingleBook(req, res, next) {
    try {
        const { id } = req.params;
        const record = await booksModel_1.BooksInstance.findOne({ where: { id } });
        return res.status(200).json({
            msg: "Successfully gotten user information",
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single Book",
            route: "/read/:id",
        });
    }
}
exports.getSingleBook = getSingleBook;
async function updateBooks(req, res, next) {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const validationResult = utils_1.updateBooksSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await booksModel_1.BooksInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing books",
            });
        }
        const updatedrecord = await record.update({
            title: req.body.title,
            datePublished: req.body.datePublished,
            description: req.body.description,
            pageCount: req.body.pageCount,
            genre: req.body.genre,
            // authorId: ,
            publisher: req.body.publisher,
        });
        res.status(200).json({
            msg: "You have successfully updated your books",
            updatedrecord,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id",
        });
    }
}
exports.updateBooks = updateBooks;
async function deleteBooks(req, res, next) {
    try {
        const { id } = req.params;
        const record = await booksModel_1.BooksInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find books",
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            msg: "Books deleted successfully",
            deletedRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id",
        });
    }
}
exports.deleteBooks = deleteBooks;
