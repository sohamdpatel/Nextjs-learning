import mongoose from "mongoose";


export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL as string, {
      dbName: "nextauth",
    })

        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error:", err);
            process.exit(); // Exit the process if connection fails
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
        
    }
}