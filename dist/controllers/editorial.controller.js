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
exports.updateEditorial = exports.createEditorial = exports.getEditorials = void 0;
const client_1 = __importDefault(require("../client"));
const getEditorials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editorials = yield client_1.default.editorials.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        res.status(200).json(editorials);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getEditorials = getEditorials;
const createEditorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, phone } = req.body;
        const editorial = yield client_1.default.editorials.findUnique({
            where: {
                name: name,
            },
        });
        if (editorial) {
            return res.status(400).json({ message: 'Editorial already exists' });
        }
        const newEditorial = yield client_1.default.editorials.create({
            data: {
                name,
                address,
                phone,
            },
        });
        res
            .status(201)
            .json({ message: 'Editorial created', editorial: newEditorial });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.createEditorial = createEditorial;
const updateEditorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, address, phone } = req.body;
        const editorial = yield client_1.default.editorials.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!editorial) {
            return res.status(404).json({ message: 'Editorial not found' });
        }
        const updatedEditorial = yield client_1.default.editorials.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                address,
                phone,
            },
        });
        res
            .status(200)
            .json({ message: 'Editorial updated', editorial: updatedEditorial });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.updateEditorial = updateEditorial;
