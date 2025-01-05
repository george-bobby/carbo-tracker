const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const carbonRoutes = require('./routes/carbonfootprint'); // Import carbon routes
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
});

// Routes
app.use('/api/carbon', carbonRoutes); // Use the carbon footprint routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
