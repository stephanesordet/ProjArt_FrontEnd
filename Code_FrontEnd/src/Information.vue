<script setup>
import { ref, computed, watchEffect, nextTick } from "vue";
import CardEvent from "./components/CardEvent.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import { currentEventId } from "../composables/store";
import axios from "axios";
import { useFetch } from "../composables/fetch.js";
import { BASE_URL, idDetailsEvent, todayDate } from "../composables/store.js";
import { changeFormatDateWithoutHoursMinutes } from "../composables/function.js";
import randomColor from "randomcolor";
import CardInfoVue from "./components/CardInfo.vue";
import CardProf from "./components/CardProf.vue";

const filiereStore = ref("COMEM+");
const filiereView = ref(true);
const classeStore = ref("M49-1");
const classeView = ref(false);
const detailView = ref(false);
const etudiantView = ref(false);
const profView = ref(false);

// ---------------------- Fetch data for all events -----------------------------
const { data: filiere } = useFetch(BASE_URL + "filiere/");
const etudiant = ref([]);
watchEffect(() => {
  fetch(BASE_URL + "etudiant/"+ classeStore.value +"/")
    .then((res) => res.json())
    .then((etudiants) => (etudiant.value = etudiants));
});
const prof = ref([]);
watchEffect(() => {
  fetch(BASE_URL + "prof/"+ filiereStore.value)
    .then((res) => res.json())
    .then((profs) => (prof.value = profs));
});
const classe = ref([]);
watchEffect(() => {
  fetch(BASE_URL + "classes/filiere/"+filiereStore.value)
    .then((res) => res.json())
    .then((classes) => (classe.value = classes));
});

const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));

const allFiliere = computed(() => {
  const tabFiliere = [];
  if (!filiere.value?.length) {
    return [];
  } else {
    filiere.value.forEach((element) => {
        tabFiliere.push(element);
    });
  }
  return tabFiliere;
});

const allClasse = computed(() => {
  const tabCalsse = [];
  if (!classe.value?.length) {
    return [];
  } else {
    classe.value.forEach((element) => {
        tabCalsse.push(element);
    });
  }
  return tabCalsse;
});

fetch(BASE_URL + "filiere")
  .then((res) => res.json())
  .then((AllMatiere) => {
    var couleurMatiereOb;
    const matiereColor = [];
    var i = 0;
    AllMatiere.forEach((matiere) => {
      couleurMatiereOb = Object();
      couleurMatiereOb.id = matiere.id;
      couleurMatiereOb.color = randomColor({ seed: i });
      matiereColor.push(couleurMatiereOb);
      i += 7;
    });
    matiereColor.forEach((element) => {
      document.head.insertAdjacentHTML(
        "beforeend",
        "<style>." +
          element.id +
          "{border-color:" +
          element.color +
          " !important}</style>"
      );
    });
  });

  function changeVueFiliere(filiere) {
    filiereStore.value = filiere;
    filiereView.value = false;
    classeView.value = true;
    detailView.value = false;
    etudiantView.value = false;
    profView.value = false;
  }

  function changeVueClasse(classe) {
    classeStore.value = classe;
    detailView.value = true;
    classeView.value = false;
    filiereView.value = false;
    etudiantView.value = false;
    profView.value = false;
  }

  function changeVueEtudiant() {
    etudiantView.value = true;
    classeView.value = false;
    filiereView.value = false;
    profView.value = false;
    detailView.value = false;
  }

  function changeVue() {
    etudiantView.value = false;
    classeView.value = false;
    filiereView.value = true;
    profView.value = false;
    detailView.value = false;
  }

   const allEtudiant = computed(() => {
  const tabEtudiant = new Set();
  if (!etudiant.value?.length) {
    return [];
  } else {
    etudiant.value.forEach((element) => {
        tabEtudiant.add(element);
    });
  }
  return tabEtudiant;
});

   function changeVueProf() {
    classeView.value = false;
    filiereView.value = false;
    etudiantView.value = false;
    detailView.value = false;
    profView.value = true;
  }

      const allProf = computed(() => {
  const tabProf = new Set();
  if (!prof.value?.length) {
    return [];
  } else {
    prof.value.forEach((element) => {
        tabProf.add(element);
    });
  }
  return tabProf;
});

   fetch(BASE_URL + "classes/filiere/"+filiereStore.value+"/")
  .then((res) => res.json())
  .then((AllMatiere) => {
    var couleurMatiereOb;
    const matiereColor = [];
    var i = 0;
    AllMatiere.forEach((matiere) => {
      couleurMatiereOb = Object();
      couleurMatiereOb.id = matiere.id;
      couleurMatiereOb.color = randomColor({ seed: i });
      matiereColor.push(couleurMatiereOb);
      i += 7;
    });
    matiereColor.forEach((element) => {
      document.head.insertAdjacentHTML(
        "beforeend",
        "<style>." +
          element.id +
          "{border-color:" +
          element.color +
          " !important}</style>"
      );
    });
  });
</script>

<template>
    <div class="main my-4 mx-4">
      <template v-if="classeView">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
          <button @click="changeVue()" class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text">
              <span class="icon">
                  <i class="fa fa-arrow-left is-flex  has-text-black"></i>
              </span>
          </button>
      </template>
      <template v-if="detailView">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
          <button @click="changeVueFiliere(filiereStore)" class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text">
              <span class="icon">
                  <i class="fa fa-arrow-left is-flex  has-text-black"></i>
              </span>
          </button>
      </template>
       <template v-if="etudiantView">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
          <button @click="changeVueClasse(classeStore)" class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text">
              <span class="icon">
                  <i class="fa fa-arrow-left is-flex  has-text-black"></i>
              </span>
          </button>
      </template>
      <template v-if="profView">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
          <button @click="changeVueFiliere(filiereStore)" class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text">
              <span class="icon">
                  <i class="fa fa-arrow-left is-flex  has-text-black"></i>
              </span>
          </button>
      </template>
      <span><a v-if="filiereView || classeView || detailView || etudiant || profView" @click="changeVue()">Filiere</a>  <a v-if="classeView || detailView || etudiantView || profView" @click="changeVueFiliere(filiereStore)">> Classe</a>  <a v-if="detailView || etudiantView" @click="changeVueClasse(classeStore)">> Details</a>  <a v-if="profView" @click="changeVueProf()">> Prof</a>  <a v-if="etudiantView" @click="changeVueEtudiant()">> Etudiant</a></span>
      <template v-if="filiereView">
        <card-info-vue  v-for="filiere in allFiliere"
        :info="filiere.id"
        :class="filiere.id"
        @click="changeVueFiliere(filiere.id)">
        </card-info-vue>
        </template>
        <template v-if="classeView">
        <card-info-vue  v-for="classe in allClasse"
        :info="classe.id"
        :class="classe.id"
        @click="changeVueClasse(classe.id)">
        </card-info-vue>
        <card-info-vue 
        info="Liste Professeurs"
        @click="changeVueProf()">
        </card-info-vue>
        </template>
        <template v-if="detailView">
        <card-info-vue 
        info="Liste étudiants"
        @click="changeVueEtudiant()">
        </card-info-vue>
        </template>
        <template v-if="profView">
        <card-prof  v-for="prof in allProf"
        :info="prof.FullName"
        :class="prof.FullName"
        :email="prof.Email"
        :acronyme="prof.Acronyme">
        </card-prof>
        </template>
        <template v-if="etudiantView">
        <card-prof  v-for="prof in allEtudiant"
        :info="prof.FullName"
        :class="prof.FullName"
        :email="prof.Email"
        :acronyme="prof.Email">
        </card-prof>
        </template>
    </div>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>