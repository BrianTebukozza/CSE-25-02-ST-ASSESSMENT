<template>
  <div class="add-product-container">
    <div class="dashboard-container">
      
    </div>
    <div class="form-table-container">
      <AddProductForm @product-added="addProduct" />
      <ProductTable :products="productList" />
    </div>
  </div>
</template>

<script setup>
import AddProductForm from '../components/AddProductForm.vue';
import ProductTable from '../components/ProductTable.vue';
import Dashboard from '../components/Dashboard.vue';
import { ref } from 'vue';

const productList = ref([]);

// 1. FILL IN YOUR BACKEND URL HERE
const backendUrl = 'mongodb+srv://brian:Ritazam6$@cluster0.2xalywo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const addProduct = async (newProduct) => {
  productList.value.push(newProduct);
  console.log('New Product Added (locally):', newProduct);

  try {
    // 2. INSPECT THE REQUEST BEING SENT
    console.log('Sending request to:', backendUrl);
    console.log('Request body:', JSON.stringify(newProduct, null, 2)); // Pretty print the JSON

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 3. ADD ANY NECESSARY AUTHENTICATION HEADERS HERE (e.g., Authorization: 'Bearer YOUR_TOKEN')
      },
      body: JSON.stringify(newProduct),
    });

    // 4. LOG THE RAW RESPONSE FOR INSPECTION
    console.log('Raw Response:', response);

    if (!response.ok) {
      // 5. LOG THE ERROR RESPONSE BODY
      const errorData = await response.json();
      console.error('Failed to add product to backend:', errorData);
      productList.value = productList.value.filter(product => product !== newProduct);
      // Consider showing an error message to the user
      return;
    }

    const savedProduct = await response.json();
    console.log('Product added to backend successfully:', savedProduct);
    const index = productList.value.findIndex(product => product === newProduct);
    if (index !== -1) {
      productList.value[index] = savedProduct;
    }

  } catch (error) {
    // 6. LOG ANY NETWORK ERRORS
    console.error('Error sending product data to backend:', error);
    // Consider showing an error message to the user
  }
};
</script>

<style scoped>
.add-product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.dashboard-container {
  margin-bottom: 20px;
}

.form-table-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
</style>