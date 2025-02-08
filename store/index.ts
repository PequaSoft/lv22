import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 100,
  }),
  actions: {
    increment() {
      // `this` is the store instance
      this.counter++
    },
  },
})