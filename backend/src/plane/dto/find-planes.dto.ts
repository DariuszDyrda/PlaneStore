import { Transform } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';
import { STRING_MAX_LENGTH } from 'src/typings';

export class FindPlanesDto {
  @IsOptional()
  @Transform((skip) => parseInt(skip.value), { toClassOnly: true })
  skip?: number;

  @IsOptional()
  @Transform((take) => parseInt(take.value), { toClassOnly: true })
  take?: number;

  @IsOptional()
  @MaxLength(STRING_MAX_LENGTH)
  search?: string;
}
