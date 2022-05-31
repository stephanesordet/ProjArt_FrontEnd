<script setup>
import TheCardNotif from "./components/TheCardNotif.vue";
import BaseBoutonRetour from "./components/BaseBoutonRetour.vue";
import { useFetch } from "../composables/fetch";

/* const { data: notif } = useFetch(
  ""
); */

</script>


<template>

  <h1>notif</h1>
  <base-bouton-retour></base-bouton-retour>
<!--   <the-card-notif v-for="notif in notifs" :key="notif.id" :user="notif.user" :object="notif.object" :message="notif.message" :envoiHeureDate="notif.envoiHeureDate"></the-card-notif>
 --> 
<the-card-notif> </the-card-notif>  
</template>

<style scoped> 
</style>
