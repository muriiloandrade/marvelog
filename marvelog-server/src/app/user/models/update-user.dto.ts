import { OmitType } from '@nestjs/mapped-types';
import { RegisterDTO } from '@app/auth/models/register.dto';

export class UpdateUserDTO extends OmitType(RegisterDTO, [
  'password',
  'username',
]) {}
