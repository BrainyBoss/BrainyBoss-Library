import express, { Request, Response, NextFunction } from 'express'


const router = express.Router();
import {addBooks, deleteBooks, getBooks, updateBooks} from '../controller/booksController'
import { auth } from '../middleware/auth';

/* GET users listing. */
router.post('/create',auth, addBooks);
router.get('/get', getBooks);
router.patch('/update',auth, updateBooks);
router.delete('/delete', auth, deleteBooks);

export default router;