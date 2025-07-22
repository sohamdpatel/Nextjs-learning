import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export default async function dbConnect () : Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to db");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/", {
      dbName: "anonyfeedback",
    })
        
        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully");
        
    } catch (error) {
        console.log("Database Connection Failed", error);
        
        process.exit(1)
    }

}