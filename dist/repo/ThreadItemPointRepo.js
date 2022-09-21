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
exports.updateThreadItemPoint = void 0;
const index_1 = require("../index");
const ThreadItem_1 = require("./ThreadItem");
const ThreadItemPoint_1 = require("./ThreadItemPoint");
const User_1 = require("./User");
const updateThreadItemPoint = (userId, threadItemId, increment) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId || userId === "0") {
        return "User is not authenticated";
    }
    let message = "Failed to increment thread item point";
    const threadItem = yield ThreadItem_1.ThreadItem.findOne({
        where: { id: threadItemId },
        relations: ["user"],
    });
    console.log("threadItemId, userId, threadItem!.user!.id", threadItemId, userId, threadItem.user.id);
    if (threadItem.user.id === userId) {
        message = "Error: users cannot increment their own thread item";
        console.log("incThreadItemPoints", message);
        return message;
    }
    const user = yield User_1.User.findOne({ where: { id: userId } });
    const existingPoint = yield ThreadItemPoint_1.ThreadItemPoint.findOne({
        where: {
            threadItem: { id: threadItemId },
            user: { id: userId },
        },
        relations: ["threadItem"],
    });
    yield index_1.AppDataSource.manager.transaction((transactionEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        if (existingPoint) {
            console.log("existingPoint");
            if (increment) {
                console.log("increment");
                if (existingPoint.isDecrement) {
                    console.log("remove dec");
                    yield ThreadItemPoint_1.ThreadItemPoint.remove(existingPoint);
                    threadItem.points = Number(threadItem.points) + 1;
                    threadItem.lastModifiedOn = new Date();
                    yield threadItem.save();
                }
            }
            else {
                if (!existingPoint.isDecrement) {
                    console.log("remove inc");
                    yield ThreadItemPoint_1.ThreadItemPoint.remove(existingPoint);
                    threadItem.points = Number(threadItem.points) - 1;
                    threadItem.lastModifiedOn = new Date();
                    yield threadItem.save();
                }
            }
        }
        else {
            console.log("new threadItem point");
            yield ThreadItemPoint_1.ThreadItemPoint.create({
                threadItem,
                isDecrement: !increment,
                user,
            }).save();
            if (increment) {
                threadItem.points = Number(threadItem.points) + 1;
            }
            else {
                threadItem.points = Number(threadItem.points) - 1;
            }
            threadItem.lastModifiedOn = new Date();
            yield threadItem.save();
        }
        message = `Successfully ${increment ? "incremented" : "decremented"} point.`;
    }));
    return message;
});
exports.updateThreadItemPoint = updateThreadItemPoint;
//# sourceMappingURL=ThreadItemPointRepo.js.map