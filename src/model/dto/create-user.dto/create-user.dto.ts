import { IsString, IsInt, Min, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @MaxLength(100)
  address: string;
}
