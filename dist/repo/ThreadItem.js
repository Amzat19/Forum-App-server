"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadItem = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Thread_1 = require("./Thread");
const ThreadItemPoint_1 = require("./ThreadItemPoint");
const Auditable_1 = require("./Auditable");
const User_1 = require("./User");
let ThreadItem = class ThreadItem extends Auditable_1.Auditable {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "Id", type: "bigint" }),
    __metadata("design:type", String)
], ThreadItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "Views", default: 0, nullable: false }),
    __metadata("design:type", Number)
], ThreadItem.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "Points", default: 0, nullable: false }),
    __metadata("design:type", Number)
], ThreadItem.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsDisabled", default: false, nullable: false }),
    __metadata("design:type", Boolean)
], ThreadItem.prototype, "isDisabled", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Body", length: 2500, nullable: true }),
    (0, class_validator_1.Length)(10, 2500),
    __metadata("design:type", String)
], ThreadItem.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.threadItems),
    __metadata("design:type", Object)
], ThreadItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Thread_1.Thread, (thread) => thread.threadItems),
    __metadata("design:type", Thread_1.Thread)
], ThreadItem.prototype, "thread", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ThreadItemPoint_1.ThreadItemPoint, (threadItemPoint) => threadItemPoint.threadItem),
    __metadata("design:type", Array)
], ThreadItem.prototype, "threadItemPoint", void 0);
ThreadItem = __decorate([
    (0, typeorm_1.Entity)({ name: "ThreadItems" })
], ThreadItem);
exports.ThreadItem = ThreadItem;
//# sourceMappingURL=ThreadItem.js.map