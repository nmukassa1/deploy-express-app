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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const zod_1 = require("../validation/zod");
const express_1 = require("@clerk/express");
const prisma_1 = require("../utils/prisma");
class TodoController {
}
exports.TodoController = TodoController;
_a = TodoController;
TodoController.createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    req.body.title = req.body.title.trim();
    const validationResult = zod_1.createPostSchema.safeParse(req.body);
    if (!validationResult.success) {
        const errors = validationResult.error.flatten().fieldErrors;
        res.status(400).json({ errors });
        return;
    }
    const { title } = validationResult.data;
    try {
        const todo = yield prisma_1.prisma.todo.create({
            data: {
                title,
                userId
            }
        });
        res.send(todo);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
    return;
});
TodoController.getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const todos = yield prisma_1.prisma.todo.findMany({
            where: {
                userId
            }
        });
        res.send(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
TodoController.deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = (0, express_1.getAuth)(req);
    if (!id) {
        res.status(400).json({ error: 'Bad request' });
        return;
    }
    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const todo = yield prisma_1.prisma.todo.delete({
            where: {
                id: parseInt(id),
            },
        });
        console.log(todo);
        res.send(todo);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.default = new TodoController();
