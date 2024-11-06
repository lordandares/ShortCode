import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../../services/user/user.service';
import { UserType } from '../../dto/user/user.type';
import { CreateUserInput } from '../../dto/user/user.input';
import { UpdateUserInput } from '../../dto/user/user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  findAllUsers(): Promise<UserType[]> {
    return this.userService.findAll();
  }

  @Query(() => UserType, { nullable: true })
  findUserById(@Args('id', { type: () => Int }) id: number): Promise<UserType> {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserType)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserType, { nullable: true })
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<UserType> {
    return this.userService.updateUser(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.userService.deleteUser(id).then(() => true);
  }
}
