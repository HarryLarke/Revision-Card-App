require('dotenv').config()
import mongoose from "mongoose"
import express from "express"
import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser"
import corsOptions from './config/corsOptions'
import errorHandler from "./middleware/errorHandler"
import connectDb from "./config/dbConn"
import credentials from "./middleware/credentials"
import cards from "./routes/api/cards"
import bundles from "./routes/api/bundles"
import { logger } from "./middleware/logEvents"
const app = express()

const PORT = process.env.PORT || 3500

connectDb() 

app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser()) 
app.use(express.static(path.join(__dirname, '/public')))

app.use('/cards', cards)
app.use('/bundles', bundles)
//Maybe produce protected routes later?

app.all('/', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if(req.accepts('json')) {
        res.json({ error: "404 Not Found"})
    } else (
        res.type('txt').send("404 Not Found")
    )
})
//Maybe put this process onto a seperate route, to make the server cleaner?
//In general try to make this file as clean as possible would be nice
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})
})