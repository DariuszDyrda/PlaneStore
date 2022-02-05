import { IsNumber, MaxLength } from 'class-validator';
import { STRING_MAX_LENGTH } from '../../typings';

export class CreateOrderDto {
  @MaxLength(STRING_MAX_LENGTH)
  clientName!: string;
  @MaxLength(STRING_MAX_LENGTH)
  clientAddress!: string;
  @IsNumber()
  planeId!: number;
}
