import { format } from "date-fns"
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'

import { Request, Response, NextFunction } from "express"

export const logEvents = async (message: string, logName: string) => {
    const timeDate = `${format(new Date(), "HH:mm:ss\tddMMyyyy")}`
    const logItem = `${timeDate}: ${uuid}\t${message}\n`
    console.log(logItem)

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem) //Serves both errLog and Log
    } catch(err) {
        console.error(err)
    }
}

export const logger = (req:Request, res:Response, next:NextFunction) => {
    logEvents(`${req.method}\t${req.headers.origins}\t${req.url}`, 'reqLog.txt') //Maybe macke this into a vairable to be import too?
    console.log(`${req.method}\t${req.path}`)
    next()
}

//We will see how these module export!