// MyComponent.vue
<template>
  <div>
    <div v-if="apiStore.users">
      <ul>
        <li v-for="user in apiStore.users" :key="user.id">
          {{ user.name }}
          <button @click="removeUser(user.id)">Remove</button>
        </li>
      </ul>
    </div>
    <div v-else>
      Loading...
    </div>
    <button class="api-btn" @click="fetchUsers">Fetch Users</button>
    <button class="api-btn" @click="fetchData">Fetch Data</button>
    <button class="api-btn" v-show="apiStore.data" @click="filterClasses('Classes')">Filter Classes</button>
    <button class="api-btn" v-show="apiStore.data" @click="filterClasses('PFU')">Filter PFU</button>
    <button class="api-btn" v-show="apiStore.data" @click="filterClasses('')">All</button>
    
    <div>
        <ul>
            <li v-for="(c,i) in filteredData" :key="i">
                {{ c.classType }}
            </li>
        </ul>
    </div>

  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useApiStore } from '@/stores/ApiStore';

export default {
  setup() {

    const filteredData = ref([]);
    const apiStore = useApiStore();

    const filterClasses = async (classType) => {
      // Update the filteredData variable with the filtered result
      filteredData.value = await apiStore.filterClasses(classType);
    };

    const filterPFU = () => {
        apiStore.filterPFU();
    };

    const fetchData = () => {
      apiStore.fetchData();
    };

    const fetchUsers = () => {
      apiStore.fetchUsers();
    };

    const removeUser = (id) => {
        apiStore.removeUser(id)
    };

    // Fetch initial data on component mount
    onMounted(async () => {
      await apiStore.fetchData();
      // await filterClasses(''); // Specify initial filter condition if needed
         // Set filteredData after fetching the initial data
         filteredData.value = apiStore.data;
    });

    return {
      apiStore,
      fetchData,
      fetchUsers,
      removeUser,
      filterClasses,
      filteredData,
      filterPFU,
    };
  },
};
</script>

<style scoped>
.api-btn {
    margin-right:10px;
}
</style>
