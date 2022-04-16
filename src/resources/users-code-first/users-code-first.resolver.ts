import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersCodeFirstService } from './users-code-first.service';
import { UsersCodeFirst } from './entities/users-code-first.entity';
import { CreateUsersCodeFirstInput } from './dto/create-users-code-first.input';
import { UpdateUsersCodeFirstInput } from './dto/update-users-code-first.input';

@Resolver(() => UsersCodeFirst)
export class UsersCodeFirstResolver {
  constructor(private readonly usersCodeFirstService: UsersCodeFirstService) {}

  @Mutation(() => UsersCodeFirst)
  createUsersCodeFirst(
    @Args('createUsersCodeFirstInput')
    createUsersCodeFirstInput: CreateUsersCodeFirstInput,
  ) {
    return this.usersCodeFirstService.create(createUsersCodeFirstInput);
  }

  @Query(() => [UsersCodeFirst], { name: 'usersCodeFirst' })
  findAll() {
    return this.usersCodeFirstService.findAll();
  }

  @Query(() => UsersCodeFirst, { name: 'usersCodeFirst' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersCodeFirstService.findOne(id);
  }

  @Mutation(() => UsersCodeFirst)
  updateUsersCodeFirst(
    @Args('updateUsersCodeFirstInput')
    updateUsersCodeFirstInput: UpdateUsersCodeFirstInput,
  ) {
    return this.usersCodeFirstService.update(
      updateUsersCodeFirstInput.id,
      updateUsersCodeFirstInput,
    );
  }

  @Mutation(() => UsersCodeFirst)
  removeUsersCodeFirst(@Args('id', { type: () => Int }) id: number) {
    return this.usersCodeFirstService.remove(id);
  }
}
