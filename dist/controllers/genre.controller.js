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
exports.createGenre = exports.getGenres = void 0;
const client_1 = __importDefault(require("../client"));
const getGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield client_1.default.genres.findMany();
        res.status(200).json(genres);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.getGenres = getGenres;
const createGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const genre = yield client_1.default.genres.findUnique({
            where: {
                name: name,
            },
        });
        if (genre) {
            return res.status(400).json({
                message: 'Genre already exists!',
            });
        }
        yield client_1.default.genres.create({
            data: {
                name,
            },
        });
        res.status(201).json({
            message: 'Genre created!',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error!',
        });
    }
});
exports.createGenre = createGenre;
