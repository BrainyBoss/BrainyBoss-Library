"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const booksController_1 = require("../controller/booksController");
const auth_1 = require("../middleware/auth");
/* GET users listing. */
router.post('/create', auth_1.auth, booksController_1.addBooks);
router.get('/get', booksController_1.getBooks);
router.patch('/update', auth_1.auth, booksController_1.updateBooks);
router.delete('/delete', auth_1.auth, booksController_1.deleteBooks);
exports.default = router;
