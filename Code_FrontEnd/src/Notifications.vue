<script setup>
import CardNotif from "./components/CardNotif.vue";
import BaseBoutonRetour from "./components/TheReturnButton.vue";
import { useFetch } from "../composables/fetch";

/* const { data: notif } = useFetch(
  ""
); */

</script>


<template>

  <h1>notif</h1>

  <!--   <the-card-notif v-for="notif in notifs" :key="notif.id" :user="notif.user" :object="notif.object" :message="notif.message" :envoiHeureDate="notif.envoiHeureDate"></the-card-notif>
 -->
  <card-notif></card-notif>
</template>

<style scoped>
</style>
