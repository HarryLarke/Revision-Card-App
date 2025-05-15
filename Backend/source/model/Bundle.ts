import mongoose from "mongoose";

const Schema = mongoose.Schema

const bundleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export default mongoose.model('Bundle', bundleSchema)

//Potentially work this data into a class system?
//MongoDB will also give it an id upon receiving the data.

//May have to put user identifers in later.