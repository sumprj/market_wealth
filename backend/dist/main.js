"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const common_1 = require("@nestjs/common");
const jwt__auth_guard_1 = require("./auth/jwt -auth-guard");
const jwt_1 = require("@nestjs/jwt");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const jwtService = app.get(jwt_1.JwtService);
    app.useGlobalGuards(new jwt__auth_guard_1.JwtAuthGuard(jwtService));
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map