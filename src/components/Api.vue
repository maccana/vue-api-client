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
    <!-- <div v-else>
      Loading...
    </div> -->
    <button class="api-btn" @click="fetchUsers">Fetch Users</button>
    <!-- <button class="api-btn" @click="fetchData">Fetch Data</button> -->
    <button class="api-btn" v-show="apiStore.data" @click="filterClasses('Classes')">Filter Classes</button>
    <button class="api-btn" v-show="apiStore.data" @click="filterClasses('PFU')">Filter PFU</button>
    <button class="api-btn" v-show="apiStore.data" @click="filterClasses('')">All Classes</button>
    
    <div> 
      <div style="margin: 20px 0px 20px; background: 50bf31;color: #fff">
        Login Timestamp: {{ loginTimestamp }}       
      </div>
      <p>{{ classTypeLabel }} ({{ filteredData.length }}) </p>
      <div v-if="dataLoading">Loading classes...</div>
      <div class="list-item-card" v-for="(c,i) in filteredData" :key="i">
        {{ c }}
        <a v-if="c.meetingURL" :href="c.meetingURL" target="_blank">Go to meeting</a>
        <p v-else>No meeting link</p>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { useApiStore } from '@/stores/ApiStore';
import { useGlobalStore } from '@/stores/GlobalStore';


export default {
  setup() {
    const apiStore = useApiStore();
    const globalStore = useGlobalStore();

    const filteredData = ref([]);
    const dataLoading = ref(true);
    const loginTimestamp = ref('');
    const classTypeLabel = ref('All Classes')

    const filterClasses = async (classType) => {
      // Update the filteredData variable with the filtered result
      // filteredData.value = await apiStore.filterClasses(classType);

      if(classType === 'PFU') {
        classTypeLabel.value = 'Individual Follow-Ups'
        filteredData.value = await apiStore.pfus
      } 
      else if(classType === 'Classes') {
        classTypeLabel.value = 'Private and Group Classes'
        filteredData.value = await apiStore.classes
      }
      else {
        classTypeLabel.value = 'All Classes'
        filteredData.value = await apiStore.data
      }
    };

    const filterPFU = () => {
        apiStore.filterPFU();
    };

    const fetchData = async () => {
      try {
        dataLoading.value = true;
        await apiStore.fetchData();
        // loginTimestamp.value = moment().format('MM/DD/YYYY HH:mm:ss');
        // console.log('loginTimestamp updated:', loginTimestamp.value);
      } catch (error) {
        // Handle error
        console.error('Error in fetchData:', error);
      }
    };

    const fetchUsers = () => {
      apiStore.fetchUsers();
    };

    const removeUser = (id) => {
        apiStore.removeUser(id)
    };

    // Fetch initial data on component mount
    onMounted(async () => {
      await globalStore.setLoginTimestamp()
      loginTimestamp.value = await globalStore.loginTimestamp
      
      console.log('timey ', loginTimestamp.value)
      await apiStore.fetchData();
      // Set filteredData after fetching the initial data
      filteredData.value = apiStore.data;
      dataLoading.value = false

      setInterval(async () => {
        apiStore.fetchData()
        console.log('update...')
        // loginTimestamp.value = moment().format('MM/DD/YYYY HH:mm:ss');
        await globalStore.setLoginTimestamp()
        loginTimestamp.value = await globalStore.loginTimestamp
      }, 30000)


    });
    
    // Watch for changes in loginTimestamp
    // Check if needed..
    // watch(loginTimestamp, (newValue) => {
    //   console.log('loginTimestamp updated:', newValue);
    //   // loginTimestamp.value = newValue
    // });

    return {
      loginTimestamp,
      apiStore,
      fetchData,
      fetchUsers,
      removeUser,
      filterClasses,
      filteredData,
      filterPFU,
      classTypeLabel,
      dataLoading
    };
  },
};
</script>

<style scoped>
.api-btn {
    margin-right:10px;
}
.list-item {
  list-style: none;
}
.list-item-card {
  margin: 20px 0px;
  border: 1px solid grey;
  padding: 10px;
  border-radius: 5px;
}
</style>
