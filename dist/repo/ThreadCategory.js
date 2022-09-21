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
exports.ThreadCategory = void 0;
const typeorm_1 = require("typeorm");
const Auditable_1 = require("./Auditable");
const Thread_1 = require("./Thread");
let ThreadCategory = class ThreadCategory extends Auditable_1.Auditable {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "Id", type: "bigint" }),
    __metadata("design:type", String)
], ThreadCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Name",
        length: 100,
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], ThreadCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Description",
        length: 150,
        nullable: true,
    }),
    __metadata("design:type", String)
], ThreadCategory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Thread_1.Thread, (thread) => thread.category),
    __metadata("design:type", Array)
], ThreadCategory.prototype, "threads", void 0);
ThreadCategory = __decorate([
    (0, typeorm_1.Entity)({ name: "ThreadCategories" })
], ThreadCategory);
exports.ThreadCategory = ThreadCategory;
//# sourceMappingURL=ThreadCategory.js.map