import { Request, Response, Router } from 'express'

const router = Router()

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'ok', timestamp: new Date().getTime() })
})

export { router }
