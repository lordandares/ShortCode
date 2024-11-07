import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLinkInput {
  @Field()
  originalUrl: string;
}
