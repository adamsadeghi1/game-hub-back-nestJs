import { Test, TestingModule } from '@nestjs/testing';
import { RawgGenreController } from './rawgGenre.controller';
import { RawgService } from '../services/rawg.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('RawgGenreController', () => {
  let controller: RawgGenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      controllers: [RawgGenreController],
      providers: [RawgService],
    }).compile();

    controller = module.get<RawgGenreController>(RawgGenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
