import { InputType, Field, Int } from '@nestjs/graphql';
import { MaxLength, Min, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(50)
  firstName: string;

  @Field()
  @MaxLength(50)
  lastName: string;

  @Field(() => Int)
  @Min(0)
  age: number;

  @Field()
  @MaxLength(100)
  address: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(50)
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(50)
  lastName?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(100)
  address?: string;
}
