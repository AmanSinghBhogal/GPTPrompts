import mongoose from "mongoose";

let isConnected = false;    // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("Yo the app is connected to MongoDB");
        return;
    }

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