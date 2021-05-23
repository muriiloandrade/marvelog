import { Module } from '@nestjs/common';
import { CharacterController } from '@app/character/controller/character.controller';
import { CharacterService } from '@app/character/services/character.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
