const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true }, // Unique Clerk user ID
    username: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
