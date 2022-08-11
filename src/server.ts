import express from 'express'
import mainRoutes from './routes'
export const setup = async () => {
  const app = express()
  app.use(express.json())
  app.use(mainRoutes)

  return app
}
