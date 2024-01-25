// ApiStore.js
import { defineStore } from 'pinia';

export const useApiStore = defineStore('apiStore', {
    state: () => ({
        data: null,
    }),
    actions: {
        async fetchData() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
                const data = await response.json();
                this.data = data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
});
