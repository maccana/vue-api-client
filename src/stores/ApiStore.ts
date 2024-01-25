// ApiStore.js
import { defineStore } from 'pinia';

export const useApiStore = defineStore('apiStore', {
    state: () => ({
        users: null,
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                console.log('users ', data)
                this.users = data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
});
