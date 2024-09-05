<!-- <script setup>
import { ref } from 'vue';
import Button from '@/components/base/Button.vue';
import SignInUpModal from '@/components/auth/SignInUpModal.vue';

const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};

</script>

<template>
    <header class="bg-purple-900 px-5">
      <div class="max-w-[1290px] flex justify-between items-center mx-auto py-5">
        <router-link to="/" class="">
            <img src="/src/assets/images/logo-events.svg" alt="upcoming events logo">
        </router-link>
        <Button
        v-if="!isAuthenticated"
        :label="'SIGN IN'"
        @click="openModal"
      />
      <Button
        v-else
        :label="'LOGOUT'"
        @click="logout"
      />
        <SignInUpModal v-if="isModalOpen" @close="closeModal" />
      </div>
    </header>
  </template>

<style scoped>


</style> -->

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/login'; 
import Button from '@/components/base/Button.vue';
import SignInUpModal from '@/components/auth/SignInUpModal.vue';

// Usar el store de autenticación
const authStore = useAuthStore();

const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};

// Verifica la autenticación al cargar el componente
authStore.checkAuth();

</script>

<template>
  <header class="bg-purple-900 px-5">
    <div class="max-w-[1290px] flex justify-between items-center mx-auto py-5">
      <router-link to="/" class="">
        <img src="/src/assets/images/logo-events.svg" alt="upcoming events logo">
      </router-link>
      <Button
        v-if="!authStore.isAuthenticated"
        :label="'SIGN IN'"
        @click="openModal"
      />
      <Button
        v-else
        :label="'LOGOUT'"
        @click="authStore.logout"
      />
      <SignInUpModal v-if="isModalOpen" @close="closeModal" />
    </div>
  </header>
</template>

<style scoped>

</style>
