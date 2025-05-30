<template>
  <div class="filter-panel">
    <h3 class="filter-title">Filters</h3>
    
    <div class="filter-group">
      <label class="filter-label">Connector Type</label>
      <div class="select-wrapper">
        <select v-model="filters.connectorType" @change="applyFilters" class="filter-select">
          <option value="">All Types</option>
          <option value="Type1">Type 1 (J1772)</option>
          <option value="Type2">Type 2 (Mennekes)</option>
          <option value="CCS">CCS (Combo)</option>
          <option value="CHAdeMO">CHAdeMO</option>
          <option value="Tesla">Tesla</option>
        </select>
        <i class="fas fa-chevron-down select-arrow"></i>
      </div>
    </div>

    <div class="filter-group">
      <label class="filter-label">Status</label>
      <div class="select-wrapper">
        <select v-model="filters.status" @change="applyFilters" class="filter-select">
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Maintenance">Maintenance</option>
        </select>
        <i class="fas fa-chevron-down select-arrow"></i>
      </div>
    </div>

    <button @click="resetFilters" class="btn-reset">
      <i class="fas fa-redo"></i> Reset Filters
    </button>
  </div>
</template>

<script>
export default {
  name: "FilterPanel",
  props: {
    onFilterChange: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      filters: {
        connectorType: "",
        status: "",
      },
    };
  },
  methods: {
    applyFilters() {
      this.$emit('update:filters', { ...this.filters });
      this.onFilterChange({ ...this.filters });
    },
    resetFilters() {
      this.filters = {
        connectorType: "",
        status: "",
      };
      this.applyFilters();
    },
  },
};
</script>

<style scoped>
.filter-panel {
  background: rgba(26, 32, 44, 0.7);
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 300px;
}

.filter-title {
  color: #e2e8f0;
  font-size: 1.25rem;
  margin: 0 0 1.25rem 0;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.filter-group {
  margin-bottom: 1.25rem;
}

.filter-label {
  display: block;
  color: #a0aec0;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  pointer-events: none;
  font-size: 0.75rem;
}

.filter-select {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid #4a5568;
  border-radius: 0.5rem;
  color: #e2e8f0;
  font-size: 0.95rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.filter-select option {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 0.5rem;
}

.btn-reset {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #4a5568;
  border-radius: 0.5rem;
  color: #a0aec0;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
}

.btn-reset:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  border-color: #718096;
}

.btn-reset i {
  font-size: 0.9em;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filter-panel {
    max-width: 100%;
  }
}
</style>