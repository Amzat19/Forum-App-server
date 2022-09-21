"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailValid = void 0;
const isEmailValid = (email) => {
    if (!email)
        return "Email cannot be empty";
    if (!email.includes("@")) {
        return "Please enter valid email address.";
    }
    if (/\s+/g.test(email)) {
        return "Email cannot have whitespaces";
    }
    return "";
};
exports.isEmailValid = isEmailValid;
//# sourceMappingURL=EmailValidator.js.map