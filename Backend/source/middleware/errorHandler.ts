import { Response, Request, ErrorRequestHandler, NextFunction } from "express";

import { logEvents } from "./logEvents";
//Need to come to err here!
const errorHandler = (err: any | unknown, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
    console.log(err.stack)
    res.status(500).send(err.message)
}

export default errorHandler