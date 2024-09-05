import DeleteConfirmationForm from "@/components/DeleteConfirmationForm.vue";
import EditEventForm from "@/components/EditEventForm.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddEventForm from "@/components/AddEventForm.vue";
import ManageEventsView from "@/views/ManageEventsView.vue";
import PastEventsList from "@/components/homepage/PastEventsList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/ManageEvents",
      name: "manageEvents",
      component: ManageEventsView,
    },

    {
      path: "/PastEvents", 
      name: "pastevents", 
      component: PastEventsList },

    {
      path: "/addeventform",
      name: "addeventform",
      component: AddEventForm,
    },
    
    {
      path: "/editeventform",
      name: "editeventform",
      component: EditEventForm,
    },
    {
      path: "/deleteconfirmationform",
      name: "deleteconfirmationform",
      component: DeleteConfirmationForm,
    },
  ],
});

export default router;
