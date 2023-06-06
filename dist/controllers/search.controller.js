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
exports.searchBooks = void 0;
const client_1 = __importDefault(require("../client"));
const searchBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.query;
        const books = yield client_1.default.books.findMany({
            where: {
                title: {
                    contains: String(title),
                },
                quantity: {
                    gt: 0,
                },
            },
            orderBy: {
                title: 'asc',
            },
        });
        res.status(200).json(books);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.searchBooks = searchBooks;
