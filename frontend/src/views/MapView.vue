<template>
  <div class="map-view">
    <div id="map" ref="mapElement"></div>
    <div v-if="selectedCharger" class="charger-details">
      <h3>{{ selectedCharger.name }}</h3>
      <p><strong>Status:</strong> {{ selectedCharger.status }}</p>
      <p><strong>Type:</strong> {{ selectedCharger.connectorType }}</p>
      <p><strong>Power:</strong> {{ selectedCharger.powerOutput }} kW</p>
      <p><strong>Location:</strong> 
        {{ selectedCharger.location?.latitude?.toFixed(4) }}, 
        {{ selectedCharger.location?.longitude?.toFixed(4) }}
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/axios'

export default {
  name: 'MapView',
  setup() {
    const route = useRoute()
    const map = ref(null)
    const mapElement = ref(null)
    const selectedCharger = ref(null)
    const markers = ref([])

    const loadGoogleMaps = () => {
      return new Promise((resolve) => {
        if (window.google?.maps) {
          resolve()
          return
        }
        
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
        script.async = true
        script.defer = true
        script.onload = resolve
        document.head.appendChild(script)
      })
    }

    const initMap = async () => {
      try {
        await loadGoogleMaps()
        
        map.value = new window.google.maps.Map(mapElement.value, {
          center: { lat: 12.9716, lng: 77.5946 },
          zoom: 12,
          mapTypeId: 'roadmap',
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true
        })

        await fetchChargers()
        checkUrlForCoordinates()
      } catch (error) {
        console.error('Error initializing map:', error)
      }
    }

    const checkUrlForCoordinates = () => {
      const lat = parseFloat(route.query.lat)
      const lng = parseFloat(route.query.lng)
      
      if (!isNaN(lat) && !isNaN(lng) && map.value) {
        const position = { lat, lng }
        map.value.setCenter(position)
        map.value.setZoom(14)
        map.value.setMapTypeId('hybrid')
      }
    }

    const fetchChargers = async () => {
      try {
        const response = await axios.get('/stations')
        addMarkers(response.data)
      } catch (error) {
        console.error('Error fetching chargers:', error)
      }
    }

    const addMarkers = (chargers) => {
      if (!map.value || !chargers?.length) return

      const bounds = new window.google.maps.LatLngBounds()
      const infoWindow = new window.google.maps.InfoWindow()

      // Clear existing markers
      markers.value.forEach(marker => marker.setMap(null))
      markers.value = []

      chargers.forEach(charger => {
        if (!charger.location?.latitude || !charger.location?.longitude) return

        const position = {
          lat: parseFloat(charger.location.latitude),
          lng: parseFloat(charger.location.longitude)
        }

        const marker = new window.google.maps.Marker({
          position,
          map: map.value,
          title: charger.name,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(32, 32)
          }
        })

        marker.addListener('click', () => {
          selectedCharger.value = charger
          infoWindow.setContent(`
            <div class="info-window">
              <h4>${charger.name}</h4>
              <p><strong>Status:</strong> ${charger.status}</p>
              <p><strong>Type:</strong> ${charger.connectorType}</p>
            </div>
          `)
          infoWindow.open(map.value, marker)
        })

        markers.value.push(marker)
        bounds.extend(position)
      })

      if (markers.value.length > 0) {
        map.value.fitBounds(bounds)
      }
    }

    // Watch for URL changes
    watch(() => route.query, () => {
      checkUrlForCoordinates()
    })

    onMounted(() => {
      initMap()
    })

    onUnmounted(() => {
      markers.value.forEach(marker => marker.setMap(null))
      markers.value = []
    })

    return {
      map,
      mapElement,
      selectedCharger,
      markers
    }
  }
}
</script>

<style scoped>
.map-view {
  width: 100%;
  height: calc(100vh - 64px);
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.charger-details {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 300px;
}

.charger-details h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.charger-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #333;
}

.info-window {
  padding: 10px;
  font-family: Arial, sans-serif;
  color: #333;
}

.info-window h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.info-window p {
  margin: 5px 0;
  font-size: 14px;
}

@media (max-width: 768px) {
  .charger-details {
    max-width: calc(100% - 40px);
  }
}
</style>