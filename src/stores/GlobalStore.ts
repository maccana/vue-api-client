// ApiStore.js
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        users: null,
        lastDataTimestamp: '',
    }),

    actions: {
        async setLoginTimestamp() {
            this.lastDataTimestamp = await moment().format('MM/DD/YYYY HH:mm:ss');
        }
    },
    getters: {
        lastFmDataTimestamp() {
            return this.lastDataTimestamp
        },
    }
});
