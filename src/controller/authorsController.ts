import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {registerSchema,options,loginSchema,generateToken} from '../utils/utils'
import {AuthorsInstance} from '../model/authorModel'
import bcrypt from 'bcryptjs'
import { BooksInstance } from '../model/booksModel';

export async function addAuthor(req: Request, res: Response, next: NextFunction) {
  const id = uuidv4();

  try{  
    const validationResult =registerSchema.validate(req.body, options)
    if(validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message
      })
    }

    const duplicateEmail = await AuthorsInstance.findOne({where:{email: req.body.email}})
    if(duplicateEmail){
      return res.status(409).json({
        msg:"Email already exist"
      })
    }

    const duplicatePhone = await AuthorsInstance.findOne({where:{phoneNumber:req.body.phoneNumber}})

    if (duplicatePhone){
      return res.status(409).json({
        msg:"Phone already exist"
      })
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8)
    const record = await AuthorsInstance.create({
      id: id,
     AuthorName: req.body.AuthorName,
     email: req.body.email,
     phoneNumber: req.body.phoneNumber,
     password: passwordHash
    })
    res.status(201).json ({
    msg:"You have successfully created an author page",
    record
    })
  }catch(err){
    res.status(500).json({
      msg:'message has been registered',
      route:'/register'
    })
  }
} 

 export async function LoginUser(req:Request, res:Response, next:NextFunction) {
   const id = uuidv4()
   try{ 
       const validationResult = loginSchema.validate(req.body,options)
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message
          })
       }
       const User = await AuthorsInstance.findOne({where:{email:req.body.email}}) as unknown as {[key:string]:string}
        
       const {id} =User
       const token = generateToken({id})
      const validAuthor = await bcrypt.compare(req.body.password, User.password);

      if(!validAuthor){
         res.status(401).json({
            message:"summary of different episodes"
        })
      }

      if(validAuthor){
         res.status(200).cookie('token', token, {
           maxAge: 7*24*60*60*1000
         }).json({
             message:"you can have access to the library",
             token,
             User
         })
      }

}catch(err){
   res.status(500).json({
    msg:'summary of books per week',
    route:'/login'
   })
}

}

export async function getAuthor(
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
     ]
     });
     res.status(200).json({
       msg: "You have successfully fetch all books from their arvhive",
       count: record.count,
       record: record.rows,
     });
   } catch (error) {
     console.log(error)
     res.status(500).json({
       msg:"Failed to get record",
       route: "/get",
     });
   }
 }

