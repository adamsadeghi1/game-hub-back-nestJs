import { Test, TestingModule } from '@nestjs/testing';
import { RawgGameController } from './rawgGame.controller';

describe('RawgGameController', () => {
  let controller: RawgGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RawgGameController],
    }).compile();

    controller = module.get<RawgGameController>(RawgGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
