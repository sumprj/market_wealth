"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const bcrypt = require("bcrypt");
function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync('demorm', saltRounds);
}
//# sourceMappingURL=access-token.js.map