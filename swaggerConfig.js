const swaggerJsdoc = require('swagger-jsdoc');

// Basic options for Swagger documentation
const options = {
    definition: {
      openapi: '3.0.0', // OpenAPI version
      info: {
        title: 'Food Delivery App API Documentation',
        version: '1.0.0',
        description: 'This is the API documentation for Food Delivery App',
      },
      servers: [
        {
          url: 'http://localhost:5000',
          description: 'Local development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT" // Optional, typically used for JWT tokens
          },
      },
        schemas: {
                MenuItem: {
                  type: "object",
                  properties: {
                    restaurantId: {
                      type: "string",
                      description: "Reference to the associated Restaurant",
                    },
                    name: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    availability: {
                      type: "boolean",
                      default: true,
                    },
                  },
                },
                Order: {
                  type: "object",
                  properties: {
                    customerId: {
                      type: "string",
                      description: "Reference to the customer (User)",
                    },
                    restaurantId: {
                      type: "string",
                      description: "Reference to the associated Restaurant",
                    },
                    deliveryPersonId: {
                      type: "string",
                      description: "Reference to the delivery personnel (User), if assigned",
                    },
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          menuItemId: {
                            type: "string",
                            description: "Reference to a MenuItem",
                          },
                          quantity: { type: "integer" },
                        },
                      },
                    },
                    totalAmount: { type: "number" },
                    status: {
                      type: "string",
                      enum: [
                        "Placed",
                        "Accepted",
                        "Preparing",
                        "Ready for Delivery",
                        "In Transit",
                        "Delivered",
                        "Cancelled",
                      ],
                      default: "Placed",
                    },
                    deliveryAddress: { type: "string" },
                    placedAt: { type: "string", format: "date-time" },
                    deliveredAt: { type: "string", format: "date-time" },
                  },
                },
                Restaurant: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    ownerId: {
                      type: "string",
                      description: "Reference to the owner (User)",
                    },
                    address: { type: "string" },
                    cuisineType: { type: "string" },
                    operatingHours: { type: "string" },
                    deliveryZones: {
                      type: "array",
                      items: { type: "string" },
                    },
                    menuItems: {
                      type: "array",
                      items: {
                        type: "string",
                        description: "Reference to MenuItems",
                      },
                    },
                    createdAt: { type: "string", format: "date-time" },
                  },
                },
                User: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    password: { type: "string", format: "password" },
                    role: {
                      type: "string",
                      enum: ["customer", "restaurant_owner", "delivery_personnel", "admin"],
                    },
                    contactInfo: {
                      type: "object",
                      properties: {
                        phone: { type: "string" },
                        address: { type: "string" },
                      },
                    },
                    createdAt: { type: "string", format: "date-time" },
                  },
                },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    apis: ['./routes/*.js'], // Path to the API routes where you will write the Swagger comments
};

// Create the Swagger spec
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;