import mongoose from "mongoose";

let isConnected = false;    // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    // If already connected to DB
    if(isConnected){
        console.log("Yo the app is connected to MongoDB");
        return;
    }

    // If Not connnected to DB then establish the connection:
    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true;

        console.log("Ha Connection ho gya database se...");

    } catch (error) {
        console.log(error);
    }
}