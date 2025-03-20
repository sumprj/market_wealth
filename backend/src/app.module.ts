import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentPricesModule } from './models/instrument-prices/instrument-prices.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'sumit',
      password: 'Token@123',
      database: 'market_arpan',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging:false
    }),
    UserModule,
    InstrumentPricesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
