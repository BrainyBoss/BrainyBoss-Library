"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
//Creat a new instance of the class and start using it
class BooksInstance extends sequelize_1.Model {
}
exports.BooksInstance = BooksInstance;
BooksInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    datePublished: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pageCount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    publisher: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    authorId: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'Books',
});
