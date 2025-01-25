import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateExpensingDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  category: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
