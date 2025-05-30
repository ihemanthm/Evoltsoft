<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center
            <span class="text-xl font-semibold text-gray-900">EVCharge</span>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h1 class="text-2xl font-semibold text-gray-900 mb-4">Welcome, {{ user?.name || 'User' }}!</h1>
            <p class="text-gray-600">You have successfully logged in to your EVCharge account.</p>
            
            <div class="mt-6 border-t border-gray-200 pt-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Your Account Information</h2>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p class="text-sm font-medium text-gray-500">Email</p>
                  <p class="mt-1 text-sm text-gray-900">{{ user?.email || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Account Type</p>
                  <p class="mt-1 text-sm text-gray-900">{{ user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Standard' }}</p>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <a href="#" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <i class="fas fa-bolt text-blue-600"></i>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">Find Chargers</p>
                      <p class="text-sm text-gray-500">Locate available charging stations</p>
                    </div>
                  </div>
                </a>
                <a href="#" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <i class="fas fa-history text-green-600"></i>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">Charging History</p>
                      <p class="text-sm text-gray-500">View your past charging sessions</p>
                    </div>
                  </div>
                </a>
                <a href="#" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <i class="fas fa-cog text-purple-600"></i>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">Account Settings</p>
                      <p class="text-sm text-gray-500">Update your profile and preferences</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { getCurrentUser, logout } from '@/utils/auth';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const toast = useToast();
    const user = ref(null);

    onMounted(() => {
      // Get user data when component mounts
      user.value = getCurrentUser();
      
      // Redirect to login if not authenticated
      if (!user.value) {
        router.push('/login');
      }
    });

    const handleLogout = () => {
      logout(router);
      toast.success('You have been successfully logged out.');
    };

    return {
      user,
      handleLogout
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
