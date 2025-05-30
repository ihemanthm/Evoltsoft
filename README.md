# Evoltsoft - EV Charging Station Management System

Evoltsoft is a full-stack web application for managing electric vehicle (EV) charging stations. The application provides user authentication and charging station management features.

## Features

- User Authentication (Register/Login)
- Charging Station Management
- Real-time Status Updates
- Responsive Web Interface
- Secure API Endpoints

## Tech Stack

### Frontend
- Vue.js 3 (Composition API)
- Pinia (State Management)
- Vue Router
- Axios (HTTP Client)
- Tailwind CSS (Styling)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT Authentication
- CORS Support

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- MongoDB (local or Atlas)
- Google Maps API Key (for maps integration)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ihemanthm/Evoltsoft.git
cd Evoltsoft
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Project Structure

```
Evoltsoft/
├── backend/              # Backend server
│   ├── config/           # Database and other configurations
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   ├── .env.sample       # Environment variables sample
│   ├── package.json      # Backend dependencies
│   └── server.js         # Main server file
│
├── frontend/             # Frontend application
│   ├── public/           # Static files
│   ├── src/              # Source files
│   │   ├── assets/       # Images, fonts, etc.
│   │   ├── components/   # Vue components
│   │   ├── router/       # Vue Router configuration
│   │   ├── stores/       # Pinia stores
│   │   ├── views/        # Page components
│   │   ├── App.vue       # Root Vue component
│   │   └── main.js       # Application entry point
│   ├── .env              # Frontend environment variables
│   ├── .env.sample       # Frontend environment variables sample
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
└── README.md             # Project README
```

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

## Environment Variables

### Backend (`.env`)
- `PORT` - Port number for the backend server (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

### Frontend (`.env`)
- `VITE_API_BASE_URL` - Base URL for API requests (e.g., http://localhost:5000/api)
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key for maps integration

## Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Hemanth M: [@ihemanthm](https://www.github.com/ihemanthm) - 083hemanth@gmail.com

Project Link: [https://github.com/ihemanthm/Evoltsoft](https://github.com/ihemanthm/Evoltsoft)
