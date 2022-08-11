import express, { Request, Response, NextFunction } from 'express'


const router = express.Router();
import {addAuthor, getAuthor, LoginUser} from '../controller/authorsController'

/* GET users listing. */
router.post('/create', addAuthor);
router.get('/get', getAuthor);
router.post('/login', LoginUser);

export default router;