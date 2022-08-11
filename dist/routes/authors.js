"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authorsController_1 = require("../controller/authorsController");
/* GET users listing. */
router.post('/create', authorsController_1.addAuthor);
router.get('/get', authorsController_1.getAuthor);
router.post('/login', authorsController_1.LoginUser);
exports.default = router;
