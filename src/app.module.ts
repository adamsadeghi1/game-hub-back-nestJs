import { Module } from '@nestjs/common';
import { RawgModule } from './rawg/rawg.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RawgModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
