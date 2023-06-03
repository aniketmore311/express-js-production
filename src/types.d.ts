import {Request, Response, NextFunction, Application} from 'express'

export type AsyncHandler = (req: Request, res: Response, next: NextFunction )=> Promise<any>
export type ControllerRegisterFn = (app: Application) => void