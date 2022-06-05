<script setup>
import { def } from "@vue/shared";
import { computed, ref, watch, watchEffect } from "vue";
import { useFetch, useFetchLogin } from "../composables/fetch";
import { randomColor } from "../composables/randomColor";
import CardCours from "./components/CardCours.vue";

let selectedMatiere = ref("Tous les cours");

const { data: matieres } = useFetch("http://127.0.0.1:8000/api/matiere");

const { data: classes } = useFetch("http://127.0.0.1:8000/api/classes");

const { data: coursClasse } = useFetch('http://127.0.0.1:8000/api/cours/classe/IM49-2');

const CoursClasse = computed(() => {
  const tabCours = [];
  if (!coursClasse.value?.length) {
    return [];
  } else {
    coursClasse.value.forEach((element) => {
      tabCours.push(element)
    });
  }
  return tabCours;
});

const Classes = computed(() => {
  const tabClasse = [];
  if (!classes.value?.length) {
    return [];
  } else {
    classes.value.forEach((element) => {
      tabClasse.push(element.id);
    });
  }
  return tabClasse;
});

function afficheForm() {
  alert("aaa");
}
</script>

<template>
  <div class="main mx-4 my-1">
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button v-for="classe in Classes" :key="classe" @click="
          coursClasse.value = useFetch('http://127.0.0.1:8000/api/cours/classe/' + classe)
        " class="
            column
            button
            has-background-light has-text-black
            is-medium is-one-fifth-mobile is-danger
          ">
          {{ classe }}
        </button>
      </div>
    </div>
    <div class="select is-danger">
      <select>
        <option @click="selectedMatiere = 'Tous les cours'">
          Tous les cours
        </option>
        <option v-for="cours in CoursClasse" :key="cours.id" @click="selectedMatiere = cours.matiere_id">
          {{ cours.matiere_id }}
        </option>
      </select>
    </div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div v-if="selectedMatiere != 'Tous les cours'" class="tile is-parent is-vertical">
          <card-cours v-for="cours in coursClasse" :key="cours.id" v-show="selectedMatiere == cours.matiere_id"
            :debut="cours.Debut" :fin="cours.Fin" :cours="cours.matiere_id" :salle="cours.salle_id">
          </card-cours>
        </div>

        <div v-else class="tile is-parent is-vertical">
          <card-cours v-for="cours in coursClasse" :key="cours.id" :debut="cours.Debut" :fin="cours.Fin"
            :cours="cours.matiere_id" :salle="cours.salle_id">

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
