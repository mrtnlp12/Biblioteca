"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const editorial_controller_1 = require("../controllers/editorial.controller");
const router = (0, express_1.Router)();
router.get('/', editorial_controller_1.getEditorials);
router.post('/', editorial_controller_1.createEditorial);
router.put('/:id', editorial_controller_1.updateEditorial);
exports.default = router;
