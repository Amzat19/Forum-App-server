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
exports.updateThreadPoint = void 0;
const index_1 = require("../index");
const Thread_1 = require("./Thread");
const ThreadPoint_1 = require("./ThreadPoint");
const User_1 = require("./User");
const updateThreadPoint = (userId, threadId, increment) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId || userId === "0") {
        return "User is not authenticated";
    }
    let message = "Failed to increment thread point";
    const thread = yield Thread_1.Thread.findOne({
        where: { id: threadId },
        relations: ["user"],
    });
    if (thread.user.id === userId) {
        message = "Error: users cannot increment their own thread";
        return message;
    }
    const user = yield User_1.User.findOne({ where: { id: userId } });
    const existingPoint = yield ThreadPoint_1.ThreadPoint.findOne({
        where: {
            thread: { id: threadId },
            user: { id: userId },
        },
        relations: ["thread"],
    });
    yield index_1.AppDataSource.manager.transaction((transactionEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        if (existingPoint) {
            if (increment) {
                if (existingPoint.isDecrement) {
                    yield ThreadPoint_1.ThreadPoint.remove(existingPoint);
                    thread.points = Number(thread.points) + 1;
                    thread.lastModifiedOn = new Date();
                    thread.save();
                }
            }
            else {
                if (!existingPoint.isDecrement) {
                    yield ThreadPoint_1.ThreadPoint.remove(existingPoint);
                    thread.points = Number(thread.points) - 1;
                    thread.lastModifiedOn = new Date();
                    thread.save();
                }
            }
        }
        else {
            yield ThreadPoint_1.ThreadPoint.create({
                thread,
                isDecrement: !increment,
                user,
            }).save();
            if (increment) {
                thread.points = Number(thread.points) + 1;
            }
            else {
                thread.points = Number(thread.points) - 1;
            }
            thread.lastModifiedOn = new Date();
            thread.save();
        }
        message = `Successfully ${increment ? "incremented" : "decremented"} point.`;
    }));
    return message;
});
exports.updateThreadPoint = updateThreadPoint;
//# sourceMappingURL=ThreadPointRepo.js.map