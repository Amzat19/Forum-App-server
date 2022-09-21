"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = void 0;
const loadEnv = (relativePath = "/../.env") => {
    if (process.env.NODE_ENV === "development") {
        require("dotenv").config();
    }
    else {
        const path = __dirname + relativePath;
        console.log("env path", path);
        const result = require("dotenv").config({
            path,
        });
        if (result.error) {
            throw result.error;
        }
    }
};
exports.loadEnv = loadEnv;
//# sourceMappingURL=envLoader.js.map