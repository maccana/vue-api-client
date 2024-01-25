// MyComponent.vue
<template>
  <div>
    <button @click="fetchData">Fetch Data</button>

    <div v-if="apiStore.data">
      {{ apiStore.data.title }}
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useApiStore } from '@/stores/ApiStore'; // Update the import

export default {
  setup() {
    const apiStore = useApiStore(); // Update the store instance

    const fetchData = () => {
      apiStore.fetchData();
    };

    return {
      apiStore,
      fetchData,
    };
  },
};
</script>

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
