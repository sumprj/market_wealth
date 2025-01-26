import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessToken } from 'src/auth/access-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AccessToken]), // Register the entity
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot({
        //isGlobal: true, // Ensures ConfigModule is available globally
        envFilePath: '.env', // Ensure this points to the correct file
      })],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
