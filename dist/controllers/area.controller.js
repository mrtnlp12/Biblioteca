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
exports.createArea = exports.getAreas = void 0;
const client_1 = __importDefault(require("../client"));
const getAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield client_1.default.areas.findMany();
        res.status(200).json(areas);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.getAreas = getAreas;
const createArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const area = yield client_1.default.areas.findUnique({
            where: {
                name: name,
            },
        });
        if (area) {
            return res.status(400).json({
                message: 'Area already exists!',
            });
        }
        yield client_1.default.areas.create({
            data: {
                name,
            },
        });
        res.status(201).json({
            message: 'Area created!',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error!',
        });
    }
});
exports.createArea = createArea;
