<script setup>
import detailsMatieres from './components/TheDetailsMatieres.vue';
import BaseBoutonRetour from './components/TheReturnButton.vue';
import TheBreadcrums from './components/TheBreadcrums.vue';
// import { useFetch } from '../composables/fetch.js';

// const { data: remarques } = useFetch(
//   ""
// );
// à mettre dans le composant
// v-for="remarque in remarques" :titre="remarque.titre" :description="remarque.description" :visibilite="remarque.visibilite" :user="remarque.fk_user" :date="remarque.date" :matiere="remarque.fk_matiere"

</script>

<template>
    <the-breadcrums></the-breadcrums>
    <base-bouton-retour>
    </base-bouton-retour>
    <details-matieres></details-matieres>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>