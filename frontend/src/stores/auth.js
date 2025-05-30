import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const isAuthenticated = computed(() => !!token.value);

  // Actions
  function login(accessToken, userData) {
    token.value = accessToken;
    user.value = userData;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  function initialize() {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    initialize
  };
});