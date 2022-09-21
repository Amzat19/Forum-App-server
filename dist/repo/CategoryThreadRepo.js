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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopCategoryThread = void 0;
const CategoryThread_1 = __importDefault(require("./CategoryThread"));
const ThreadCategory_1 = require("./ThreadCategory");
const getTopCategoryThread = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield ThreadCategory_1.ThreadCategory.createQueryBuilder("threadCategory")
        .leftJoinAndSelect("threadCategory.threads", "thread")
        .getMany();
    const categoryThreads = [];
    categories.sort((a, b) => {
        if (a.threads.length > b.threads.length)
            return -1;
        if (a.threads.length < b.threads.length)
            return 1;
        return 0;
    });
    const topCats = categories.slice(0, 3);
    topCats.forEach((cat) => {
        cat.threads.sort((a, b) => {
            if (a.createdOn > b.createdOn)
                return -1;
            if (a.createdOn < b.createdOn)
                return 1;
            return 0;
        });
        cat.threads.forEach((th) => {
            categoryThreads.push(new CategoryThread_1.default(th.id, cat.id, cat.name, th.title, th.createdOn));
        });
    });
    return categoryThreads;
});
exports.getTopCategoryThread = getTopCategoryThread;
//# sourceMappingURL=CategoryThreadRepo.js.map