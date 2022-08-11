import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {BooksInstance} from '../model/booksModel'
import { AuthorsInstance } from '../model/authorModel';
import { options, createBooksSchema, updateBooksSchema } from '../utils/utils';


export async function addBooks(req: Request,
  res: Response, next: NextFunction) {
  const id = uuidv4();
  
  try {
    console.log(req.user);
    
    // const verified = req.user;
    let book = { ...req.body, id };
    const record = await BooksInstance.create
      (book)
    res.status(201).json({
      message: "You have succesfully created a book request", 
      record   // a shoreter way of writing record:record
    })  //note that json was used instead of send. its more proper for json docs. 
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'failed to create',
      route : '/create'
    })
    }

};
export async function getBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const record = await AuthorsInstance.findAndCountAll({ limit, offset,
      include:[{
         model:BooksInstance,
         as:'Books'
        }
        ],
        attributes:['id', 'AuthorName', 'email', 'phoneNumber']
   });
    res.status(200).json({
      msg: "You have successfully fetch all books",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function getSingleBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await BooksInstance.findOne({ where: { id } });
    return res.status(200).json({
      msg: "Successfully gotten user information",
      record,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single Book",
      route: "/read/:id",
    });
  }
}

export async function updateBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const validationResult = updateBooksSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await BooksInstance.findOne({ where: { id } });
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
  } catch (error) {
    res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function deleteBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await BooksInstance.findOne({ where: { id } });
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
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete/:id",
    });
  }
}
