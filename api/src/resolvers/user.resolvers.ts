import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { UserModel, User } from '../models/user.model'
import { UserInput } from './user-input'

// Resolvers are responsbile for creating, reading, updating, and deleting existing database objects.
// @Query are used to read values and @Mutation is used for creating, updating, and deleting. 
@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async getUserById(@Arg('id') id: string) {
    return await UserModel.findById({ _id: id })
  }

  @Query(() => [User])
  async getAllUsers() {
    return await UserModel.find()
  }

  @Mutation(() => User)
  async createUser(
    @Arg('newUserInput') { name, age }: UserInput
  ): Promise<User> {
    const user = (
      await UserModel.create({
        name,
        age,
      })
    ).save()

    return user
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('editUserInput')
    { id, name, age }: UserInput
  ): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        age,
      },
      { new: true }
    )

    return user
  }

  @Mutation(() => String)
  async deleteUser(@Arg('id') id: string): Promise<String> {
    const result = await UserModel.deleteOne({ _id: id })

    if (result.acknowledged) return id
    else return 'error'
  }
}
