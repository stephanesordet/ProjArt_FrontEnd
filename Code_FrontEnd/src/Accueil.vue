<script setup>
import { def } from '@vue/shared'
import { ref, watchEffect } from 'vue'
import { useFetch } from '../composables/fetch'
import TheCard from './components/TheCard.vue'


const {data : horaires}  = useFetch('https://chabloz.eu/files/horaires/all.json')


const classes = ['IM48', 'IM49-1', 'IM49-2','IM50-1', 'IM50-2', 'IM50-3']
let selected = ref(null)

</script>

<template>

<div class="main">
  <the-nav/>
<div>
<div class="buttons is-mobile columns is-centered ml-1 mr-1">
  <button v-for="classe in classes" :key="classe" @click="selected = classe" class="column button is-primary is-medium is-one-fifth-mobile" >
{{classe}}
  </button>
</div>
</div>

  <div class="columns is-centered ">
  <div class="column is-three-quarters has-text-centered">
    <the-card 
    v-for="horaire in horaires" :key="horaire.start"
    v-show="horaire.class == selected"
    :classe="horaire.class"
    :heure="horaire.start"
    :cours="horaire.label"
    :salle="horaire.room">
    </the-card>
  </div>
  
</div>
</div>
</template>


<style scoped>


</style>
