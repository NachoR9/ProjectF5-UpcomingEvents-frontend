<script setup>
import { ref, onMounted, computed } from 'vue';
import { useEventStore } from '@/stores/events';
import EventCard from '@/components/events/EventCard.vue'; 
import PaginationBase from '../base/PaginationBase.vue';

const currentPage = ref(0);
const pageSize = ref(6);
const eventStore = useEventStore();

onMounted(async () => {

  await eventStore.fetchPastEvents(currentPage.value, pageSize.value); 
});

const pastEvents = computed(() => eventStore.pastEvents);
const totalPages = computed(() => Math.ceil(pastEvents.value.length / pageSize.value));

const paginatedPastEvents = computed(() => {
  const start = currentPage.value * pageSize.value;
  const end = start + pageSize.value;
  return pastEvents.value.slice(start, end);
});

const handlePageChanged = (newPage) => {
  currentPage.value = newPage;
  eventStore.fetchPastEvents(newPage, pageSize.value);
};
</script>

<template>
  <div class="max-w-[1290px] mx-auto xl:px-0 px-6">
    <h2 class="text-pink text-5xl font-bold font-rubik uppercase leading-tight mb-10">Past Events</h2>
    
    <div v-if="paginatedPastEvents.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      <EventCard
        v-for="event in paginatedPastEvents"
        :key="event.id"
        :eventData="event"
      />
    </div>

    <PaginationBase class="mt-10"
      :current-page="currentPage"
      :total-pages="totalPages"
      @pageChanged="handlePageChanged"
      />
  </div>
</template>

<style scoped>

</style>
