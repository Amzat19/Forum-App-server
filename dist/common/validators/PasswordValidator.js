"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordValid = void 0;
const isPasswordValid = (password) => {
    const passwordTestResult = {
        message: "",
        isValid: true,
    };
    if (password.length < 8) {
        passwordTestResult.message = "Password must be at least 8 characters";
        passwordTestResult.isValid = false;
        return passwordTestResult;
    }
    const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if (!strongPassword.test(password)) {
        passwordTestResult.message =
            "Password must contain at least 1 special character, 1 cap letter, and 1 number";
        passwordTestResult.isValid = false;
    }
    return passwordTestResult;
};
exports.isPasswordValid = isPasswordValid;
//# sourceMappingURL=PasswordValidator.js.map