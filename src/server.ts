import express from 'express'
import mainRoutes from './routes'
import cors from 'cors'
export const setup = async () => {
  const app = express()
  app.use(express.json())
  app.use(mainRoutes)
  app.use(
    cors({
      origin: function (origin, callback) {
        return callback(null, true)
      }
    })
  )
  return app
}
