<script setup>
import { def } from "@vue/shared";
import { computed, ref, watch, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import CardCours from "./components/CardCours.vue";

const { data: cours } = useFetch(
  "http://localhost:8000/api/cours"
)

const { data: classes } = useFetch('http://localhost:8000/api/classes')

const { data: matieres } = useFetch('http://localhost:8000/api/matiere')

let selectedClasse = ref('IM48')
let selectedMatiere = ref('Tous les cours')
let Matieres = ref([]);

function afficheForm() {
  console.log(4)
}
</script>

<template>
  <div class="main mx-4 my-1">
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button v-for="classe in classes" :key="classe.d"
          @click="selectedClasse = classe.id, selectedMatiere = 'Tous les cours'"
          class="column button has-background-info has-text-white is-medium is-one-fifth-mobile">
          {{ classe.id }}
        </button>
      </div>
    </div>
    <div class="select is-danger">
      <select>
        <option @click="selectedMatiere = 'Tous les cours'">Tous les cours</option>
        <option v-for=" matiere in matieres" :key="matiere" @click="selectedMatiere = matiere.id">
          {{ matiere.id }}
        </option>
      </select>
    </div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div v-if="selectedMatiere != 'Tous les cours'" class="tile is-parent is-vertical">
          <card-cours v-for="cour in cours" :key="cour.id"
            v-show="selectedClasse == horaire.class && selectedMatiere == horaire.label" :debut="cour.Fin"
            :fin="cour.Debut" :cours="cour.matiere_id">
          </card-cours>
        </div>

        <div v-else class="tile is-parent is-vertical">
          <card-cours v-for="cour in cours" :key="cour.id" :debut="cour.Debut" :fin="cour.Fin" :cours="cour.matiere_id">
          </card-cours>

        </div>
      </div>
    </div>
    <div>
      <button class="button is-pulled-right" id="fixedbutton" @click="afficheForm()">
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
