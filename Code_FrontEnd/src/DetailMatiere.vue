<script setup>
import detailsMatieres from './components/detailsMatieres.vue';
import BaseBoutonRetour from './components/BaseBoutonRetour.vue';
import Breadcrums from './components/Breadcrums.vue';
import { useFetch } from '../composables/fetch.js';

const { data: remarques } = useFetch(
  ""
);

</script>

<template>
    <breadcrums></breadcrums>
    <base-bouton-retour></base-bouton-retour>
    <details-matieres
        v-for="remarque in remarques" :titre="remarque.titre" :description="remarque.description" :visibilite="remarque.visibilite" :user="remarque.fk_user" :date="remarque.date">
    </details-matieres>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>