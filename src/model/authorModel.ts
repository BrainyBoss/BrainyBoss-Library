import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config'
import { BooksInstance } from './booksModel';

//cREATE AN INTERFACE FOR THE APP

interface AuthorAttribute{
    id: string;
    AuthorName: string;
    email: string;
    password: string;
    phoneNumber: string;
}


//Creat a new instance of the class and start using it
export class AuthorsInstance extends Model<AuthorAttribute>{}
    
    AuthorsInstance.init({
    id: {
        type:DataTypes.UUIDV4,
        primaryKey:true, //In any sql database, the id is always the primary key
        allowNull:false,
    },
    AuthorName: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'first name is required'
            },
            notEmpty:{
                msg:'Please provide a first name'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'email is required'
            },
            isEmail:{
                msg:'Please provide a a valid Email'
            }
        }

    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'password is required'
            },
            notEmpty:{
                msg:'Please provide a password'
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'phone number is required'
            },
            notEmpty:{
                msg:'Please provide a valid phone number'
            }
        } 
    }
}, {    //This shows that we are building db and the type of table
    sequelize: db,
    tableName: 'Authors',
    })

AuthorsInstance.hasMany(BooksInstance, {foreignKey:'authorId', as:'Books'})

BooksInstance.belongsTo(AuthorsInstance,{foreignKey:'authorId', as:'Author'}) 
