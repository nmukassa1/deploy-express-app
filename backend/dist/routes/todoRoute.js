"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TodoController_1 = require("../controller/TodoController");
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.route("/todos")
    .post((0, express_2.requireAuth)(), (req, res) => {
    TodoController_1.TodoController.createTodo(req, res);
})
    .get((0, express_2.requireAuth)(), (req, res) => {
    TodoController_1.TodoController.getTodos(req, res);
});
router.delete('/delete/:id', (0, express_2.requireAuth)(), (req, res) => {
    TodoController_1.TodoController.deleteTodo(req, res);
});
exports.default = router;
