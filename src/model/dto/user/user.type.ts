import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  age: number;

  @Field()
  address: string;
}
