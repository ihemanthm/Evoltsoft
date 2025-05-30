<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <router-link to="/" class="flex justify-center">
          <div class="flex items-center">
            <i class="fas fa-bolt text-blue-500 text-4xl mr-2"></i>
            <span class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">EVCharge</span>
          </div>
        </router-link>
        <h2 class="mt-6 text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-400">
          Or
          {{ ' ' }}
          <router-link to="/register" class="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            create a new account
          </router-link>
        </p>
      </div>

      <div class="mt-8 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div class="px-8 py-8 sm:p-10">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div class="space-y-4">
              <!-- Email Input -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-1">
                  Email address
                </label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-envelope text-gray-500"></i>
                  </div>
                  <input
                    id="email"
                    v-model="form.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <!-- Password Input -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label for="password" class="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div class="text-sm">
                    <router-link to="/forgot-password" class="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                      Forgot your password?
                    </router-link>
                  </div>
                </div>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-lock text-gray-500"></i>
                  </div>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="form.password"
                    name="password"
                    autocomplete="current-password"
                    required
                    class="bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    @click="togglePasswordVisibility"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400 hover:text-gray-300"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="form.rememberMe"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded bg-gray-800/50"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="isLoading"
                :class="{
                  'opacity-70 cursor-not-allowed': isLoading,
                  'hover:bg-blue-600': !isLoading,
                }"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                <span v-if="!isLoading">Sign in</span>
                <span v-else>
                  <i class="fas fa-circle-notch fa-spin mr-2"></i> Signing in...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';
import api from '@/utils/api';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const toast = useToast();
    const authStore = useAuthStore();
    
    const form = ref({
      email: '',
      password: '',
      rememberMe: false
    });
    
    const isLoading = ref(false);
    const showPassword = ref(false);
    
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    
    const handleLogin = async () => {
      if (!form.value.email || !form.value.password) {
        toast.error('Please fill in all fields');
        return;
      }
      
      isLoading.value = true;
      
      try {
        const response = await api.post('/auth/login', {
          email: form.value.email,
          password: form.value.password
        });
        
        // Save token and user data using auth store
        const { token, user } = response.data;
        authStore.login(token, user);
        
        // Show success message
        toast.success('Login successful!');
        
        // Check for redirect query parameter or default to dashboard
        const redirectPath = router.currentRoute.value.query.redirect || '/dashboard';
        await router.push(redirectPath);
        
      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
        toast.error(errorMessage);
      } finally {
        isLoading.value = false;
      }
    };
    
    return {
      form,
      isLoading,
      showPassword,
      togglePasswordVisibility,
      handleLogin
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
