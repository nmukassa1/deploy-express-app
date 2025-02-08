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
const express_1 = require("@clerk/express");
const express_2 = require("express");
const prisma_1 = require("../utils/prisma");
const router = (0, express_2.Router)();
router.post("/store-user", (0, express_1.requireAuth)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        console.log('User not found');
        return;
    }
    try {
        const user = yield express_1.clerkClient.users.getUser(userId);
        const { id, firstName, lastName } = user;
        //check if user already exists in database
        const userExists = yield prisma_1.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!userExists) {
            yield prisma_1.prisma.user.create({
                data: {
                    id: id,
                    firstName: firstName !== null && firstName !== void 0 ? firstName : '',
                    lastName: lastName !== null && lastName !== void 0 ? lastName : '',
                },
            });
        }
        console.log(userExists);
    }
    catch (error) {
        console.log(error);
        return;
    }
}));
exports.default = router;
