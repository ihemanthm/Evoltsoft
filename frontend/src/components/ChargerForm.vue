<template>
  <div class="charger-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Charger Name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          placeholder="Enter charger name"
        />
      </div>

      <div class="form-group">
        <label for="connectorType">Connector Type</label>
        <select id="connectorType" v-model="formData.connectorType" required>
          <option value="">Select connector type</option>
          <option value="Type1">Type 1 (J1772)</option>
          <option value="Type2">Type 2 (Mennekes)</option>
          <option value="CCS">CCS (Combo)</option>
          <option value="CHAdeMO">CHAdeMO</option>
          <option value="Tesla">Tesla</option>
        </select>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="formData.status" required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div class="form-group">
        <label>Location</label>
        <div class="location-fields">
          <div class="location-field">
            <input
              id="latitude"
              v-model.number="formData.location.latitude"
              type="number"
              step="0.000001"
              required
              placeholder="Latitude"
              class="location-input"
            />
          </div>
          <div class="location-field">
            <input
              id="longitude"
              v-model.number="formData.location.longitude"
              type="number"
              step="0.000001"
              required
              placeholder="Longitude"
              class="location-input"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="powerOutput">Power Output (kW)</label>
        <input
          id="powerOutput"
          v-model.number="formData.powerOutput"
          type="number"
          min="0"
          step="0.1"
          required
          placeholder="Enter power output"
        />
      </div>

      <div class="form-actions">
        <button type="button" class="btn-cancel" @click="$emit('cancel')" :disabled="loading">
          Cancel
        </button>
        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="loading">
            <i class="fas fa-spinner fa-spin"></i> Saving...
          </span>
          <span v-else>{{ isEditing ? 'Update' : 'Create' }} Charger</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'ChargerForm',
  props: {
    charger: {
      type: Object,
      default: () => ({
        name: '',
        connectorType: '',
        status: 'Active',
        location: {
          latitude: null,
          longitude: null
        },
        powerOutput: null
      })
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      name: '',
      connectorType: 'Type2',
      status: 'Active',
      location: {
        latitude: null,
        longitude: null
      },
      powerOutput: null
    });

    const isEditing = ref(!!props.charger._id);

    const initializeFormData = () => {
      if (props.charger) {
        formData.value = {
          name: props.charger.name || '',
          connectorType: props.charger.connectorType || 'Type2',
          status: props.charger.status || 'Active',
          location: {
            latitude: props.charger.location?.latitude || null,
            longitude: props.charger.location?.longitude || null
          },
          powerOutput: props.charger.powerOutput || null
        };
      } else {
        formData.value = {
          name: '',
          connectorType: 'Type2',
          status: 'Active',
          location: {
            latitude: null,
            longitude: null
          },
          powerOutput: null
        };
      }
    };

    watch(() => props.charger, () => {
      initializeFormData();
    }, { immediate: true });

    const handleSubmit = () => {
      // Ensure numeric values are properly typed
      const payload = {
        ...formData.value,
        powerOutput: Number(formData.value.powerOutput),
        location: {
          latitude: Number(formData.value.location.latitude),
          longitude: Number(formData.value.location.longitude)
        }
      };
      emit('submit', payload);
    };

    return {
      formData,
      isEditing,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.charger-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  color: white;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #e2e8f0;
}

input,
select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #4a5568;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

input::placeholder {
  color: #a0aec0;
}

.location-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.location-field {
  display: flex;
  flex-direction: column;
}

.location-input {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #2d3748;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-cancel {
  background-color: #4a5568;
  color: white;
  border: none;
}

.btn-cancel:hover:not(:disabled) {
  background-color: #2d3748;
}

.btn-cancel:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-submit {
  background-color: #4299e1;
  color: white;
  border: none;
}

.btn-submit:hover:not(:disabled) {
  background-color: #3182ce;
}

.btn-submit:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
  opacity: 0.7;
}

.fa-spin {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
