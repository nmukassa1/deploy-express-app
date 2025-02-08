"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createPostSchema = void 0;
// set up zod validation in ts
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, '1 minimum character').max(255, 'Title is too long'),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, 'Username: 1 minimum character').max(255, 'Username is too long'),
    password: zod_1.z.string().min(1, 'Password: 1 minimum character').max(255, 'Password is too long'),
});
