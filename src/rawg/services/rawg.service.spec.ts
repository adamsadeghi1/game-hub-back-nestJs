import { Test, TestingModule } from '@nestjs/testing';
import { RawgService } from './rawg.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('RawgService', () => {
  let service: RawgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
        ConfigModule.forRoot({ isGlobal: true })
      ],
      providers: [RawgService],
    }).compile();

    service = module.get<RawgService>(RawgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
