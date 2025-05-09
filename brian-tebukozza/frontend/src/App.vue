<template>
  <div id="app">
    <HeaderSection />

    <div class="content-wrapper">
      <router-view />
    </div>

    <FooterSection />
  </div>
</template>

<script>
import AddProductForm from "./components/AddProductForm.vue";
import ProductTable from "./components/ProductTable.vue"; 
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    AddProductForm,
    ProductTable,
    Dashboard, 
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.content-wrapper {
  flex: 1;
  padding: 20px;
}
</style>