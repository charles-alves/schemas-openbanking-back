import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import { schemasRoutes } from './routes/schema-routes.js'
import { NotFoundError } from './errors/not-fount-error.js'
import { errorHandler } from './middlewares/error-handler.js'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(schemasRoutes)

app.all('*', (req, res) => {
  throw new NotFoundError('This resource doen\'t exists')
})

app.use(errorHandler)
