// ApiStore.js
import { defineStore } from 'pinia';

export const useGlogalStore = defineStore('globalStore', {
    state: () => ({
        users: null,
        loginTimestamp: '',
    }),

    actions: {

    },
    getters: {}
});
