<script setup>
import { ref, computed, watchEffect } from "vue";
import TheDetailsEvent from "./components/TheDetailsEvent.vue";
import { BASE_URL, idDetailsEvent } from "../composables/store.js";
import TheReturnButton from "./components/TheReturnButton.vue";
import { changeFormatDateWithoutHoursMinutes } from "../composables/function.js";

// ---------------------- Fetch data for this event -----------------------------
const events = ref([]);
const userSession = ref(sessionStorage.getItem("user"));

watchEffect(() => {
  if (idDetailsEvent.value != null) {
    fetch(BASE_URL + "events/id/" + idDetailsEvent.value)
      .then((res) => res.json())
      .then((eventsResults) => (events.value = eventsResults))
      .then(() => { });
  }
});

const allEvents = computed(() => {
  const tabEvents = [];
  if (!events.value?.length) {
    return [];
  } else {
    events.value.forEach((element) => {
      if (tabEvents.length < 1) {
        tabEvents.push(element);
      }
    });
  }
  return tabEvents;
});
</script>

<template>
  <div v-if="userSession">
    <TheReturnButton></TheReturnButton>
    <!--- Vfor insert infos about this event --->

    <the-details-event v-for="events in allEvents" :Debut="changeFormatDateWithoutHoursMinutes(events.Debut)"
      :Fin="changeFormatDateWithoutHoursMinutes(events.Fin)" :Lieu="events.Lieu" :user_Email="events.user_Email"
      :Description="events.Description" :Titre="events.Titre">
    </the-details-event>
  </div>
  <div v-else>
    <h1>Vous devez être connecté</h1>
  </div>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

body {
  overflow-x: hidden;
}
</style>
