<script setup>
import TheDetailsMatieres from "./components/TheDetailsMatieres.vue";
// import { useFetch } from '../composables/fetch.js';

// const { data: remarques } = useFetch(
//   ""
// );
// à mettre dans le composant détails matières
// v-for="remarque in remarques" :titre="remarque.titre" :description="remarque.description" :visibilite="remarque.visibilite" :user="remarque.fk_user" :date="remarque.date" :matiere="remarque.fk_matiere"
//
</script>

<template>
  <TheDetails-matieres></TheDetails-matieres>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
