# EV Charge Network - Backend

A RESTful API service for managing EV charging stations, built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── config/               # Configuration files
│   └── db.js            # Database connection configuration
│
├── controllers/         # Request handlers
│   ├── authController.js # Authentication logic
│   └── chargerController.js # Charger management logic
│
├── middleware/          # Custom middleware
│   └── auth.js          # Authentication middleware
│
├── models/              # Database models
│   ├── User.js          # User model
│   └── Charger.js       # Charger model
│
├── routes/              # Route definitions
│   ├── auth.js          # Authentication routes
│   └── chargers.js      # Charger management routes
│
├── .env                # Environment variables (gitignored)
├── .env.sample         # Example environment variables
├── .gitignore
├── package.json         # Project dependencies and scripts
└── server.js           # Application entry point
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:ihemanthm/Evoltsoft.git
   cd Evoltsoft/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.sample` to `.env`
   - Update the environment variables in `.env` with your configuration

4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000` by default.

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reload
- `npm test`: Run tests (not implemented yet)


## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Charging Stations
- `GET /api/stations` - Get all charging stations
- `GET /api/stations/:id` - Get single station
- `POST /api/stations` - Create new station (protected)
- `PUT /api/stations/:id` - Update station (protected)
- `DELETE /api/stations/:id` - Delete station (protected)

## API Documentation

API documentation is available at [API Docs](https://documenter.getpostman.com/view/38263185/2sB2qgcxdg)

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

## Deployement

You can find the Deployed version of this project at [Here](https://evoltsoft.onrender.com)
