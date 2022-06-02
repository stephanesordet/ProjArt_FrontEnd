<script setup>
import { def } from "@vue/shared";
import { computed, ref, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import CardCours from "./components/CardCours.vue";

const { data: horaires } = useFetch(
  "https://chabloz.eu/files/horaires/all.json"
);

let selectedClasse = ref("IM48");
let selectedMatiere = ref("Tous les cours");
let Matieres = ref([]);

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

Matieres = computed(() => {
  const tabMatieres = [];
  if (!horaires.value?.length) {
    return [];
  } else {
    horaires.value.forEach((element) => {
      if (
        !tabMatieres.includes(element.label) &&
        element.class == selectedClasse.value
      ) {
        tabMatieres.push(element.label);
      }
    });
  }
  return tabMatieres;
});

function afficheForm() {
  console.log(4);
}
</script>

<template>
  <div class="main mx-4 my-1">
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
<<<<<<< Updated upstream
        <button v-for="classe in Classes" :key="classe"
          @click="selectedClasse = classe, selectedMatiere = 'Tous les cours'"
          class="column button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger">
=======
        <button
          v-for="classe in Classes"
          :key="classe"
          @click="
            (selectedClasse = classe), (selectedMatiere = 'Tous les cours')
          "
          class="column button has-background-info has-text-white is-medium is-one-fifth-mobile"
        >
>>>>>>> Stashed changes
          {{ classe }}
        </button>
      </div>
    </div>
    <div class="select is-danger">
      <select>
        <option @click="selectedMatiere = 'Tous les cours'">
          Tous les cours
        </option>
        <option
          v-for="matiere in Matieres"
          :key="matiere"
          @click="selectedMatiere = matiere"
        >
          {{ matiere }}
        </option>
      </select>
    </div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div
          v-if="selectedMatiere != 'Tous les cours'"
          class="tile is-parent is-vertical"
        >
          <card-cours
            v-for="horaire in horaires"
            :key="horaire.start"
            v-show="
              selectedClasse == horaire.class &&
              selectedMatiere == horaire.label
            "
            :debut="horaire.start"
            :fin="horaire.start"
            :cours="horaire.label"
            :salle="horaire.room"
          >
          </card-cours>
        </div>

        <div v-else class="tile is-parent is-vertical">
          <card-cours
            v-for="horaire in horaires"
            :key="horaire.id"
            v-show="selectedClasse == horaire.class"
            :debut="horaire.start"
            :fin="horaire.start"
            :cours="horaire.label"
            :salle="horaire.room"
          >
          </card-cours>
        </div>
      </div>
    </div>
    <div>
      <button
        class="button is-pulled-right"
        id="fixedbutton"
        @click="afficheForm()"
      >
        <span class="icon is-large has-text-danger">
          <i class="fa fa-4x fa-plus-square"></i>
        </span>
      </button>
    </div>
  </div>
</template>
<style>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>
