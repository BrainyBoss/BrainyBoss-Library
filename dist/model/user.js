"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const book_1 = require("../model/book");
//Creat a new instance of the class and start using it
class AuthorInstance extends sequelize_1.Model {
}
exports.AuthorInstance = AuthorInstance;
AuthorInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    AuthorName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'first name is required'
            },
            notEmpty: {
                msg: 'Please provide a first name'
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'email is required'
            },
            isEmail: {
                msg: 'Please provide a a valid Email'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'password is required'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'phone number is required'
            },
            notEmpty: {
                msg: 'Please provide a valid phone number'
            }
        }
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'Authors',
});
AuthorInstance.hasMany(book_1.BooksInstance, { foreignKey: 'authorId', as: 'Books' });
book_1.BooksInstance.belongsTo(AuthorInstance, { foreignKey: 'authorId', as: 'Author' });
