/* import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const token = ref('');
  const username = ref('');
  const userRole = ref('');
  const errorMessage = ref('');

  const loginEndpoint = `${import.meta.env.VITE_API_ENDPOINT}/login`;
  const registerEndpoint = `${import.meta.env.VITE_API_ENDPOINT}/register`;

  async function login(user, pass) {
    try {
      const response = await axios.get(loginEndpoint, {
        auth: {
          username: user,
          password: pass
        }
      });

      token.value = response.data.token || '';
      username.value = response.data.Username;
      userRole.value = response.data.role;
      isAuthenticated.value = true;
      errorMessage.value = '';

      localStorage.setItem('authToken', token.value);
    } catch (error) {
      isAuthenticated.value = false;
      errorMessage.value = 'Invalid username or password';
      console.error('Login error:', error);
    }
  }

  async function register(user, pass, email) {
    try {
      const response = await axios.post(registerEndpoint, { username: user, password: pass, email });

      token.value = response.data.token || '';
      username.value = response.data.Username;
      userRole.value = response.data.role;
      isAuthenticated.value = true;
      errorMessage.value = '';

      localStorage.setItem('authToken', token.value);
    } catch (error) {
      isAuthenticated.value = false;
      errorMessage.value = 'Registration failed';
      console.error('Registration error:', error);
    }
  }

  function logout() {
    isAuthenticated.value = false;
    token.value = '';
    username.value = '';
    userRole.value = '';

    localStorage.removeItem('authToken');
    router.push({ name: 'home'});
  }

  function checkAuth() {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      token.value = storedToken;
      isAuthenticated.value = true;
    }
  }

  return { isAuthenticated, token, username, userRole, errorMessage, login, register, logout, checkAuth };
});
 */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router/index.js'; 

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const token = ref('');
  const username = ref('');
  const userRole = ref('');
  const errorMessage = ref('');

  const loginEndpoint = `${import.meta.env.VITE_API_ENDPOINT}/login`;
  const registerEndpoint = `${import.meta.env.VITE_API_ENDPOINT}/register`;

  async function login(user, pass) {
    try {
      const response = await axios.get(loginEndpoint, {
        auth: {
          username: user,
          password: pass
        }
      });

      token.value = response.data.token || '';
      username.value = response.data.Username;
      userRole.value = response.data.role;
      isAuthenticated.value = true;
      errorMessage.value = '';

      localStorage.setItem('authToken', token.value);
    } catch (error) {
      isAuthenticated.value = false;
      errorMessage.value = 'Invalid username or password';
      console.error('Login error:', error);
    }
  }

  async function register(user, pass, email) {
    try {
      const response = await axios.post(registerEndpoint, { username: user, password: pass, email });

      token.value = response.data.token || '';
      username.value = response.data.Username;
      userRole.value = response.data.role;
      isAuthenticated.value = true;
      errorMessage.value = '';

      localStorage.setItem('authToken', token.value);
    } catch (error) {
      isAuthenticated.value = false;
      errorMessage.value = 'Registration failed';
      console.error('Registration error:', error);
    }
  }

  function logout() {
    isAuthenticated.value = false;
    token.value = '';
    username.value = '';
    userRole.value = '';

    localStorage.removeItem('authToken');

    // Redirigir a la página principal
    router.push({ name: 'home' });
  }

  function checkAuth() {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      token.value = storedToken;
      isAuthenticated.value = true;
    }
  }

  return { isAuthenticated, token, username, userRole, errorMessage, login, register, logout, checkAuth };
});