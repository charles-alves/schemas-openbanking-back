import { app } from './app.js'
import debug from 'debug'
import mongoose from 'mongoose'
import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  config()
}

const log = debug('app:index')
const port = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    app.listen(port, () => log(`Listining on ${port}`))
  })
