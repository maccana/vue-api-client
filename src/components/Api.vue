<script setup lang="ts">
    const apiFetch = async () => {
    // call a service to fetch some data here
    }

    apiFetch()

</script>

<template>
  <div class="api">
   
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.api h1,
.api h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .api h1,
  .api h3 {
    text-align: left;
  }
}
</style>
