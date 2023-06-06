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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const jwt_1 = require("../utils/jwt");
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('token') || '';
        const payload = yield (0, jwt_1.validateJwt)(token);
        if (!payload) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        req.body.userId = payload.id;
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
});
exports.validateUser = validateUser;
