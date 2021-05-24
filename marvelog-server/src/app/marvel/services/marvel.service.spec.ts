import { Test, TestingModule } from '@nestjs/testing';
import { MarvelService } from './marvel.service';

describe('MarvelService', () => {
  let service: MarvelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarvelService],
    }).compile();

    service = module.get<MarvelService>(MarvelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
