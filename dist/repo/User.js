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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Thread_1 = require("./Thread");
const ThreadPoint_1 = require("./ThreadPoint");
const ThreadItemPoint_1 = require("./ThreadItemPoint");
const Auditable_1 = require("./Auditable");
const ThreadItem_1 = require("./ThreadItem");
let User = class User extends Auditable_1.Auditable {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "Id", type: "bigint" }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Email",
        length: 120,
        unique: true,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "UserName",
        length: 60,
        unique: true,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Password",
        length: 100,
        nullable: false
    }),
    (0, class_validator_1.Length)(8, 100),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "Confirmed",
        default: false,
        nullable: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "confirmed", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isDisabled",
        default: false,
        nullable: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isDisabled", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Thread_1.Thread, (thread) => thread.user),
    __metadata("design:type", Array)
], User.prototype, "threads", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ThreadPoint_1.ThreadPoint, (threadPoint) => threadPoint.user),
    __metadata("design:type", Array)
], User.prototype, "threadPoints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ThreadItemPoint_1.ThreadItemPoint, (threadItemPoints) => threadItemPoints.user),
    __metadata("design:type", Array)
], User.prototype, "threadItemPoints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ThreadItem_1.ThreadItem, (threadItem) => threadItem.user),
    __metadata("design:type", Array)
], User.prototype, "threadItems", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: "Users" })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map