import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config'

//cREATE AN INTERFACE FOR THE APP

interface BooksAttribute{
    id: string;
    title: string;
    datePublished: string;
    description: string
    pageCount: string;
    genre: string;
    publisher: string;
    authorId: string;


}


//Creat a new instance of the class and start using it
export class BooksInstance extends Model<BooksAttribute>{}
    
    BooksInstance.init({
    id: {
        type:DataTypes.UUIDV4,
        primaryKey:true, //In any sql database, the id is always the primary key
        allowNull:false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    datePublished:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    pageCount: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    authorId: {
        type: DataTypes.STRING,
    }
}, {    //This shows that we are building db and the type of table
    sequelize: db,
    tableName: 'Books',
    })