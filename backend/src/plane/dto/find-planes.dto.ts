import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FindPlanesDto {
  @IsOptional()
  @Transform((skip) => parseInt(skip.value), { toClassOnly: true })
  skip?: number;

  @IsOptional()
  @Transform((take) => parseInt(take.value), { toClassOnly: true })
  take?: number;
}
