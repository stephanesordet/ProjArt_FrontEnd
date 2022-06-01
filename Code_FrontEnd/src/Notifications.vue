<script setup>
import TheCardWrapper from "./components/TheCardWrapper.vue";
import CardNotif from "./components/CardNotif.vue";
import TheReturnButton from "./components/TheReturnButton.vue";
import { useFetch } from "../composables/fetch";

/* const { data: notif } = useFetch(
  ""
); */

</script>


<template>

  <h1>notif</h1>
<the-return-button> </the-return-button>
  <!--   <the-card-notif v-for="notif in notifs" :key="notif.id" :user="notif.user" :object="notif.object" :message="notif.message" :envoiHeureDate="notif.envoiHeureDate"></the-card-notif>
 --> 
<the-card-wrapper>
      <card-notif :user="'AGE'" :object="'Soirée CultureG'" :envoiHeureDate="'13:05'" :message="'Venez nombreux !'">
      </card-notif>
    </the-card-wrapper>


</template>

<style scoped> 
</style>
