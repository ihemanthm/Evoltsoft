<template>
  <div class="charger-list-container">
    <div class="header">
      <div class="header-content">
        <h1>Charging Stations</h1>
        <p class="subtitle">Manage and monitor your EV charging stations</p>
      </div>
      <button class="btn btn-primary" @click="openAddModal">
        <i class="fas fa-plus"></i> Add New Charger
      </button>
    </div>

    <div class="search-container">
      <div class="search-wrapper">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search by name, location or type..."
            @keyup.enter="handleSearch"
          >
        </div>
        <button class="btn btn-primary search-button" @click="handleSearch">
          <i class="fas fa-search"></i> Search
        </button>
      </div>
    </div>

    <div class="content-container">
      <div class="filters-container">
        <FilterPanel 
          :onFilterChange="handleFilterChange"
          @update:filters="updateActiveFilters"
          class="sticky-filter"
        />
      </div>
      
      <div class="main-content">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading chargers...</p>
        </div>
        
        <div v-else-if="filteredChargers.length === 0" class="empty-state">
          <div class="empty-illustration">
            <i class="fas fa-charging-station"></i>
          </div>
          <h3>No charging stations found</h3>
          <p v-if="hasActiveFilters">Try adjusting your search or filters</p>
          <p v-else>Get started by adding your first charging station</p>
          <button class="btn btn-primary" @click="openAddModal">
            <i class="fas fa-plus"></i> Add Your First Charger
          </button>
        </div>
        
        <div v-else class="chargers-grid">
          <ChargerCard 
            v-for="charger in filteredChargers" 
            :key="charger._id" 
            :charger="charger"
            @edit="openEditModal(charger)"
            @delete="openDeleteModal(charger)"
            @book="handleBook"
          />
        </div>
      </div>
    </div>
    
    <!-- Add/Edit Modal -->
    <div v-if="showFormModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit' : 'Add New' }} Charging Station</h2>
          <button class="btn-close" @click="closeModals">&times;</button>
        </div>
        <div class="modal-body">
          <ChargerForm
            :charger="currentCharger"
            :loading="formLoading"
            @submit="handleSubmit"
            @cancel="closeModals"
          />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content delete-modal">
        <div class="modal-header">
          <h3>Delete Charger</h3>
          <button class="btn-close" @click="closeModals">&times;</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete <strong>{{ currentCharger.name }}</strong>?</p>
          <p class="warning">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" @click="closeModals">Cancel</button>
          <button class="btn btn-danger" @click="confirmDelete" :disabled="formLoading">
            <span v-if="formLoading">
              <i class="fas fa-spinner fa-spin"></i> Deleting...
            </span>
            <span v-else>Delete Charger</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import ChargerCard from '@/components/ChargerCard.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import ChargerForm from '@/components/ChargerForm.vue';
import axios from '@/utils/axios';

