import Express, { Router } from 'express'
import { ApolloServer } from 'apollo-server-express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { connect } from 'mongoose'
import { UserResolver } from './resolvers/user.resolvers'

const initServer = async () => {
  const appServer = Express()

  // MongoDB connection (make sure you hide the connection string in a STAGE or PROD environment)
  await connect('mongodb://localhost:27017/mongo-local')

  // Apollo GraphQL
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: false,
  })
  const apolloServer = new ApolloServer({ schema: schema })
  apolloServer.applyMiddleware({ app: appServer })

  // Controllers
  const router: Router = Router()
  router.get('/', async (req, res) => {
    return res
      .status(200)
      .json({ message: 'Simple API built with Express, Apollo GraphQL, and MongoDB.' })
  })
  appServer.use(router)

  // Start server
  const PORT = 8080
  appServer.listen({ port: PORT }, () =>
    console.log(`App started on port ${PORT}`)
  )
}

initServer().catch((err) => {
  console.log(err)
})
