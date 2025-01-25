import { IsNumber, IsString, Length } from 'class-validator';

export class UpdateExpensingDto {
  @IsString()
  @Length(2, 20)
  category?: string;

  @IsString()
  @Length(2, 20)
  productName?: string;

  @IsNumber()
  quantity?: number;

  @IsNumber()
  price?: number;
}
