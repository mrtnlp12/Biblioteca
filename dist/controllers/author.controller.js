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
exports.createAuthor = exports.getAuthors = void 0;
const client_1 = __importDefault(require("../client"));
const getAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield client_1.default.authors.findMany();
        res.status(200).json(authors);
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
        });
    }
});
exports.getAuthors = getAuthors;
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname } = req.body;
        const author = yield client_1.default.authors.findUnique({
            where: {
                name: name,
            },
        });
        if (author) {
            return res.status(400).json({
                message: 'Author already exists!',
            });
        }
        yield client_1.default.authors.create({
            data: {
                name,
                lastname,
            },
        });
        res.status(201).json({
            message: 'Author created!',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error!',
        });
    }
});
exports.createAuthor = createAuthor;