export default {
  name: "ChargerList",
  components: {
    FilterPanel,
    ChargerCard,
    ChargerForm,
  },
  setup() {
    const toast = useToast();
    const chargers = ref([]);
    const loading = ref(true);
    const formLoading = ref(false);
    const activeFilters = ref({
      connectorType: "",
      status: "",
    });
    const searchQuery = ref('');
    const showFormModal = ref(false);
    const showDeleteModal = ref(false);
    const isEditing = ref(false);
    const currentCharger = ref({
      name: '',
      connectorType: 'Type2',
      status: 'Active',
      location: {
        latitude: null,
        longitude: null
      },
      powerOutput: null
    });

    const hasActiveFilters = computed(() => {
      return activeFilters.value.connectorType || 
             activeFilters.value.status || 
             searchQuery.value.trim() !== '';
    });

    const filteredChargers = computed(() => {
      if (!chargers.value) return [];
      
      return chargers.value.filter(charger => {
        // Apply connector type filter
        if (activeFilters.value.connectorType && 
            charger.connectorType !== activeFilters.value.connectorType) {
          return false;
        }
        
        // Apply status filter
        if (activeFilters.value.status && 
            charger.status !== activeFilters.value.status) {
          return false;
        }

        // Apply search query
        if (searchQuery.value) {
          const query = searchQuery.value.toLowerCase();
          const searchIn = [
            charger.name,
            charger.connectorType,
            charger.status,
            charger.location?.latitude?.toString(),
            charger.location?.longitude?.toString(),
          ].filter(Boolean).map(s => s.toLowerCase());
          
          return searchIn.some(text => text.includes(query));
        }

        return true;
      });
    });

    const fetchChargers = async () => {
      try {
        loading.value = true;
        const response = await axios.get('/stations');
        chargers.value = response.data || [];
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching chargers:', error);
        toast.error('Failed to load charging stations. Please try again later.');
        chargers.value = [];
      } finally {
        loading.value = false;
      }
    };

    const handleFilterChange = (newFilters) => {
      // This is handled by the updateActiveFilters method
    };
    
    const updateActiveFilters = (filters) => {
      activeFilters.value = { ...filters };
    };
    
    const handleSearch = () => {
      // Search is handled in the computed property
    };
    
    const handleBook = (charger) => {
      toast.info(`Booking charger: ${charger.name}`);
      // Implement booking logic here
    };

    const openAddModal = () => {
      currentCharger.value = {
        name: '',
        connectorType: 'Type2',
        status: 'Active',
        location: {
          latitude: null,
          longitude: null
        },
        powerOutput: null
      };
      isEditing.value = false;
      showFormModal.value = true;
    };

    const openEditModal = (charger) => {
      currentCharger.value = { 
        ...charger,
        // Ensure location is properly structured
        location: charger.location && typeof charger.location === 'object' 
          ? { ...charger.location }
          : { latitude: null, longitude: null }
      };
      isEditing.value = true;
      showFormModal.value = true;
    };

    const openDeleteModal = (charger) => {
      currentCharger.value = { ...charger };
      showDeleteModal.value = true;
    };

    const closeModals = () => {
      showFormModal.value = false;
      showDeleteModal.value = false;
      formLoading.value = false;
    };

    const handleSubmit = async (chargerData) => {
      try {
        formLoading.value = true;
        
        if (isEditing.value) {
          await axios.put(
            `/stations/${currentCharger.value._id}`,
            chargerData
          );
          toast.success("Charger updated successfully!");
        } else {
          await axios.post(
            "/stations",
            chargerData
          );
          toast.success("Charger added successfully!");
        }
        
        await fetchChargers();
        closeModals();
      } catch (error) {
        console.error("Error saving charger", error);
        const errorMessage = error.response?.data?.message || "Failed to save charger. Please try again.";
        toast.error(errorMessage);
      } finally {
        formLoading.value = false;
      }
    };

    const confirmDelete = async () => {
      try {
        formLoading.value = true;
        await axios.delete(`/stations/${currentCharger.value._id}`);
        toast.success("Charger deleted successfully!");
        await fetchChargers();
        closeModals();
      } catch (error) {
        console.error("Error deleting charger", error);
        const errorMessage = error.response?.data?.message || "Failed to delete charger. Please try again.";
        toast.error(errorMessage);
      } finally {
        formLoading.value = false;
      }
    };

    onMounted(() => {
      fetchChargers();
    });

    return {
      chargers,
      loading,
      formLoading,
      filteredChargers,
      showFormModal,
      showDeleteModal,
      isEditing,
      currentCharger,
      searchQuery,
      hasActiveFilters,
      handleFilterChange,
      updateActiveFilters,
      handleSearch,
      handleBook,
      openAddModal,
      openEditModal,
      openDeleteModal,
      closeModals,
      handleSubmit,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
.charger-list-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-content h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0 0 0.5rem 0;
}

.header-content .subtitle {
  color: #a0aec0;
  margin: 0;
  font-size: 1rem;
}

.search-container {
  width: 100%;
  padding: 0 1rem;
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
}

.search-wrapper {
  display: flex;
  max-width: 800px;
  width: 100%;
  gap: 0.75rem;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  padding: 0 1rem;
  height: 48px;
}

.search-box:focus-within {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.search-box i {
  color: #a0aec0;
  margin-right: 0.75rem;
  font-size: 1rem;
}

.search-box input {
  flex: 1;
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 0.95rem;
  height: 100%;
  outline: none;
}

.search-box input::placeholder {
  color: #718096;
}

.search-button {
  padding: 0 1.5rem;
  height: 48px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .search-wrapper {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .search-box {
    width: 100%;
  }
  
  .search-button {
    width: 100%;
    justify-content: center;
  }
}

.content-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-content {
  flex: 1;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.75rem;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  margin-top: 1rem;
}

.empty-illustration {
  font-size: 3rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #a0aec0;
  margin-bottom: 1.5rem;
  max-width: 500px;
}

.chargers-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  align-content: flex-start;
}

.loading-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: #a0aec0;
}

.loading-state .spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #4299e1;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #1a202c;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2, .modal-header h3 {
  margin: 0;
  color: #e2e8f0;
  font-size: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-close {
  background: none;
  border: none;
  color: #a0aec0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: color 0.2s;
}

.btn-close:hover {
  color: #e2e8f0;
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn i {
  font-size: 0.9em;
}

.btn-primary {
  background-color: #4299e1;
  color: white;
  border: none;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3182ce;
}

.btn-outline {
  background: transparent;
  border: 1px solid #4a5568;
  color: #e2e8f0;
}

.btn-outline:hover {
  border-color: #718096;
  background: rgba(255, 255, 255, 0.05);
}

.btn-danger {
  background-color: #e53e3e;
  color: white;
  border: none;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c53030;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.warning {
  color: #f56565;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .content-container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .sticky-filter {
    position: static;
    width: 100%;
    max-width: 100%;
  }

  .main-content {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .search-box {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box input {
    padding: 0.75rem 1rem;
  }

  .search-button {
    justify-content: center;
    padding: 0.75rem;
    width: 100%;
  }
}
</style>
