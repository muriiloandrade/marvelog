import { Test, TestingModule } from '@nestjs/testing';
import { MarvelController } from './marvel.controller';

describe('MarvelController', () => {
  let controller: MarvelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarvelController],
    }).compile();

    controller = module.get<MarvelController>(MarvelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
