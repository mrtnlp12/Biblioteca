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
exports.deleteLoan = exports.generateLoan = exports.getLoans = void 0;
const client_1 = __importDefault(require("../client"));
const getLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield client_1.default.loans.findMany({
            include: {
                book: true,
                user: true,
            },
            orderBy: {
                returnDate: 'asc',
            },
        });
        res.status(200).json(loans);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getLoans = getLoans;
const generateLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, returnDate, userId } = req.body;
        const loan = yield client_1.default.loans.create({
            data: {
                bookId: Number(bookId),
                returnDate: new Date(returnDate).toISOString(),
                userId,
            },
        });
        yield client_1.default.books.update({
            where: {
                id: Number(bookId),
            },
            data: {
                quantity: {
                    decrement: 1,
                },
            },
        });
        res.status(201).json({ message: 'Loan created', loan });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.generateLoan = generateLoan;
const deleteLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const loan = yield client_1.default.loans.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        yield client_1.default.loans.delete({
            where: {
                id: Number(id),
            },
        });
        yield client_1.default.books.update({
            where: {
                id: loan.bookId,
            },
            data: {
                quantity: {
                    increment: 1,
                },
            },
        });
        res.status(200).json({ message: 'Loan deleted' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.deleteLoan = deleteLoan;
