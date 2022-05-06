import { Field, InputType, ID } from 'type-graphql'
import { User } from '../models/user.model'

// This class holds the field values for objects used to create a new entity or update an existing entity. 
// Input types are used in the GraphQL resolver methods. 
@InputType()
export class UserInput implements Partial<User> {
  @Field(() => ID, { nullable: true })
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  age: number
}
