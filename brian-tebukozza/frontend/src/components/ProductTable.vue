<template>
  <div class="product-table-container">
    <h3>Product List</h3>
    <div v-if="products.length > 0">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (UGX)</th>
            <th>Quantity</th>
            <th>Color</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>#{{ product.id.toString().slice(-6) }}</td> <td>{{ product.productName }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price ? product.price.toLocaleString() : '-' }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.color || '-' }}</td>
            <td>
              <img v-if="product.imagePreview" :src="product.imagePreview" alt="Product Image" style="max-height: 50px;">
              <span v-else>No Image</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No products added yet.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ProductTable',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.product-table-container {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 15px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

img {
  max-height: 50px;
  width: auto;
  display: block;
}
</style>