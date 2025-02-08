"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerkClient = void 0;
const backend_1 = require("@clerk/backend");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.clerkClient = (0, backend_1.createClerkClient)({ secretKey: process.env.CLERK_SECRET_KEY });
