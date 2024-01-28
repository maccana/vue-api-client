// ApiStore.js
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        users: null,
        loginTimestamp: '',
    }),

    actions: {
        async setLoginTimestamp() {
            this.loginTimestamp = await moment().format('MM/DD/YYYY HH:mm:ss');
        }
    },
    getters: {
        timestamp() {
            return this.loginTimestamp
        },
    }
});
