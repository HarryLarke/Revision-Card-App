import mongoose from "mongoose";
const Schema = mongoose.Schema

const cardSchema = new Schema(
    {
    parentBundle: {
        type: mongoose.Schema.Types.ObjectId,
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
},
{
    timestamps: true
}

)
export default mongoose.model('Card', cardSchema)