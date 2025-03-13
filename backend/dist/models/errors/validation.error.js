"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const common_1 = require("@nestjs/common");
class ValidationError extends common_1.HttpException {
    constructor(message) {
        super({ message, error: 'Validation Error' }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation.error.js.map