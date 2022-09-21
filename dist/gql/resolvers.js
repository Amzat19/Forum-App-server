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
const CategoryThreadRepo_1 = require("../repo/CategoryThreadRepo");
const ThreadCategoryRepo_1 = require("../repo/ThreadCategoryRepo");
const ThreadItemPointRepo_1 = require("../repo/ThreadItemPointRepo");
const ThreadItemRepo_1 = require("../repo/ThreadItemRepo");
const ThreadPointRepo_1 = require("../repo/ThreadPointRepo");
const ThreadRepo_1 = require("../repo/ThreadRepo");
const UserRepo_1 = require("../repo/UserRepo");
const resolvers = {
    ThreadResult: {
        __resolveType(obj, context, info) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "Thread";
        },
    },
    ThreadArrayResult: {
        __resolveType(obj, context, info) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "ThreadArray";
        },
    },
    UserResult: {
        __resolveType(obj, context, info) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "User";
        }
    },
    Query: {
        getThreadById: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let thread;
            try {
                thread = yield (0, ThreadRepo_1.getThreadById)(args.id);
                if (thread.entity) {
                    return thread.entity;
                }
                return {
                    messages: thread.messages ? thread.messages : ["test"],
                };
            }
            catch (ex) {
                throw ex;
            }
        }),
        getThreadsByCategoryId: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let threads;
            try {
                threads = yield (0, ThreadRepo_1.getThreadsByCategoryId)(args.categoryId);
                if (threads.entities) {
                    return {
                        threads: threads.entities,
                    };
                }
                return {
                    messages: threads.messages ? threads.messages : ["An error occured"],
                };
            }
            catch (ex) {
                throw ex;
            }
        }),
        getThreadsLatest: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let threads;
            try {
                threads = yield (0, ThreadRepo_1.getThreadsLatest)();
                if (threads.entities) {
                    return {
                        threads: threads.entities,
                    };
                }
                return {
                    messages: threads.messages ? threads.messages : ["An error has occured"],
                };
            }
            catch (ex) {
                throw ex;
            }
        }),
        getThreadItemByThreadId: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let threadItems;
            try {
                threadItems = yield (0, ThreadItemRepo_1.getThreadItemsByThreadId)(args.threadId);
                if (threadItems.entities) {
                    return {
                        threadItems: threadItems.entities,
                    };
                }
                return {
                    messages: threadItems.messages
                        ? threadItems.messages
                        : ["An error has occured"],
                };
            }
            catch (ex) {
                throw ex;
            }
        }),
        getAllCategories: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let categories;
            try {
                categories = yield (0, ThreadCategoryRepo_1.getAllCategories)();
                if (categories.entities) {
                    return categories.entities;
                }
                return {
                    messages: categories.messages
                        ? categories.messages
                        : ["An error has occured"],
                };
            }
            catch (ex) {
                throw ex;
            }
        }),
        me: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            let user;
            try {
                if (!((_a = ctx.req.session) === null || _a === void 0 ? void 0 : _a.userId)) {
                    return {
                        messages: ["User not logged in."],
                    };
                }
                user = yield (0, UserRepo_1.me)(ctx.req.session.userId);
                if (user && user.user) {
                    return user.user;
                }
                return {
                    messages: user.messages ? user.messages : ["An error has occured"],
                };
            }
            catch (ex) {
                throw ex;
            }
        }),
        getTopCategoryThread: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, CategoryThreadRepo_1.getTopCategoryThread)();
            }
            catch (ex) {
                console.log(ex.message);
                throw ex;
            }
        }),
    },
    Mutation: {
        createThread: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let result;
            try {
                result = yield (0, ThreadRepo_1.createThread)(args.userId, args.categoryId, args.title, args.body);
                return {
                    messages: result.messages ? result.messages : ["An error has occurred"],
                };
            }
            catch (ex) {
                throw ex;
            }
        }),
        createThreadItem: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let result;
            try {
                result = yield (0, ThreadItemRepo_1.createThreadItem)(args.userId, args.threadId, args.body);
                return {
                    messages: result.messages ? result.messages : ["An error has occured."],
                };
            }
            catch (ex) {
                console.log(ex);
                throw ex;
            }
        }),
        updateThreadPoint: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            let result = "";
            try {
                if (!ctx.req.session || !((_b = ctx.req.session) === null || _b === void 0 ? void 0 : _b.userId)) {
                    return "You must be logged in to set likes.";
                }
                result = yield (0, ThreadPointRepo_1.updateThreadPoint)(ctx.req.session.userId, args.threadId, args.increment);
                return result;
            }
            catch (ex) {
                throw ex;
            }
        }),
        updateThreadItemPoint: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            let result = "";
            try {
                if (!ctx.req.session || !((_c = ctx.req.session) === null || _c === void 0 ? void 0 : _c.userId)) {
                    return "You must be logged in to set likes.";
                }
                result = yield (0, ThreadItemPointRepo_1.updateThreadItemPoint)(ctx.req.session.userId, args.threadItemId, args.increment);
                return result;
            }
            catch (ex) {
                throw ex;
            }
        }),
        register: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let user;
            try {
                user = yield (0, UserRepo_1.register)(args.email, args.userName, args.password);
                if (user && user.user) {
                    return "Registration successful.";
                }
                return user && user.messages ? user.messages[0] : "An error has occured";
            }
            catch (ex) {
                throw ex;
            }
        }),
        login: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            let user;
            try {
                user = yield (0, UserRepo_1.login)(args.userName, args.password);
                if (user && user.user) {
                    ctx.req.session.userId = user.user.id;
                    return `Login successful for userId ${ctx.req.session.userId}.`;
                }
                return user && user.messages ? user.messages[0] : "An error has occured";
            }
            catch (ex) {
                console.log(ex.message);
                throw ex;
            }
        }),
        logout: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            var _d;
            try {
                let result = yield (0, UserRepo_1.logout)(args.userName);
                (_d = ctx.req.session) === null || _d === void 0 ? void 0 : _d.destroy((err) => {
                    var _a;
                    if (err) {
                        console.log("destroy session failed");
                        return;
                    }
                    console.log("session destroyed", (_a = ctx.req.session) === null || _a === void 0 ? void 0 : _a.userId);
                });
                return result;
            }
            catch (ex) {
                throw ex;
            }
        }),
        changePassword: (obj, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!ctx.req.session || !ctx.req.session.userId) {
                    return "You must be logged in before you can change your password.";
                }
                let result = yield (0, UserRepo_1.changePassword)(ctx.req.session.userId, args.newPassword);
                return result;
            }
            catch (ex) {
                throw ex;
            }
        }),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map