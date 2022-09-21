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
exports.getThreadsLatest = exports.getThreadsByCategoryId = exports.getThreadById = exports.createThread = void 0;
const ThreadValidators_1 = require("../common/validators/ThreadValidators");
const Thread_1 = require("./Thread");
const ThreadCategory_1 = require("./ThreadCategory");
const User_1 = require("./User");
const createThread = (userId, categoryId, title, body) => __awaiter(void 0, void 0, void 0, function* () {
    const titleMsg = (0, ThreadValidators_1.isThreadTitleValid)(title);
    if (titleMsg) {
        return {
            messages: [titleMsg],
        };
    }
    const bodyMsg = (0, ThreadValidators_1.isThreadBodyValid)(body);
    if (bodyMsg) {
        return {
            messages: [bodyMsg],
        };
    }
    const user = yield User_1.User.findOne({
        where: {
            id: userId,
        }
    });
    if (!user) {
        return {
            messages: ["User not logged in."],
        };
    }
    const category = yield ThreadCategory_1.ThreadCategory.findOne({
        where: {
            id: categoryId,
        }
    });
    if (!category) {
        return {
            messages: ["category not found."],
        };
    }
    const thread = yield Thread_1.Thread.create({
        title,
        body,
        user,
        category,
    }).save();
    if (!thread) {
        return {
            messages: ["Failed to create thread."],
        };
    }
    return {
        messages: [thread.id],
    };
});
exports.createThread = createThread;
const getThreadById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const thread = yield Thread_1.Thread.findOne({
        where: { id },
        relations: ["user", "threadItems", "threadItems.user", "category", "threadItems.thread"],
    });
    if (!thread) {
        return {
            messages: ["Thread not found."],
        };
    }
    return {
        entity: thread,
    };
});
exports.getThreadById = getThreadById;
const getThreadsByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const threads = yield Thread_1.Thread.createQueryBuilder("thread")
        .where(`thread."categoryId" = :categoryId`, { categoryId })
        .leftJoinAndSelect("thread.category", "category")
        .leftJoinAndSelect("thread.threadItems", "threadItems")
        .leftJoinAndSelect("thread.user", "user")
        .orderBy("thread.createdOn", "DESC")
        .getMany();
    if (!threads || threads.length === 0) {
        return {
            messages: ["Threads of category not found."],
        };
    }
    return {
        entities: threads,
    };
});
exports.getThreadsByCategoryId = getThreadsByCategoryId;
const getThreadsLatest = () => __awaiter(void 0, void 0, void 0, function* () {
    const threads = yield Thread_1.Thread.createQueryBuilder("thread")
        .leftJoinAndSelect("thread.category", "category")
        .leftJoinAndSelect("thread.user", "user")
        .leftJoinAndSelect("thread.threadItems", "threadItems")
        .orderBy("thread.createdOn", "DESC")
        .take(10)
        .getMany();
    if (!threads || threads.length === 0) {
        return {
            messages: ["No threads found."],
        };
    }
    return {
        entities: threads,
    };
});
exports.getThreadsLatest = getThreadsLatest;
//# sourceMappingURL=ThreadRepo.js.map