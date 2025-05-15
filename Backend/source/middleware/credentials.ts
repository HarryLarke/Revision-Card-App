import { Request, Response, NextFunction } from "express"

import allowOrigins from "../config/allowOrigins"

const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin
    if(origin && allowOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true')
    } next()
}

export default credentials