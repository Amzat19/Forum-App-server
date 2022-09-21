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
exports.changePassword = exports.me = exports.logout = exports.login = exports.register = exports.UserResult = void 0;
const User_1 = require("./User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const PasswordValidator_1 = require("../common/validators/PasswordValidator");
const EmailValidator_1 = require("../common/validators/EmailValidator");
const saltRounds = 10;
class UserResult {
    constructor(messages, user) {
        this.messages = messages;
        this.user = user;
    }
}
exports.UserResult = UserResult;
const register = (email, userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, PasswordValidator_1.isPasswordValid)(password);
    if (!result.isValid) {
        return {
            messages: [
                "Passwords must have min length 8, 1 upper character, 1 number, and 1 symbol",
            ],
        };
    }
    const trimmedEmail = email.trim().toLowerCase();
    const emailErrorMsg = (0, EmailValidator_1.isEmailValid)(trimmedEmail);
    if (emailErrorMsg) {
        return {
            messages: [emailErrorMsg],
        };
    }
    const salt = yield bcryptjs_1.default.genSalt(saltRounds);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const userEntity = yield User_1.User.create({
        email: trimmedEmail,
        userName,
        password: hashedPassword,
    }).save();
    userEntity.password = "";
    return {
        user: userEntity
    };
});
exports.register = register;
const login = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { userName } });
    if (!user) {
        return {
            messages: [userNotFound(userName)],
        };
    }
    const passwordMatch = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordMatch) {
        return {
            messages: ["Password is invalid."],
        };
    }
    return {
        user: user,
    };
});
exports.login = login;
const logout = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: { userName },
    });
    if (!user) {
        return userNotFound(userName);
    }
    return "User logged off.";
});
exports.logout = logout;
const me = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: { id },
        relations: ["threads", "threads.threadItems", "threadItems", "threadItems.thread"],
    });
    if (!user) {
        return {
            messages: ["User not found."],
        };
    }
    return {
        user: user,
    };
});
exports.me = me;
const changePassword = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: { id },
    });
    if (!user) {
        return "User not found.";
    }
    if (!user.confirmed) {
        return "User has not confirmed their registration email yet.";
    }
    const salt = yield bcryptjs_1.default.genSalt(saltRounds);
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    user.password = hashedPassword;
    user.save();
    return "Password changed successfully.";
});
exports.changePassword = changePassword;
function userNotFound(userName) {
    return `User with userName ${userName} not found.`;
}
//# sourceMappingURL=UserRepo.js.map