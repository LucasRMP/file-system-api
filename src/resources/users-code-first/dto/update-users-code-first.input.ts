import { CreateUsersCodeFirstInput } from './create-users-code-first.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersCodeFirstInput extends PartialType(
  CreateUsersCodeFirstInput,
) {
  @Field(() => Int)
  id: number;
}
