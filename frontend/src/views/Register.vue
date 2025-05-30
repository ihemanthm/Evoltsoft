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
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-400">
          Already have an account?
          {{ ' ' }}
          <router-link to="/login" class="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            Sign in
          </router-link>
        </p>
      </div>

      <div class="mt-8 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div class="px-8 py-8 sm:p-10">
          <form class="space-y-6" @submit.prevent="handleRegister">
            <div class="space-y-4">
              <!-- Name Input -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-user text-gray-500"></i>
                  </div>
                  <input
                    id="name"
                    v-model="form.name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    required
                    class="bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </div>


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
                <label for="password" class="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-lock text-gray-500"></i>
                  </div>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="form.password"
                    name="password"
                    autocomplete="new-password"
                    required
                    class="bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition duration-200"
                    placeholder="••••••••"
                    @input="validatePassword"
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    @click="togglePasswordVisibility"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400 hover:text-gray-300"></i>
                  </button>
                </div>
                <div v-if="passwordErrors.length > 0" class="mt-2 text-sm text-red-400">
                  <ul class="list-disc pl-5 space-y-1">
                    <li v-for="(error, index) in passwordErrors" :key="index">
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Confirm Password Input -->
              <div>
                <label for="confirm-password" class="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-lock text-gray-500"></i>
                  </div>
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="confirm-password"
                    v-model="form.confirmPassword"
                    name="confirm-password"
                    autocomplete="new-password"
                    required
                    class="bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    @click="toggleConfirmPasswordVisibility"
                  >
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400 hover:text-gray-300"></i>
                  </button>
                </div>
                <p v-if="!passwordsMatch" class="mt-1 text-sm text-red-400">
                  Passwords do not match
                </p>
              </div>
            </div>


            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="isLoading || !isFormValid"
                :class="{
                  'opacity-70 cursor-not-allowed': isLoading || !isFormValid,
                  'hover:bg-blue-600': !isLoading && isFormValid,
                }"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                <span v-if="!isLoading">Create Account</span>
                <span v-else>
                  <i class="fas fa-circle-notch fa-spin mr-2"></i> Creating account...
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '@/utils/api';

export default {
  name: 'Register',
  setup() {
    const router = useRouter();
    const toast = useToast();
    
    const form = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    const isLoading = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const passwordErrors = ref([]);
    
    const passwordsMatch = computed(() => {
      return form.value.password === form.value.confirmPassword;
    });
    
    const isFormValid = computed(() => {
      return (
        form.value.name &&
        form.value.email &&
        form.value.password &&
        form.value.confirmPassword &&
        passwordsMatch.value &&
        passwordErrors.value.length === 0
      );
    });
    
    const validatePassword = () => {
      const errors = [];
      const password = form.value.password;
      
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
      
      passwordErrors.value = errors;
    };
    
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    
    const toggleConfirmPasswordVisibility = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };
    
    const handleRegister = async () => {
      if (!isFormValid.value) return;
      
      isLoading.value = true;
      
      try {
        const response = await api.post('/auth/register', {
          name: form.value.name,
          email: form.value.email,
          password: form.value.password
        });
        
        toast.success('Registration successful! Please login to continue.');
        router.push('/login');
      } catch (error) {
        // Error handling is done by the interceptor
        console.error('Registration error:', error);
      } finally {
        isLoading.value = false;
      }
    };
    
    return {
      form,
      isLoading,
      showPassword,
      showConfirmPassword,
      passwordErrors,
      passwordsMatch,
      isFormValid,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      validatePassword,
      handleRegister
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
