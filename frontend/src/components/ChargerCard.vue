<template>
  <div class="charger-card">
    <div class="charger-header">
      <div class="charger-info">
        <h4>{{ charger.name }}</h4>
        <span :class="['status-badge', charger.status]">
          {{ formatStatus(charger.status) }}
        </span>
      </div>
      <div class="charger-actions">
        <button class="btn-icon" @click="$emit('edit', charger)" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-icon btn-delete" @click="$emit('delete', charger)" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    
    <div class="charger-details">
      <div class="detail-row">
        <i class="fas fa-bolt"></i>
        <div>
          <span class="detail-label">Type</span>
          <span class="detail-value">{{ formatType(charger.connectorType) }}</span>
        </div>
      </div>
      
      <div class="detail-row">
        <i class="fas fa-tachometer-alt"></i>
        <div>
          <span class="detail-label">Power</span>
          <span class="detail-value">{{ charger.powerOutput }} kW</span>
        </div>
      </div>
      
      <div class="detail-row">
        <i class="fas fa-map-marker-alt"></i>
        <div>
          <span class="detail-label">Location</span>
          <span class="detail-value">
            {{ formatLocation(charger.location) }}
            <button 
              v-if="hasValidLocation"
              @click="viewOnMap"
              class="btn-view-map"
              title="View on Map"
            >
              <i class="fas fa-map-marked-alt"></i> View on Map
            </button>
          </span>
        </div>
      </div>
    </div>
    
    <div class="charger-footer">
      <span class="last-updated">
        <i class="far fa-clock"></i> 
        Updated {{ formatLastUpdated(charger.updatedAt) }}
      </span>
      <button 
        class="btn-book" 
        :disabled="charger.status !== 'Active'"
        @click="$emit('book', charger)"
      >
        {{ charger.status === 'Active' ? 'Book Now' : 'Not Available' }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "ChargerCard",
  props: {
    charger: {
      type: Object,
      required: true,
    },
  },
  emits: ['edit', 'delete', 'book'],
  setup(props) {
    const router = useRouter();

    const formatStatus = (status) => {
      const statusMap = {
        'Active': 'Available',
        'Inactive': 'Occupied',
        'Maintenance': 'Maintenance'
      };
      return statusMap[status] || status;
    };

    const formatType = (type) => {
      return type === 'fast' ? 'Fast Charger' : 'Standard Charger';
    };

    const formatLastUpdated = (dateString) => {
      if (!dateString) return 'recently';
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'just now';
      if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    };

    const hasValidLocation = computed(() => {
      const loc = props.charger.location;
      return loc && typeof loc === 'object' && loc.latitude && loc.longitude;
    });

    const formatLocation = (location) => {
      if (!location) return 'Location not available';
      if (typeof location === 'string') return location;
      if (location.latitude && location.longitude) {
        return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
      }
      return 'Invalid location data';
    };

    const viewOnMap = () => {
      const { latitude, longitude } = props.charger.location;
      router.push({
        path: '/map',
        query: { lat: latitude, lng: longitude }
      });
    };

    return {
      formatStatus,
      formatType,
      formatLastUpdated,
      formatLocation,
      viewOnMap,
      hasValidLocation
    };
  },
};
</script>

<style scoped>
.charger-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.charger-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.charger-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.charger-info {
  flex: 1;
}

h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #e2e8f0;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.available {
  background-color: rgba(72, 187, 120, 0.2);
  color: #48bb78;
}

.status-badge.occupied {
  background-color: rgba(245, 101, 101, 0.2);
  color: #f56565;
}

.status-badge.maintenance {
  background-color: rgba(246, 173, 85, 0.2);
  color: #f6ad55;
}

.charger-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
}

.btn-delete:hover {
  color: #f56565;
}

.charger-details {
  padding: 1.25rem 1.5rem;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-row i {
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  color: #718096;
  width: 20px;
  text-align: center;
}

.detail-label {
  display: block;
  font-size: 0.75rem;
  color: #a0aec0;
  margin-bottom: 0.25rem;
}

.detail-value {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #e2e8f0;
  font-weight: 500;
}

.charger-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.last-updated {
  font-size: 0.75rem;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-book {
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-book:hover:not(:disabled) {
  background-color: #3182ce;
}

.btn-book:disabled {
  background-color: #4a5568;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-view-map {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.3rem;
  padding: 0.2rem 0.6rem;
  background: rgba(66, 153, 225, 0.1);
  border: 1px solid rgba(66, 153, 225, 0.3);
  border-radius: 0.25rem;
  color: #63b3ed;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-view-map:hover {
  background: rgba(66, 153, 225, 0.2);
  border-color: rgba(66, 153, 225, 0.5);
}

.btn-view-map i {
  font-size: 0.8em;
}
</style>
