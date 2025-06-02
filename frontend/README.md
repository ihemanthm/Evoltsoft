# EV Charge Network - Frontend

A modern web application for managing and locating EV charging stations, built with Vue 3 and Vite.

## Project Structure

```
frontend/
├── public/                  # Static files
│   ├── favicon.ico
│   └── vite.svg
│
├── src/
│   ├── assets/              # Static assets (images, styles, etc.)
│   │   └── main.css
│   │
│   ├── components/          # Reusable Vue components
│   │   ├── AddEditChargerModal.vue
│   │   ├── ChargerCard.vue
│   │   ├── ChargerForm.vue
│   │   ├── FilterPanel.vue
│   │   └── HelloWorld.vue
│   │
│   ├── router/              # Vue Router configuration
│   │   └── index.js
│   │
│   ├── stores/              # Pinia stores for state management
│   │   └── *.js
│   │
│   ├── utils/               # Utility functions and helpers
│   │   └── *.js
│   │
│   ├── views/               # Page components
│   │   ├── ChargerList.vue
│   │   ├── Dashboard.vue
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── MapView.vue
│   │   ├── Profile.vue
│   │   └── Register.vue
│   │
│   ├── App.vue              # Main App component
│   └── main.js               # Application entry point
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js            # Vite configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+ (18+ recommended)
- npm 8+ or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Building for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Features

- User authentication (login/register)
- Interactive map view of charging stations
- Charger listing and filtering
- User profile management
- Responsive design

## Technologies Used

- Vue 3 (Composition API)
- Vite
- Pinia (State Management)
- Vue Router
- Tailwind CSS
- Font Awesome Icons
- Vue Toastification

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=your_api_base_url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
