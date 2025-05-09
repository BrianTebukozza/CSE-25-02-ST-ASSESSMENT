<template>
  <div class="dashboard">
    <div class="summary-grid">
      <div class="summary-item">
        <div class="amount">UGX 50,000,000</div>
        <div class="label">Sales</div>
      </div>
      <div class="summary-item">
        <div class="amount">UGX 15,000,000</div>
        <div class="label">Orders</div>
      </div>
      <div class="summary-item in-stock">
        <div class="amount">UGX 42,000,000</div>
        <div class="label">In stock</div>
      </div>
      <div class="summary-item out-of-stock">
        <div class="amount">5</div>
        <div class="label">Out of stock</div>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'Dashboard',

};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.summary-item {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.amount {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.label {
  color: #777;
  font-size: 0.9em;
}

.in-stock .amount {
  color: green;
}

.out-of-stock .amount {
  color: red;
}
</style>