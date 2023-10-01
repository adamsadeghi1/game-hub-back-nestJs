import { Test, TestingModule } from '@nestjs/testing';
import { RawgGameController } from './rawgGame.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RawgService } from '../services/rawg.service';

describe('RawgGameController', () => {
  let controller: RawgGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      controllers: [RawgGameController],
      providers: [RawgService],
    }).compile();

    controller = module.get<RawgGameController>(RawgGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
