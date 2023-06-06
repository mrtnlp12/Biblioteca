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
exports.isauth = exports.register = exports.login = void 0;
const client_1 = __importDefault(require("../client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield client_1.default.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }
        const token = yield (0, jwt_1.generateJwt)({
            id: user.id,
            username: user.username,
        });
        return res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, username: user.username, role: user.role },
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, username, password } = req.body;
        const user = yield client_1.default.user.findUnique({
            where: {
                username,
            },
        });
        if (user) {
            return res.status(409).json({
                message: 'User already exists',
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield client_1.default.user.create({
            data: {
                username,
                name,
                lastname,
                password: hashedPassword,
            },
        });
        return res.status(201).json({
            message: 'User created',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.register = register;
function isauth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req.body;
            const decoded = yield (0, jwt_1.validateJwt)(token);
            if (!decoded) {
                return res.status(200).json({
                    message: 'Invalid token',
                    isauth: false,
                });
            }
            return res.status(200).json({
                message: 'User authenticated',
                isAuth: true,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    });
}
exports.isauth = isauth;
