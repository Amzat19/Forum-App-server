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
exports.Thread = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const User_1 = require("./User");
const ThreadItem_1 = require("./ThreadItem");
const ThreadPoint_1 = require("./ThreadPoint");
const ThreadCategory_1 = require("./ThreadCategory");
const Auditable_1 = require("./Auditable");
let Thread = class Thread extends Auditable_1.Auditable {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "Id", type: "bigint" }),
    __metadata("design:type", String)
], Thread.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "Views", default: 0, nullable: false }),
    __metadata("design:type", Number)
], Thread.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "Points", default: 0, nullable: false }),
    __metadata("design:type", Number)
], Thread.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsDisabled", default: false, nullable: false }),
    __metadata("design:type", Boolean)
], Thread.prototype, "isDisabled", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Title", length: 150, nullable: false }),
    (0, class_validator_1.Length)(5, 150),
    __metadata("design:type", String)
], Thread.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Body", length: 2500, nullable: true }),
    (0, class_validator_1.Length)(10, 2500),
    __metadata("design:type", String)
], Thread.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.threads),
    __metadata("design:type", User_1.User)
], Thread.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ThreadItem_1.ThreadItem, (threadItems) => threadItems.thread),
    __metadata("design:type", Array)
], Thread.prototype, "threadItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ThreadPoint_1.ThreadPoint, (threadPoint) => threadPoint.thread),
    __metadata("design:type", Array)
], Thread.prototype, "threadPoints", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ThreadCategory_1.ThreadCategory, (threadCategory) => threadCategory.threads),
    __metadata("design:type", ThreadCategory_1.ThreadCategory)
], Thread.prototype, "category", void 0);
Thread = __decorate([
    (0, typeorm_1.Entity)({ name: "Threads" })
], Thread);
exports.Thread = Thread;
//# sourceMappingURL=Thread.js.map