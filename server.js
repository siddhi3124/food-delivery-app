require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Import the config file

const customerRoutes = require('./food-delivery-app/routes/customerRoutes');
const restaurantRoutes = require('./food-delivery-app/routes/restaurantRoutes');
const deliveryRoutes = require('./food-delivery-app/routes/deliveryRoutes');
const adminRoutes = require('./food-delivery-app/routes/adminRoutes');
const authRoutes = require('./food-delivery-app/routes/authRoutes');
const errorHandler = require('./food-delivery-app/middleware/errorHandler');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));


// Middleware
app.use(cors());
app.use(express.json());

// Base routes
app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
    res.send('Food Delivery API is running');
});

// Serve Swagger UI with your generated documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export the app, not the server