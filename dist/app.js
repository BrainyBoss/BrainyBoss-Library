"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors")); //to catch errors
const express_1 = __importDefault(require("express")); //to run your server
const path_1 = __importDefault(require("path")); //to resolve path issues
const cookie_parser_1 = __importDefault(require("cookie-parser")); //catch cookies on the browser
const morgan_1 = __importDefault(require("morgan")); //morgan is the one showing the status code notification
const database_config_1 = __importDefault(require("./config/database.config"));
const index_1 = __importDefault(require("./routes/index"));
const authors_1 = __importDefault(require("./routes/authors"));
const books_1 = __importDefault(require("./routes/books"));
database_config_1.default.sync().then(() => {
    console.log('Database connected succesfully');
}).catch(err => {
    console.log(err);
});
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '..', "views"));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/authors', authors_1.default);
app.use('/books', books_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
