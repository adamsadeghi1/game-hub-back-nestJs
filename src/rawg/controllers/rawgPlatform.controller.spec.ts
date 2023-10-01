import { Test, TestingModule } from '@nestjs/testing';
import { RawgPlatformController } from './rawgPlatform.controller';
import { RawgService } from '../services/rawg.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

describe('RawgPlatformController', () => {
  let controller: RawgPlatformController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      controllers: [RawgPlatformController],
      providers: [RawgService],
    }).compile();

    controller = module.get<RawgPlatformController>(RawgPlatformController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
