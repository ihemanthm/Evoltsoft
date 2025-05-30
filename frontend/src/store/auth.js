import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const res = await axios.post('http://localhost:5000/api/users/login', { email, password })
        this.token = res.data.token
        localStorage.setItem('token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        await this.fetchUser()
      } catch (error) {
        throw error
      }
    },
    async register(name, email, password) {
      try {
        await axios.post('http://localhost:5000/api/users/register', { name, email, password })
      } catch (error) {
        throw error
      }
    },
    async fetchUser() {
      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = res.data
      } catch {
        this.logout()
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
  },
})
