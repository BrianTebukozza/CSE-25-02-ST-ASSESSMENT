<template>
  <div class="add-product-container">
    <div class="dashboard-container">
      <Dashboard
        :sales="50000000"
        :orders="15000000"
        :inStock="42000000"
        :outOfStock="5"
      />
    </div>
    <div class="form-table-container">
      <AddProductForm @product-added="addProduct" />
      <ProductTable :products="productList" />
    </div>
  </div>
</template>

<script setup>
import AddProductForm from './components/AddProductForm.vue';
import ProductTable from './components/ProductTable.vue';
import Dashboard from './components/Dashboard.vue';
import { ref } from 'vue';

const productList = ref([ ]);

const addProduct = (newProduct) => {
  productList.value.push(newProduct);
  console.log('New Product Added:', newProduct);
};
</script>

<style scoped>
.add-product-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.dashboard-container {
  margin-bottom: 20px;
}

.form-table-container {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}
</style>