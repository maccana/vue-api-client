// ApiStore.js
import { defineStore } from 'pinia';
import moment from 'moment';

export const useApiStore = defineStore('apiStore', {
    state: () => ({
        users: null,
        data: [],
    }),

    actions: {
        async fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/v1/classes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data = await response.json();
                data[0]['canEdit'] = true
                console.log('data returned in apiStore: ', data[0])
                this.data = data;
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error')
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

        // async editList() {
        //     // filter the data for classes within 12 hour edit window
        //     const msg = 'yo'
        //     return msg

        // },

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

    getters: {
        pfus() {
            return this.data.filter(cls => cls.classType === 'PFU')
        },
        classes() {
            return this.data.filter(cls => cls.classType === 'Classes')
        },
        // Getter to return records within the editable window
        editList() {
            return this.data.filter(cls => cls.canEdit === true)
        }
    }
});
