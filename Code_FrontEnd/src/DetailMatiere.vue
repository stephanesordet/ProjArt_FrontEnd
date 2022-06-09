<script setup>
import { ref, computed, watchEffect } from "vue";
import TheDetailsMatieres from "./components/TheDetailsMatieres.vue";
import { currentCoursId } from "../composables/store.js";
import { useFetch } from "../composables/fetch.js";
import CardEvent from "./components/CardEvent.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";

// ---------------------- Fetch data for all events -----------------------------
const cours = ref([]);

watchEffect(() => {
  fetch("http://127.0.0.1:8000/api/cours/info/" + currentCoursId.value)
    .then((res) => res.json())
    .then((coursResults) => (cours.value = coursResults));
});
/* const { data: cours } = useFetch(
  "http://127.0.0.1:8000/api/cours/info/" + currentCoursId.value
); */

const allCours = computed(() => {
  const tabCours = [];
  if (!cours.value?.length) {
    return [];
  } else {
    cours.value.forEach((element) => {
      if (tabCours.length < 1) {
        tabCours.push(element);
      }
    });
  }
  return tabCours;
});
</script>

<template>
  <TheDetails-matieres
    v-for="cours in allCours"
    :matiere="cours.matiere_id"
    :prof="cours.FullName"
  >
  </TheDetails-matieres>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
