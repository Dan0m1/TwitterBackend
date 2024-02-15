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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Tweet CRUD
// Create Tweet
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, image } = req.body;
    // @ts-ignore
    const user = req.user;
    try {
        const result = yield prisma.tweet.create({
            data: {
                content,
                image,
                userId: user.id,
            },
            include: { user: true }
        });
        res.json(result);
    }
    catch (e) {
        res.status(500).json({ error: "Wrong input" });
    }
}));
// get one tweet
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tweet = yield prisma.tweet.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
        }
    });
    if (!tweet) {
        res.status(404).send({ error: "Not Found" });
    }
    res.json(tweet);
}));
// update tweet
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content, image } = req.body;
    try {
        const result = yield prisma.tweet.update({
            where: { id: Number(id) },
            data: {
                content,
                image
            }
        });
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: `Failed to update the tweet` });
    }
}));
// delete tweet
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma.tweet.delete({ where: { id: Number(id) } });
    res.json(result);
}));
// list tweets
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("tweet request");
    const allTweets = yield prisma.tweet.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                }
            }
        }
    });
    res.json(allTweets);
}));
exports.default = router;
