<template>
  <div class="add-product-container">
    <h3>Add Product</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="productName"></label>
        <input type="text" id="productName" v-model="product.productName" required>
      </div>
      <div class="form-group">
        <label for="category"></label>
        <input type="text" id="category" v-model="product.category" required>
      </div>
      <div class="form-group">
        <label for="price"></label>
        <input type="number" id="price" v-model="product.price" required>
      </div>
      <div class="form-group">
        <label for="quantity"></label>
        <input type="number" id="quantity" v-model="product.quantity" required>
      </div>
      <div class="form-group">
        <label for="color"></label>
        <input type="text" id="color" v-model="product.color">
      </div>
      <div class="form-group">
        <label for="image"></label>
        <input type="file" id="image" @change="handleFileChange" accept="image/*" required>
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Image Preview" style="max-width: 100px;">
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="save-button">SAVE</button>
        <button type="button" class="clear-button" @click="clearForm">CLEAR</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AddProductForm',
  emits: ['product-added'],
  setup(emit) {
    const product = ref({
      productName: '',
      category: '',
      price: null,
      quantity: null,
      color: '',
      image: null,
    });

    const imagePreview = ref(null); // Declare imagePreview as a separate ref

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      product.value.image = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result; // Update the separate imagePreview ref
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.value = null; // Update the separate imagePreview ref
      }
    };

    const handleSubmit = () => {
      const formData = new FormData();
      formData.append('productName', product.value.productName);
      formData.append('category', product.value.category);
      formData.append('price', product.value.price);
      formData.append('quantity', product.value.quantity);
      formData.append('color', product.value.color);
      if (product.value.image) {
        formData.append('image', product.value.image);
      }

      // Replace '/api/products' with your actual backend API endpoint
      fetch('/api/products', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Or response.text() if your backend returns plain text
      })
      .then(data => {
        console.log('Success:', data);
        emit('product-added', { ...product.value, id: data.id || Date.now(), imagePreview: imagePreview.value }); // Emit the separate imagePreview
        clearForm();
        // Optionally show a success message to the user
      })
      .catch(error => {
        console.error('Error sending data to backend:', error);
        // Optionally show an error message to the user
      });
    };

    const clearForm = () => {
      product.value = {
        productName: '',
        category: '',
        price: null,
        quantity: null,
        color: '',
        image: null,
      };
      imagePreview.value = null; // Reset the separate imagePreview ref
    };

    return {
      product,
      imagePreview, // Return the separate imagePreview ref
      handleFileChange,
      handleSubmit,
      clearForm,
    };
  },
};
</script>

<style scoped>
.add-product-container {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px; /* Adjust width as needed */
}

h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.image-preview {
  margin-top: 10px;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 4px;
  background-color: #fff;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.save-button,
.clear-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.save-button {
  background-color: #ec7c34;
  color: white;
}

.save-button:hover {
  background-color: #ec7c34;
}

.clear-button {
  background-color: #d0cece;
  color: white;
}

.clear-button:hover {
  background-color: #d0cece;
}
</style>