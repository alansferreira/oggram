import { Router } from 'express'
import { router as health } from './modules/health'
import { router as entity } from './modules/entity'

const mainRouter = Router()

mainRouter.use('/', health)
mainRouter.use('/entity', entity)

export default mainRouter
