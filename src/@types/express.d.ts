export interface LocalsMiddleware {
  bearerToken?: string
}

declare module 'express' {
  export interface Response {
    locals: LocalsMiddleware
  }
}
