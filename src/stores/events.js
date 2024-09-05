import { ref } from 'vue';
import { defineStore } from 'pinia';
import EventsRepository from '@/core/api/eventsRepository';
import EventsService from '@/core/api/eventsService';

export const useEventStore = defineStore('events', () => {
    const events = ref([]);
    const featuredEvents = ref([]);
    const isLoading = ref(false);
    const totalPages = ref(0);

    const eventsEndpoint = `${import.meta.env.VITE_API_ENDPOINT}/events`;

    const repo = new EventsRepository(eventsEndpoint);
    const service = new EventsService(repo);

    async function setEvents(page = 0, size = 6) {
        isLoading.value = true;
        try {
            const response = await service.getEvents(page, size);
            events.value = response.events;
            totalPages.value = response.totalPages;
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            isLoading.value = false;
        }
    }
    
    async function fetchFeaturedEvents() {
        isLoading.value = true;
        try {
            featuredEvents.value = await service.getFeaturedEvents();
        } catch (error) {
            console.error('Error fetching featured events:', error);
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchPastEvents(page = 0, size = 6) {
        isLoading.value = true;
        try {
            const response = await service.getEvents(page, size); 
            const now = new Date();
            pastEvents.value = response.events.filter(event => new Date(event.date) < now);
            totalPages.value = response.totalPages; 
        } catch (error) {
            console.error('Error fetching past events:', error);
        } finally {
            isLoading.value = false;
        }
    }

    return {events, featuredEvents, pastEvents, isLoading, totalPages, setEvents, fetchFeaturedEvents };
});
