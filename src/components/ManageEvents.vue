<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Button from './base/Button.vue'; 
import { useEventStore } from '@/stores/events';
import { useRouter } from 'vue-router';
import EditEventForm from './EditEventForm.vue';
import DeleteConfirmationForm from './DeleteConfirmationForm.vue';
import PaginationBase from '@/components/base/PaginationBase.vue';


const router = useRouter();
// const events = ref([]); 

const eventStore = useEventStore();
const currentPage = ref(0);
const pageSize = ref(10);
const events = computed(() => eventStore.events);
const totalPages = computed(() => eventStore.totalPages);

onMounted(async () => {
  await eventStore.setEvents(currentPage.value, pageSize.value); 
});

const handlePageChanged = async (newPage) => {
  currentPage.value = newPage;
  await eventStore.setEvents(currentPage.value, pageSize.value);
}

const deleteEvent = (id) => {
  router.push({ name: 'deleteconfirmationform', params: { id } });
};


const editEvent = (id) => {
  router.push({ name: 'editeventform' });
};


const addNewEvent = () => {
  router.push({ name: 'addeventform' }); 
};

const logout = () => {
  router.push({ name: '/home'});
}
</script>

<template>
  <div class="bg-purple-800 text-purple-50 rounded-lg max-w-[1290px] mx-auto my-12 xl:my-32 xl:px-0 px-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-rubik text-pink">MANAGE EVENTS</h1>
      <Button label="Add New Event" @click="addNewEvent" /> 
    </div>
    <div class="overflow-x-auto bg-purple-600 rounded-lg border border-purple-800 ">
      <table class="min-w-full text-left border-collapse">
        <thead class="bg-purple-400">
          <tr>
            <th class="px-6 py-4 text-pink border-purple-700">Title</th>
            <th class="px-6 py-4 text-pink border-purple-700">Date</th>
            <th class="px-6 py-4 text-pink border-purple-700">Time</th>
            <th class="px-6 py-4 text-pink border-purple-700">Spots Left</th>
            <th class="px-6 py-4 text-pink border-purple-700">Featured</th>
            <th class="px-6 py-4 text-pink border-purple-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id" class="hover:bg-purple-100">
            <td class="px-6 py-4 border-b border-purple-700">{{ event.title }}</td>
            <td class="px-6 py-4 border-b border-purple-700">{{ event.date }}</td>
            <td class="px-6 py-4 border-b border-purple-700">{{ event.time }}</td>
            <td class="px-6 py-4 border-b border-purple-700">{{ event.maxparticipants }}</td>
            <td class="px-6 py-4 border-b border-purple-700">{{ event.isFeatured ? 'Yes' : 'No' }}</td>
            <td class="px-6 py-4 flex space-x-2 border-b border-purple-700">
              <button @click="editEvent(event.id)" class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
                ✏️
              </button>
              <button @click="deleteEvent(event.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationBase class="mt-10"
      :current-page="currentPage"
      :total-pages="totalPages"
      @pageChanged="handlePageChanged"
      />
  </div>
</template>
