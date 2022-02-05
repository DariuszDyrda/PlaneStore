import { MaxLength } from 'class-validator';
import { STRING_MAX_LENGTH } from '../../typings';

export class CreatePlaneDto {
  @MaxLength(STRING_MAX_LENGTH)
  name!: string;
  @MaxLength(STRING_MAX_LENGTH)
  description!: string;
  @MaxLength(STRING_MAX_LENGTH)
  photoUrl!: string;
}
