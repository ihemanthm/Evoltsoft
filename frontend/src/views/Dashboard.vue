<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to EV Charging Network</h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">Find and book charging stations near you with ease</p>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <router-link 
          to="/chargers" 
          class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center"
        >
          <div class="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
            <i class="fas fa-bolt text-2xl text-blue-400"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Find Chargers</h3>
          <p class="text-gray-300 text-center">Browse and book available charging stations</p>
        </router-link>

        <router-link 
          to="/map" 
          class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center"
        >
          <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <i class="fas fa-map-marked-alt text-2xl text-green-400"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">View Map</h3>
          <p class="text-gray-300 text-center">See charging stations on an interactive map</p>
        </router-link>

        <router-link 
          to="/profile" 
          class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center"
        >
          <div class="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
            <i class="fas fa-user-circle text-2xl text-purple-400"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">My Profile</h3>
          <p class="text-gray-300 text-center">View and manage your account details</p>
        </router-link>
      </div>

      <!-- Stats Section -->
      <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-12">
        <h2 class="text-2xl font-bold mb-6">Charging Network Stats</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-blue-500/20 to-blue-700/30 p-6 rounded-xl">
            <div class="text-3xl font-bold">24/7</div>
            <div class="text-gray-300">Availability</div>
          </div>
          <div class="bg-gradient-to-br from-green-500/20 to-green-700/30 p-6 rounded-xl">
            <div class="text-3xl font-bold">50+</div>
            <div class="text-gray-300">Stations</div>
          </div>
          <div class="bg-gradient-to-br from-purple-500/20 to-purple-700/30 p-6 rounded-xl">
            <div class="text-3xl font-bold">100%</div>
            <div class="text-gray-300">Renewable Energy</div>
          </div>
          <div class="bg-gradient-to-br from-amber-500/20 to-amber-700/30 p-6 rounded-xl">
            <div class="text-3xl font-bold">4.8/5</div>
            <div class="text-gray-300">User Rating</div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center py-12">
        <h2 class="text-3xl font-bold mb-4">Ready to charge your EV?</h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of EV owners who trust our network for fast and reliable charging.
        </p>
        <router-link 
          to="/register" 
          class="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Get Started Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {}
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
