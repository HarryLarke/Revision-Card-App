require('dotenv').config()
import mongoose from "mongoose"
import express from "express"
import path from "path"
import cors from "cors"
import corsOptions from "./config/corsOptions"
import errorHandler from "./middleware/errorHandler"
import connectDb from "./config/dbConn"
//Probs need credentials...
import { logger } from "./middleware/logEvents"
const app = express()
const PORT = process.env.PORT || 3500

connectDb() 

app.use(logger)
app.use()