import { Request, Response, Router } from 'express'
import { bearerToken } from '../../middlewares/bearer-token'
import { generic } from './service'
import { Group } from './types'

const router = Router()

router.post(
  '/',
  bearerToken,
  async (req: Request, res: Response<any, Group>) => {
    const entity = { ...req.body }
    const insertRes = await generic.insertOne(entity)

    res.json(insertRes)
  }
)

router.get('/:name', bearerToken, async (req: Request, res: Response) => {
  const { name } = req.params
  const findRes = await generic.findOne({ name })
  res.status(findRes ? 200 : 404).json(findRes)
})

router.delete('/:name', bearerToken, async (req: Request, res: Response) => {
  const { name } = req.params
  const findRes = await generic.findOneAndDelete({ name })
  res.status(findRes ? 200 : 404).json(findRes)
})

router.get(
  '/from-names/:names?',
  bearerToken,
  async (req: Request, res: Response) => {
    const names = req.params.names.split(',')
    const result = generic.find({ name: { $in: names } }).toArray()

    res.json(result)
  }
)

export { router }
