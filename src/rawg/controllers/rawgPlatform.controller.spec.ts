import { Test, TestingModule } from '@nestjs/testing';
import { RawgPlatformController } from './rawgPlatform.controller';

describe('RawgGameController', () => {
  let controller: RawgPlatformController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RawgPlatformController],
    }).compile();

    controller = module.get<RawgPlatformController>(RawgPlatformController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
