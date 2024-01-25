// MyComponent.vue
<template>
  <div>
    <div v-if="apiStore.users">
      <ul>
        <li v-for="user in apiStore.users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      Loading...
    </div>
    <button @click="fetchUsers">Fetch Users</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useApiStore } from '@/stores/ApiStore';

export default {
  setup() {
    const apiStore = useApiStore();

    const fetchUsers = () => {
      apiStore.fetchUsers();
    };

    return {
      apiStore,
      fetchUsers,
    };
  },
};
</script>
