"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_controller_1 = require("../controllers/genre.controller");
const router = (0, express_1.Router)();
router.get('/', genre_controller_1.getGenres);
router.post('/', genre_controller_1.createGenre);
exports.default = router;
