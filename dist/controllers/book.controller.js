"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBook = exports.getBooks = void 0;
const client_1 = __importDefault(require("../client"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield client_1.default.books.findMany({
        orderBy: {
            title: 'asc',
        },
        where: {
            quantity: {
                gt: 0,
            },
        },
    });
    res.status(200).json(books);
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield client_1.default.books.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            author: true,
            genre: true,
            editorial: true,
            area: true,
        },
    });
    res.status(200).json(book);
});
exports.getBook = getBook;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, authorId, description, releaseDate, editorialId, ISBN, genreId, imageURL, areaId, } = req.body;
        const book = yield client_1.default.books.findUnique({
            where: {
                ISBN: ISBN,
            },
        });
        if (book) {
            return res.status(400).json({ message: 'Book already exists' });
        }
        const newBook = yield client_1.default.books.create({
            data: {
                title,
                authorId: Number(authorId),
                description,
                releaseDate: new Date(releaseDate).toISOString(),
                editorialId: Number(editorialId),
                ISBN,
                genreId: Number(genreId),
                imageURL,
                areaId: Number(areaId),
            },
        });
        res.status(201).json({ message: 'Book created', book: newBook });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, authorId, description, releaseDate, editorialId, ISBN, quantity, genreId, imageURL, areaId, } = req.body;
    const book = yield client_1.default.books.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (!book) {
        return res.status(400).json({ message: 'Book does not exist' });
    }
    const updatedBook = yield client_1.default.books.update({
        where: {
            id: Number(id),
        },
        data: {
            title,
            authorId: Number(authorId),
            description,
            releaseDate: new Date(releaseDate).toISOString(),
            editorialId: Number(editorialId),
            ISBN,
            quantity: Number(quantity),
            genreId: Number(genreId),
            imageURL,
            areaId: Number(areaId),
        },
    });
    res.status(200).json({ message: 'Book updated', book: updatedBook });
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield client_1.default.books.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (!book) {
        return res.status(400).json({ message: 'Book does not exist' });
    }
    yield client_1.default.books.delete({
        where: {
            id: Number(id),
        },
    });
    res.status(200).json({ message: 'Book deleted' });
});
exports.deleteBook = deleteBook;
