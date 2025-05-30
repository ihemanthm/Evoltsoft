<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Charger' : 'Add Charger' }}</h2>
        <form @submit.prevent="submitForm" class="space-y-3">
          <input v-model="form.name" placeholder="Name" required class="input" />
          <input v-model="form.latitude" type="number" step="0.0001" placeholder="Latitude" required class="input" />
          <input v-model="form.longitude" type="number" step="0.0001" placeholder="Longitude" required class="input" />
          <input v-model="form.powerOutput" type="number" placeholder="Power Output (kW)" required class="input" />
          <select v-model="form.connectorType" required class="input">
            <option disabled value="">Select Connector Type</option>
            <option>Type1</option>
            <option>Type2</option>
            <option>CCS</option>
          </select>
          <select v-model="form.status" required class="input">
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <div class="flex justify-between mt-4">
            <button type="submit" class="btn-primary">{{ isEdit ? 'Update' : 'Add' }}</button>
            <button type="button" @click="$emit('close')" class="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['visible', 'charger'],
    emits: ['close', 'submit'],
    data() {
      return {
        form: {
          name: '',
          latitude: '',
          longitude: '',
          status: 'Active',
          powerOutput: '',
          connectorType: ''
        }
      };
    },
    computed: {
      isEdit() {
        return !!this.charger;
      }
    },
    watch: {
      charger: {
        handler(newVal) {
          if (newVal) this.form = { ...newVal };
        },
        immediate: true
      }
    },
    methods: {
      submitForm() {
        this.$emit('submit', { ...this.form });
      }
    }
  };
  </script>
  
  <style scoped>
  .input {
    @apply w-full border rounded px-3 py-2 bg-gray-50;
  }
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
  }
  .btn-secondary {
    @apply bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400;
  }
  </style>
  