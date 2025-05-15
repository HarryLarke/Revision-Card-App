import mongoose from "mongoose";
const Schema = mongoose.Schema

const cardSchema = new Schema({
    parentBundle: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})
export default mongoose.model('Card', cardSchema)