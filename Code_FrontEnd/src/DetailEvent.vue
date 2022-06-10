<script setup>
import TheDetailsEvent from './components/TheDetailsEvent.vue';
import BaseBoutonRetour from './components/TheReturnButton.vue';
import TheBreadcrums from './components/TheBreadcrums.vue';
import TheDetailsRemarques from './components/TheDetailsRemarques.vue';
import { BASE_URL } from '../composables/store.js';
// import { useFetch } from '../composables/fetch.js';

// const { data: remarques } = useFetch(
//   ""
// );
// à mettre dans le composant
// v-for="remarque in remarques" :titre="remarque.titre" :description="remarque.description" :visibilite="remarque.visibilite" :user="remarque.fk_user" :date="remarque.date" :matiere="remarque.fk_matiere"

function changeFormatDate() {
    let myDate = "2012-10-16 11:00:28";

    myDate = myDate.replace(' ', 'T');
    const z = 'Z';
    myDate = myDate.concat(z);
    // console.log(myDate);

    const time = new Date((myDate)).toLocaleTimeString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',

    })
    console.log(time)
}




changeFormatDate();



</script>

<template>
    <the-breadcrums></the-breadcrums>
    <the-details-event></the-details-event>
    <br>
    <the-details-remarques></the-details-remarques>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>