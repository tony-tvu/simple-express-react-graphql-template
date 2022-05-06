import {
  prop as Property,
  getModelForClass,
  modelOptions,
} from '@typegoose/typegoose'
import { Field, ObjectType, ID } from 'type-graphql'

// User class: Typegoose and Type-GraphQL allows us to write 1 single class for MongoDB and GraphQL.
// This class is essentially the bridge between the MongoDB database and GraphQL endpoints. 
@ObjectType({ description: 'User model' })
@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
  @Field(() => ID)
  id: string

  @Field()
  @Property({ type: () => String, required: true })
  name: string

  @Field()
  @Property({ type: () => Number, required: true })
  age: number

  @Field()
  @Property({ required: true, default: Date.now })
  createdAt: Date

  @Field()
  @Property({ required: true, default: Date.now })
  updatedAt: Date
}

export const UserModel = getModelForClass(User)
