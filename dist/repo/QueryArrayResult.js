"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryOneResult = exports.QueryArrayResult = void 0;
class QueryArrayResult {
    constructor(messages, entities) {
        this.messages = messages;
        this.entities = entities;
    }
}
exports.QueryArrayResult = QueryArrayResult;
class QueryOneResult {
    constructor(messages, entity) {
        this.messages = messages;
        this.entity = entity;
    }
}
exports.QueryOneResult = QueryOneResult;
//# sourceMappingURL=QueryArrayResult.js.map