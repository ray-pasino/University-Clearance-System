import mongoose from "mongoose";

const connectionToDatabase = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Database")
    }catch(err){
        console.log(err, "Connection error")
    }
}

export default connectionToDatabase