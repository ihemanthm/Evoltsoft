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

## Contact

Hemanth M: [@ihemanthm](https://www.github.com/ihemanthm) - 083hemanth@gmail.com

Project Link: [https://github.com/ihemanthm/Evoltsoft](https://github.com/ihemanthm/Evoltsoft)