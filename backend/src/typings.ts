import { IsNumberString } from 'class-validator';

export const STRING_MAX_LENGTH = 250;

export class IdParams {
  @IsNumberString()
  id: number;
}
