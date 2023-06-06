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
exports.updateUser = exports.getUser = exports.deleteUser = exports.getUsers = void 0;
const client_1 = __importDefault(require("../client"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield client_1.default.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const loan = yield client_1.default.loans.findFirst({
            where: {
                userId: Number(id),
            },
        });
        if (loan) {
            return res.status(400).json({ message: 'User has loans' });
        }
        yield client_1.default.user.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({ message: 'User deleted' });
    }
    catch (error) { }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield client_1.default.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, lastname, password, role, username } = req.body;
        const user = yield client_1.default.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield client_1.default.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                lastname,
                password,
                role,
                username,
            },
        });
        res.status(204).json({ message: 'User updated' });
    }
    catch (error) { }
});
exports.updateUser = updateUser;
