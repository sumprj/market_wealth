"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUsernameOrEmailConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsUsernameOrEmailConstraint = class IsUsernameOrEmailConstraint {
    validate(value, args) {
        const object = args.object;
        return object.username || object.email;
    }
    defaultMessage(args) {
        return 'Either username or email must be provided for login';
    }
};
exports.IsUsernameOrEmailConstraint = IsUsernameOrEmailConstraint;
exports.IsUsernameOrEmailConstraint = IsUsernameOrEmailConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsUsernameOrEmail', async: false })
], IsUsernameOrEmailConstraint);
//# sourceMappingURL=is-username-or-email.constraint.js.map