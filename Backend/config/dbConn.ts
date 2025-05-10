import mongoose from "mongoose";

//Maybe change type here?
const URI: string | any = process.env.DATABASE_URI

const connectDB = async () => {
    try{ 
        await mongoose.connect(URI)
    } catch(err){
        console.error(err.message)
    }
}

export default connectDB