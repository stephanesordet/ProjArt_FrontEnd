<script setup>
import detailsMatieres from './components/detailsMatieres.vue';
import BaseBoutonRetour from './components/BaseBoutonRetour.vue';
import Breadcrums from './components/Breadcrums.vue';
</script>

<template>
    <breadcrums></breadcrums>
    <base-bouton-retour></base-bouton-retour>
    <details-matieres></details-matieres>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>