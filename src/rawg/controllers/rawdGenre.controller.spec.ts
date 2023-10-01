import { Test, TestingModule } from '@nestjs/testing';
import { RawgGenreController } from './rawgGenre.controller';

describe('RawgGenreController', () => {
  let controller: RawgGenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RawgGenreController],
    }).compile();

    controller = module.get<RawgGenreController>(RawgGenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
