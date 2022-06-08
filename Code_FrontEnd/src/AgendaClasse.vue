<script setup>
import { ref, computed, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import CardCours from "./components/CardCours.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";

const user = ref(null);
const session = ref(false);

const { data: cours } = useFetch(
  "http://127.0.0.1:8000/api/cours/user/" + sessionStorage.getItem("user")
)
window.addEventListener("load", () => {
  if (
    window.location.hash == "#agendaClasse" &&
    sessionStorage.getItem("user")
  ) {
    session.value = sessionStorage.getItem("user");
  } else {
    session.value = false;
  }
});

window.addEventListener("hashchange", () => {
  if (
    window.location.hash == "#agendaClasse" &&
    sessionStorage.getItem("user")
  ) {
    session.value = sessionStorage.getItem("user");
  } else {
    session.value = false;
  }
});

const userCours = computed(() => {
  const tabCours = [];
  if (!cours.value?.length) {
    return [];
  } else {
    cours.value.forEach((element) => {
      tabCours.push(element);
    });
  }
  return tabCours;
});
</script>

<template>
  <div v-if="session">
    <h1>Horaire de : <b>{{ session }}</b></h1>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <the-card-wrapper>
          <card-cours v-for="cours in userCours" :key="cours.id" :debut="cours.Debut" :fin="cours.Fin"
            :cours="cours.matiere_id" :salle="cours.salle_id">
          </card-cours>
        </the-card-wrapper>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Agenda classe</h1>
    <h2>Connectez-vous pour voir votre horaire</h2>
  </div>
</template>

<style scoped>
</style>
