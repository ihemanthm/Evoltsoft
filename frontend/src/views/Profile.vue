<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">My Profile</h1>
        <p class="text-xl text-gray-300">Manage your account settings and preferences</p>
      </div>

      <div class="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
        <!-- Profile Header -->
        <div class="px-6 py-8 sm:px-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div class="flex flex-col sm:flex-row items-center">
            <div class="relative mb-6 sm:mb-0 sm:mr-8">
              <div class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">
                {{ userInitials }}
              </div>
              <button class="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-transform">
                <i class="fas fa-camera"></i>
              </button>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="text-2xl font-bold">{{ user.name || 'No name provided' }}</h2>
              <p class="text-gray-300">{{ user.email || 'No email provided' }}</p>
              <div class="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                <span class="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                  <i class="fas fa-bolt mr-1"></i> Premium Member
                </span>
                <span class="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded-full">
                  <i class="fas fa-check-circle mr-1"></i> Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-10">
          <!-- Personal Information -->
          <div class="lg:col-span-2">
            <div class="bg-gray-800/50 rounded-xl p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold">Personal Information</h3>
                <button class="text-blue-400 hover:text-blue-300" @click="editProfile">
                  <i class="fas fa-edit"></i> Edit
                </button>
              </div>
              
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                    <div class="bg-gray-700/50 rounded-lg px-4 py-2">{{ user.name.split(" ")[0] || 'N/A' }}</div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                    <div class="bg-gray-700/50 rounded-lg px-4 py-2">{{ user.name.split(" ")[1] || 'N/A' }}</div>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <div class="bg-gray-700/50 rounded-lg px-4 py-2">{{ user.email || 'No email provided' }}</div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                  <div class="bg-gray-700/50 rounded-lg px-4 py-2">{{ user.phone || 'No phone number provided' }}</div>
                </div>
              </div>
            </div>

            <!-- Vehicle Information -->
            <div class="mt-6 bg-gray-800/50 rounded-xl p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold">My Vehicles</h3>
                <button class="text-blue-400 hover:text-blue-300">
                  <i class="fas fa-plus"></i> Add Vehicle
                </button>
              </div>
              
              <div class="space-y-4">
                <div v-for="(vehicle, index) in vehicles" :key="index" class="bg-gray-700/30 rounded-lg p-4 flex items-center">
                  <div class="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <i class="fas fa-car text-blue-400 text-xl"></i>
                  </div>
                  <div class="flex-grow">
                    <h4 class="font-medium">{{ vehicle.model }}</h4>
                    <p class="text-sm text-gray-400">{{ vehicle.plate }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-300">{{ vehicle.type }}</p>
                    <p class="text-xs text-gray-500">Added {{ vehicle.addedDate }}</p>
                  </div>
                </div>
                
                <div v-if="vehicles.length === 0" class="text-center py-6">
                  <i class="fas fa-car text-gray-500 text-3xl mb-2"></i>
                  <p class="text-gray-400">No vehicles added yet</p>
                  <button class="mt-2 text-blue-400 hover:text-blue-300 text-sm">
                    <i class="fas fa-plus mr-1"></i> Add your first vehicle
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Settings -->
          <div class="space-y-6">
            <!-- Membership Card -->
            <div class="bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-xl p-6">
              <div class="flex items-center mb-4">
                <div class="bg-white/20 p-2 rounded-lg mr-3">
                  <i class="fas fa-crown text-yellow-400"></i>
                </div>
                <h3 class="font-semibold">Premium Membership</h3>
              </div>
              <p class="text-sm text-gray-300 mb-4">Enjoy exclusive benefits with our premium membership</p>
              <button class="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Upgrade Now
              </button>
            </div>

            <!-- Quick Actions -->
            <div class="bg-gray-800/50 rounded-xl p-6">
              <h3 class="font-semibold mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <button class="w-full flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <i class="fas fa-history text-blue-400 w-6"></i>
                  <span class="ml-3">Charging History</span>
                  <i class="fas fa-chevron-right ml-auto text-gray-500"></i>
                </button>
                <button class="w-full flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <i class="fas fa-credit-card text-green-400 w-6"></i>
                  <span class="ml-3">Payment Methods</span>
                  <i class="fas fa-chevron-right ml-auto text-gray-500"></i>
                </button>
                <button class="w-full flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <i class="fas fa-bell text-amber-400 w-6"></i>
                  <span class="ml-3">Notification Settings</span>
                  <i class="fas fa-chevron-right ml-auto text-gray-500"></i>
                </button>
                <button class="w-full flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <i class="fas fa-shield-alt text-purple-400 w-6"></i>
                  <span class="ml-3">Privacy Settings</span>
                  <i class="fas fa-chevron-right ml-auto text-gray-500"></i>
                </button>
              </div>
            </div>

            <!-- Sign Out Button -->
            <button 
              class="w-full flex items-center justify-center p-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors mt-8"
              @click="handleLogout"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'Profile',
  setup() {
    const router = useRouter();
    const toast = useToast();
    const authStore = useAuthStore();
    
    // Use user data from the auth store
    const user = computed(() => authStore.user || {});
    
    // Sample vehicle data (in a real app, this would come from an API)
    const vehicles = [
      {
        model: 'Tesla Model 3',
        plate: 'ABC 1234',
        type: 'Electric',
        addedDate: '2 months ago'
      },
      {
        model: 'Nissan Leaf',
        plate: 'XYZ 5678',
        type: 'Electric',
        addedDate: '1 year ago'
      }
    ];
    
    // Computed property for user initials
    const userInitials = computed(() => {
      if (!user.value.name) return 'GU';
      return user.value.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    });
    
    // Handle logout
    const handleLogout = async () => {
      try {
        authStore.logout();
        toast.success('Successfully logged out');
        await router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('Failed to log out. Please try again.');
      }
    };
    
    // Handle profile edit
    const editProfile = () => {
      // In a real app, you would open an edit modal or navigate to an edit page
      toast.info('Edit profile functionality coming soon!');
    };
    
    return {
      user,
      vehicles,
      userInitials,
      handleLogout,
      editProfile
    };
  }
};
</script>

<style scoped>
/* Custom scrollbar for the profile sections */
.scrollable {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

.scrollable::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

/* Smooth hover effects */
button, .hover-scale {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Gradient text for premium elements */
.gradient-text {
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>
