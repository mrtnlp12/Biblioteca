"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_controller_1 = require("../controllers/author.controller");
const router = (0, express_1.Router)();
router.get('/', author_controller_1.getAuthors);
router.post('/', author_controller_1.createAuthor);
exports.default = router;
