"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = require("path");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const editorial_routes_1 = __importDefault(require("./routes/editorial.routes"));
const loan_routes_1 = __importDefault(require("./routes/loan.routes"));
const search_routes_1 = __importDefault(require("./routes/search.routes"));
const author_routes_1 = __importDefault(require("./routes/author.routes"));
const area_routes_1 = __importDefault(require("./routes/area.routes"));
const genre_routes_1 = __importDefault(require("./routes/genre.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.static((0, path_1.join)(__dirname, 'public')));
app.use((0, cors_1.default)());
app.use('/auth', auth_routes_1.default);
app.use('/books', book_routes_1.default);
app.use('/editorials', editorial_routes_1.default);
app.use('/loans', loan_routes_1.default);
app.use('/search', search_routes_1.default);
app.use('/authors', author_routes_1.default);
app.use('/areas', area_routes_1.default);
app.use('/genres', genre_routes_1.default);
app.use('/users', user_routes_1.default);
app.get('*', (req, res) => {
    res.sendFile((0, path_1.join)(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
