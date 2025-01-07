import mongoose from "mongoose";

let isConnected = false; // Track the connection status globally

// Create a reusable database connection function
const dbConnect = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return; // Skip connection if already connected
  }

  try {
    // Connect to MongoDB using the URI from environment variables
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = connection.connections[0].readyState === 1; // Mark as connected
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if there is a connection error
  }
};

export default dbConnect;
