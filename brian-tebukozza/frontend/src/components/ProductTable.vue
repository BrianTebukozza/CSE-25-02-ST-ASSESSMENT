<template>
  <div class="product-table-container">


    <div v-if="loading" class="message">Loading produce inventory...</div>
    <div v-if="error" class="error message">{{ error }}</div>

    <div v-if="!loading && !error" class="table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>CATEGORY</th>
            <th>PRICE (UGX)</th>
            <th>QUANTITY</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="productItems.length === 0 && !loading && !error">
            <td colspan="10" class="no-data">No product registered yet.</td>
          </tr>
          <tr v-for="item in productItems" :key="item._id">
            <td>{{ item.Name }}</td>
            <td>{{ item.Category }}</td>
            <td>{{ item.Price }}</td>
            <td>{{ item.Quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && !error && produceItems.length === 0" class="message no-data-message">
        No product registered yet.
     </div>

     <Modal v-model="isModalVisible" @close="closeModal">
        <AddProduce
             v-if="!fetchingItemForEdit && !fetchingItemError"
            :item="itemToEdit"              @produce-saved="handleProduceSaved" @cancel="closeModal"           />

        <div v-else-if="fetchingItemForEdit">Loading item data...</div>

        <div v-else-if="fetchingItemError" class="error-message">
             Error loading item: {{ fetchingItemError }}
        </div>
         </Modal>

  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue';
import axios from 'axios';
import AddProductForm from './AddProductForm.vue'; 

const productItems = ref([]);
const loading = ref(false);
const error = ref('');
const isModalVisible = ref(false);
const itemToEdit = ref(null); 
const fetchingItemForEdit = ref(false); 
const fetchingItemError = ref(null);


const fetchProduct = async () => {
  loading.value = true;
  error.value = '';
  productItems.value = [];

  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL + "/api/product" : '/api/product';

    const response = await axios.get(apiUrl);

    if (response.data && Array.isArray(response.data)) {
      produceItems.value = response.data;

    } else {
       console.warn("API response for product list is not an array:", response.data);
       error.value = "Could not load product list (invalid data format).";
       produceItems.value = [];
    }

  } catch (err) {
    console.error("Error fetching product list:", err);
    error.value = "Failed to load product list. Please check your connection and try again later.";
    produceItems.value = [];
  } finally {
    loading.value = false;
  }
};



const closeModal = () => {
    isModalVisible.value = false;
    itemToEdit.value = null;
    fetchingItemError.value = null;
};


onMounted(() => {
  fetchProduce();
});

defineExpose({
  fetchProduce
});

</script>

<style scoped>
.produce-table-container {
  max-width: 95%;
  margin: 40px auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  overflow-x: auto;
}

.produce-table-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.message {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
}

.error.message {
  color: #D8000C;
  background-color: #FFD2D2;
  border: 1px solid #D8000C;
}

.table-wrapper {
    overflow-x: auto;
}

.produce-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.produce-table th,
.produce-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  white-space: nowrap;
  vertical-align: top;
}

.produce-table th {
  background-color: #e0e0e0;
  font-weight: bold;
  color: #555;
}

.produce-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.produce-table tbody tr:hover {
  background-color: #f1f1f1;
}

.no-data {
    text-align: center;
    font-style: italic;
    color: #777;
}

.action-button {
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s ease;
}

.edit-button {
    background-color: #196905;
    color: white;
}

.edit-button:hover {
    background-color: #0056b3;
}

.delete-button {
    background-color: #dc3545;
    color: white;
}

.delete-button:hover {
    background-color: #c82333;
}

.action-button:last-child {
    margin-right: 0;
}

.no-data-message {
    text-align: center;
    margin-top: 20px;
    color: #777;
    font-style: italic;
}

.error-message {
    color: #D8000C;
    background-color: #FFD2D2;
    border: 1px solid #D8000C;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
}
</style>