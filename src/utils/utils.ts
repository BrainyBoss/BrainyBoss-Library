import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { isJSDocImplementsTag } from 'typescript';

export const createBooksSchema = Joi.object().keys({
    title: Joi.string().lowercase().required(),
    datePublished: Joi.string().lowercase().required(),
    description: Joi.string().lowercase().required(),
    pageCount: Joi.string().lowercase().required(),
    genre: Joi.string().lowercase().required(),
    authorId: Joi.string().lowercase().required(),
    publisher: Joi.string().lowercase().required(),
});

export const updateBooksSchema = Joi.object().keys({
    title:Joi.string().lowercase(),
    completed:Joi.string().lowercase(),
    description: Joi.string().lowercase().required(),
    pageCount: Joi.string().lowercase().required(),
    genre: Joi.string().lowercase().required(),
    authorId: Joi.string().lowercase().required(),
    publisher: Joi.string().lowercase().required(), 
});

export const registerSchema = Joi.object().keys({
    // firstname:Joi.string().required(),
    AuthorName:Joi.string().required(),
    email:Joi.string().trim().lowercase().required(),
    phoneNumber:Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password:Joi.ref("password")
}).with('password', 'confirm_password')

export const loginSchema = Joi.object().keys({
    email:Joi.string().trim().lowercase().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  
})

//Generate Token
export const generateToken=(user:{[key:string]:unknown}):unknown=>{
  const pass = process.env.JWT_SECRET as string
   return jwt.sign(user,pass, {expiresIn:'7d'})
}

export const options ={  
    abortEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
}