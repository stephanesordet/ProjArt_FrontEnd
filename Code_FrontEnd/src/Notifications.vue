<script setup>
import TheCardWrapper from "./components/TheCardWrapper.vue";
import CardNotif from "./components/CardNotif.vue";
import { useFetch } from "../composables/fetch";
//import TheReturnButton from "./components/TheReturnButton.vue";
import TheBreadCrums from "./components/TheBreadcrums.vue";

/* const { data: notif } = useFetch(
  ""
); */

</script>


<template>
  <!--   <the-card-notif v-for="notif in notifs" :key="notif.id" :user="notif.user" :object="notif.object" :message="notif.message" :envoiHeureDate="notif.envoiHeureDate"></the-card-notif>
 --> 
<the-card-wrapper>
      <card-notif :user="'AGE'" :object="'Soirée CultureG'" :envoiHeure="'13:05'" :message="'Venez nombreux !'">
      </card-notif>
    </the-card-wrapper>


</template>

<style scoped> 


</style>
