<script setup>
import { def } from "@vue/shared";
import { computed, ref, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import TheTile from "./components/TheTile.vue";

const { data: horaires } = useFetch(
  "https://chabloz.eu/files/horaires/all.json"
);

const Classes = computed(() => {
  const tabClasse = [];
  if (!horaires.value?.length) {
    return [];
  } else {
    horaires.value.forEach((element) => {
      if (!tabClasse.includes(element.class)) {
        tabClasse.push(element.class);
      }
    });
  }
  return tabClasse;
});

const Matieres = computed(() => {
  const tabMatieres = [];
  if (!horaires.value?.length) {
    return [];
  } else {
    horaires.value.forEach((element) => {
      if (!tabMatieres.includes(element.label)) {
        tabMatieres.push(element.label);
      }
    });
  }
  return tabMatieres;
});

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
        <button
          v-for="classe in Classes"
          :key="classe"
          @click="selected = classe"
          class="column button has-background-info has-text-white is-medium is-one-fifth-mobile"
        >
          {{ classe }}
        </button>
      </div>
    </div>
    <div class="select is-danger">
      <select>
        <option>Tous les cours</option>
        <option v-for="matiere in Matieres" :key="matiere">
          {{ matiere }}
        </option>
      </select>
    </div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div class="tile is-parent is-vertical">
          <the-tile
            v-for="horaire in horaires"
            :key="horaire.start"
            v-show="horaire.class == selected"
            :debut="horaire.start"
            :fin="horaire.start"
            :cours="horaire.label"
            :salle="horaire.room"
          >
          </the-tile>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
