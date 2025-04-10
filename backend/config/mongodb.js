import mongoose from "mongoose";

const connectDB = async () => {
    // try {
    //     const conn = await mongoose.connect(process.env.MONGO_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     });
    //     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    // } catch (error) {
    //     console.error(`Error: ${error.message}`.red.bold);
    //     process.exit(1);
    // }

    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    })

    await mongoose.connect(process.env.MONGODB_URI);
}

export default connectDB;