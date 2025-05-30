<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <!-- Navigation -->
    <nav class="bg-black/80 backdrop-blur-md border-b border-gray-800 fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="flex items-center">
              <i class="fas fa-bolt text-blue-500 text-2xl mr-2"></i>
              <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">EVCharge</span>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-center space-x-4">
              <!-- Authenticated Navigation Items -->
              <template v-if="isAuthenticated">
                <router-link 
                  v-for="item in authNavItems" 
                  :key="item.name" 
                  :to="item.path"
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  :class="{ 'text-white bg-gray-800': $route.path === item.path }"
                >
                  <i :class="item.icon" class="mr-2"></i>
                  {{ item.name }}
                </router-link>
                <button 
                  @click="logout"
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  <i class="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </template>
              
              <!-- Unauthenticated Navigation Items -->
              <template v-else>
                <router-link 
                  v-for="item in guestNavItems" 
                  :key="item.name" 
                  :to="item.path"
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  :class="{ 'text-white bg-gray-800': $route.path === item.path }"
                >
                  <i :class="item.icon" class="mr-2"></i>
                  {{ item.name }}
                </router-link>
              </template>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <!-- Authenticated Mobile Navigation -->
          <template v-if="isAuthenticated">
            <router-link 
              v-for="item in authNavItems" 
              :key="item.name" 
              :to="item.path"
              @click="isMobileMenuOpen = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              :class="{ 'text-white bg-gray-800': $route.path === item.path }"
            >
              <i :class="item.icon" class="mr-2 w-5 inline-block"></i>
              {{ item.name }}
            </router-link>
            <button 
              @click="logout"
              class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <i class="fas fa-sign-out-alt mr-2 w-5 inline-block"></i>
              Logout
            </button>
          </template>
          
          <!-- Unauthenticated Mobile Navigation -->
          <template v-else>
            <router-link 
              v-for="item in guestNavItems" 
              :key="item.name" 
              :to="item.path"
              @click="isMobileMenuOpen = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              :class="{ 'text-white bg-gray-800': $route.path === item.path }"
            >
              <i :class="item.icon" class="mr-2 w-5 inline-block"></i>
              {{ item.name }}
            </router-link>
          </template>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16 min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-black/80 backdrop-blur-md border-t border-gray-800 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center mb-4 md:mb-0">
            <i class="fas fa-bolt text-blue-500 text-xl mr-2"></i>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">EVCharge</span>
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <p class="text-base text-gray-400 text-center md:text-left">
            &copy; 2025 EVCharge. All rights reserved.
          </p>
          <div class="mt-4 md:mt-0">
            <p class="text-base text-gray-400 text-center md:text-right">
              Made with <i class="fas fa-heart text-red-500"></i> for a greener future
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isMobileMenuOpen = ref(false);

    // Navigation items for authenticated users
    const authNavItems = [
      { name: 'Dashboard', path: '/dashboard', icon: 'fas fa-home' },
      { name: 'Chargers', path: '/chargers', icon: 'fas fa-bolt' },
      { name: 'Map', path: '/map', icon: 'fas fa-map-marked-alt' },
      { name: 'Profile', path: '/profile', icon: 'fas fa-user' },
    ];

    // Navigation items for guests
    const guestNavItems = [
      { name: 'Login', path: '/login', icon: 'fas fa-sign-in-alt' },
      { name: 'Register', path: '/register', icon: 'fas fa-user-plus' },
    ];

    // Logout function
    const logout = async () => {
      try {
        await authStore.logout();
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      isMobileMenuOpen,
      authNavItems,
      guestNavItems,
      isAuthenticated: computed(() => authStore.isAuthenticated),
      logout
    };
  },
  watch: {
    $route() {
      this.isMobileMenuOpen = false;
    }
  }
};
</script>

<style>
/* Fade transition for route changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom focus styles */
*:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  border-radius: 0.25rem;
}

/* Remove focus styles for mouse users */
*:focus:not(:focus-visible) {
  box-shadow: none;
}

/* Add focus styles for keyboard navigation */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  border-radius: 0.25rem;
}
</style>
