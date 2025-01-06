import mongoose from "mongoose";

// Create a reusable database connection
const dbConnect = async () => {
  // Check if the app is already connected to the database
  if (mongoose.connection.readyState === 1) return; // If connected, skip the connection process

  try {
    // Connect to MongoDB (use your Mongo URI from .env)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process in case of error
  }
};

export default dbConnect;
