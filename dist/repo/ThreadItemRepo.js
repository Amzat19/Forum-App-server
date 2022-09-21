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
exports.getThreadItemsByThreadId = exports.createThreadItem = void 0;
const ThreadValidators_1 = require("../common/validators/ThreadValidators");
const ThreadItem_1 = require("./ThreadItem");
const User_1 = require("./User");
const Thread_1 = require("./Thread");
const createThreadItem = (userId, threadId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyMsg = (0, ThreadValidators_1.isThreadBodyValid)(body);
    if (bodyMsg) {
        return {
            messages: [bodyMsg],
        };
    }
    if (!userId) {
        return {
            messages: ["User not logged in."],
        };
    }
    const user = yield User_1.User.findOne({
        where: {
            id: userId
        }
    });
    const thread = yield Thread_1.Thread.findOne({
        where: {
            id: threadId,
        }
    });
    if (!thread) {
        return {
            messages: ["Thread not found."],
        };
    }
    const threadItem = yield ThreadItem_1.ThreadItem.create({
        body,
        user,
        thread,
    }).save();
    if (!threadItem) {
        return {
            messages: ["Failed to create ThreadItem."],
        };
    }
    return {
        messages: [`${threadItem.id}`],
    };
});
exports.createThreadItem = createThreadItem;
const getThreadItemsByThreadId = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    const threadItems = yield ThreadItem_1.ThreadItem.createQueryBuilder("ti")
        .where(`ti."threadId" = :threadId`, { threadId })
        .leftJoinAndSelect("ti.thread", "thread")
        .orderBy("ti.createdOn", "DESC")
        .getMany();
    if (!threadItems) {
        return {
            messages: ["ThreadItems of thread not found."],
        };
    }
    console.log(threadItems);
    return {
        entities: threadItems,
    };
});
exports.getThreadItemsByThreadId = getThreadItemsByThreadId;
//# sourceMappingURL=ThreadItemRepo.js.map