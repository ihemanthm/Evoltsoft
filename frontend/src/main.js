import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css'; // Updated to use main.css which contains Tailwind directives

// Import toast notification styles
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
const pinia = createPinia();

// Configure toast options
const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
};

app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);

// Initialize auth store
import { useAuthStore } from './stores/auth';
const authStore = useAuthStore();
authStore.initialize();

app.mount('#app');
