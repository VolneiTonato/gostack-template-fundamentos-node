import { Request, Response, NextFunction } from 'express'
import { ExceptionError } from '../exceptions/customException'

export function errorHandle(err: ExceptionError, req: Request, res: Response, next: NextFunction): Response {
    const status = err.status || 500
    const message = err.message || 'Erro interno no servidor'
    return res.status(status).json({ error: message })

}
