import { NextFunction, Request, RequestHandler, Response } from 'express'

export const bearerToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const authorization = (
  //   req.headers['authorization'] ||
  //   req.headers['Authorization'] ||
  //   ''
  // ).toString()

  // if (
  //   !authorization ||
  //   !authorization.toLocaleLowerCase().startsWith('bearer ')
  // ) {
  //   res.status(401).send({ message: `Authorization header is missing!` })
  //   return
  // }

  // res.locals = {
  //   ...res.locals,
  //   bearerToken: authorization.substring('bearer '.length)
  // }
  next()
}
