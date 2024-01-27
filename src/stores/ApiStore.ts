// ApiStore.js
import { defineStore } from 'pinia';

export const useApiStore = defineStore('apiStore', {
    state: () => ({
        users: null,
        data: [],
    }),
    actions: {
        async fetchData() {
            try {
                const response = await fetch('http://localhost:3000/genie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data = await response.json();
                console.log('data: ', data)
                this.data = data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

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

        async removeUser(userId) {
            console.log('uid ', userId)
            // Use array filter to remove the user with the specified userId
            this.users = await this.users.filter(user => user.id !== userId);
        },

        async filterClasses(classType) {
            console.log('Store filter: ', this.data);
            // if no filter type is present return all data
            if (classType === '') {
                return this.data
            }
            // Deep copy the original data array
            const originalDataCopy = JSON.parse(JSON.stringify(this.data));

            // Filter the copied array
            const filteredArray = originalDataCopy.filter((cls) => cls.classType === classType);

            // Return the filtered data
            return filteredArray;
        },
    },
});
