<script setup>
import { def } from "@vue/shared";
import { ref, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import TheCard from "./components/TheCard.vue";
import TheTile from "./components/TheTile.vue";

const { data: horaires } = useFetch(
  "https://chabloz.eu/files/horaires/all.json"
);

const classes = ['IM48', 'IM49-1', 'IM49-2', 'IM50-1', 'IM50-2', 'IM50-3']
let selected = ref(null);
</script>

<template>
  <div class="main mx-1 my-1">
    <div class="blocks has-text-left main mx-4 my-4">
      <p class="has-text-weight-bold">HEIG-VD</p>
      <p>Horaires des cours</p>
    </div>
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button v v-for="classe in classes" :key="classe" @click="selected = classe"
          class="column button has-background-info has-text-white is-medium is-one-fifth-mobile">
          {{ classe }}
        </button>
      </div>
    </div>
    <div class="select is-danger">
      <select>
        <option>Tout les cours</option>
        <option>With options</option>
      </select>
    </div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <the-tile v-for="horaire in horaires" :key="horaire.start" v-show="horaire.class == selected"
          :debut="horaire.start" :fin="horaire.start" :cours="horaire.label" :salle="horaire.room">
        </the-tile>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
