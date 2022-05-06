import express, { Router } from 'express'

const app = express()
const router: Router = Router()

router.get('/', async (req, res) => {
  return res.status(200).json({ message: 'Simple API build with Express, GraphQL, and MongoDB.' })
})

app.use(router)

const PORT = 8080
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`)
})
