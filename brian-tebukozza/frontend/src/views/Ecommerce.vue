<template>
  <div class="product-management">
    <div class="dashboard-container">
      <Dashboard />
    </div>
    <div class="form-table-container">
      <AddProductForm @product-added="addProduct" />
      <ProductTable :products="productList" />
    </div>
  </div>
</template>

<script>
import AddProductForm from './AddProductForm.vue';
import ProductTable from './ProductTable.vue';
import Dashboard from './Dashboard.vue';
import { ref } from 'vue';

export default {
  components: {
    AddProductForm,
    ProductTable,
    Dashboard,
  },
  setup() {
    const productList = ref([]);

    const addProduct = (newProduct) => {
      productList.value.push(newProduct);
      console.log('New Product Added:', newProduct);
    };

    return {
      productList,
      addProduct,
    };
  },
};
</script>

<style scoped>
.product-management {
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