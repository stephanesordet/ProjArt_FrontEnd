<script setup>
import { def } from "@vue/shared";
import axios from "axios";
import { computed, ref, watch, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import CardCours from "./components/CardCours.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import Switch from "./components/Switch.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import { BASE_URL } from "../composables/store";


const userSession = ref(sessionStorage.getItem("user"))

const role = ref(sessionStorage.getItem("role"));

const historique = ref(false);

const classeCours = ref([]);

window.addEventListener('hashchange', () => {
  userSession.value = sessionStorage.getItem("user");
  role.value = sessionStorage.getItem("role");
});


watchEffect(() => {
  fetch(BASE_URL + "cours/user/" + userSession.value)
    .then((res) => res.json())
    .then((CoursUser) => (classeCours.value = CoursUser));
  console.log("cours/user/" + userSession.value)
});

const date = new Date();
const dateStr =
  date.getFullYear() +
  "-" +
  ("00" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  ("00" + date.getDate()).slice(-2);

const CoursUser = computed(() => {
  const tabCours = [];
  const tabCoursHistorique = [];
  if (!classeCours.value?.length) {
    return [];
  } else {
    classeCours.value.forEach((element) => {
      if (element.Debut > dateStr) {
        const month = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
        const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const d = new Date(element.Debut);
        const f = new Date(element.Fin);
        let monthDate = month[d.getMonth()];
        let day = days[d.getDay()];
        let date = d.getDate() + " " + monthDate + " " + d.getFullYear();
        let heureDebut = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
        let heureFin = f.getHours() + ":" + String(f.getMinutes()).padStart(2, "0");
        element.Jour = day;
        element.Date = date;
        element.HeureDebut = heureDebut;
        element.HeureFin = heureFin;
        tabCours.push(element);
      } else {
        const month = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
        const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const d = new Date(element.Debut);
        const f = new Date(element.Fin);
        let monthDate = month[d.getMonth()];
        let day = days[d.getDay()];
        let date = d.getDate() + " " + monthDate + " " + d.getFullYear();
        let heureDebut = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
        let heureFin = f.getHours() + ":" + String(f.getMinutes()).padStart(2, "0");
        element.Jour = day;
        element.Date = date;
        element.HeureDebut = heureDebut;
        element.HeureFin = heureFin;
        tabCoursHistorique.push(element);
      }
    });
    let duplicates = [];
    const tempArray = tabCours.sort();
    for (let i = 0; i < tempArray.length; i++) {
      let j = i + 1;
      if (j >= tempArray.length) break;
      if (tempArray[j].id === tempArray[i].id) {
        duplicates.push(tempArray[i]);
      }
    }
    for (let i = 0; i < tabCours.length; i++) {
      duplicates.forEach((element) => {
        if (tabCours[i].id === element.id) {
          tabCours.splice(i, 1);
          tabCours[i].salle_id += " " + element.salle_id;
        }
      });
    }

    let duplicatesHistorique = [];
    const tempArrayHistorique = tabCoursHistorique.sort();
    for (let i = 0; i < tempArrayHistorique.length; i++) {
      let j = i + 1;
      if (j >= tempArrayHistorique.length) break;
      if (tempArrayHistorique[j].id === tempArrayHistorique[i].id) {
        duplicatesHistorique.push(tempArrayHistorique[i]);
      }
    }
    for (let i = 0; i < tabCoursHistorique.length; i++) {
      duplicatesHistorique.forEach((element) => {
        if (tabCoursHistorique[i].id === element.id) {
          tabCoursHistorique.splice(i, 1);
          tabCoursHistorique[i].salle_id += " " + element.salle_id;
        }
      });
    }
  }

  let coursObj;
  const tabCoursByDate = [];
  tabCours.forEach((element) => {
    if (coursObj === undefined) {
      coursObj = new Object();
      coursObj.Date = element.Date;
      coursObj.Jour = element.Jour;
      coursObj.Cours = [];
      coursObj.Cours.push(element);
    } else if (coursObj.Date !== element.Date) {
      coursObj = new Object();
      coursObj.Date = element.Date;
      coursObj.Jour = element.Jour;
      coursObj.Cours = [];
      coursObj.Cours.push(element);
    } else {
      coursObj.Cours.push(element);
    }
    tabCoursByDate.push(coursObj);
  });

  let coursObjHistorique;
  const tabCoursHistoriqueByDate = [];
  tabCoursHistorique.forEach((element) => {
    if (coursObjHistorique === undefined) {
      coursObjHistorique = new Object();
      coursObjHistorique.Date = element.Date;
      coursObjHistorique.Jour = element.Jour;
      coursObjHistorique.Cours = [];
      coursObjHistorique.Cours.push(element);
    } else if (coursObjHistorique.Date !== element.Date) {
      coursObjHistorique = new Object();
      coursObjHistorique.Date = element.Date;
      coursObjHistorique.Jour = element.Jour;
      coursObjHistorique.Cours = [];
      coursObjHistorique.Cours.push(element);
    } else {
      coursObjHistorique.Cours.push(element);
    }
    tabCoursHistoriqueByDate.push(coursObjHistorique);
  });

  const uniqueCoursByDate = new Set(tabCoursByDate);
  const uniqueCoursHistoriqueByDate = new Set(tabCoursHistoriqueByDate);

  return { uniqueCoursByDate, uniqueCoursHistoriqueByDate };
});


const Matiere = computed(() => {
  const tabMatiere = [];
  const tabMatiereHistorique = [];
  if (!classeCours.value?.length) {
    return [];
  } else {
    classeCours.value.forEach((element) => {
      if (element.Debut > dateStr) {
        tabMatiere.push(element.matiere_id);
      } else {
        tabMatiereHistorique.push(element.matiere_id);
      }
    });
  }
  const uniqueMatiere = new Set(tabMatiere);
  const uniqueMatiereHistorique = new Set(tabMatiereHistorique);
  return { uniqueMatiere, uniqueMatiereHistorique };
});

function valueHasChanged(event) {
  const cours = document.querySelectorAll(".cours");
  const spanCours = document.querySelectorAll(".spanCours");

  cours.forEach((coursSolo) => {
    coursSolo.style.display = "none";
  });

  spanCours.forEach((coursSolo) => {
    coursSolo.style.display = "none";
  });

  const val = event.target.value;

  if (val === "Tous les cours") {
    cours.forEach((coursSolo) => {
      coursSolo.style.display = "block";
    });

    spanCours.forEach((coursSolo) => {
      coursSolo.style.display = "block";
    });
  } else {
    const boxes = document.querySelectorAll("." + val);

    boxes.forEach((box) => {
      box.style.display = "block";
    });
  }
}

function valueHasClicked(event) {
  const classe = event.target.innerHTML;

  selectedClasses.value = classe;
}

function toggleHistorique() {
  if (historique.value) {
    historique.value = false;
  } else {
    historique.value = true;
  }
  const cours = document.querySelectorAll(".cours");
  const spanCours = document.querySelectorAll(".spanCours");

  cours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });

  spanCours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
}

function setClass(day) {
  const uniqueClass = new Set();
  day.Cours.forEach((element) => {
    uniqueClass.add(element.matiere_id);
  });
  const str1 = Array.from(uniqueClass).join(' ');
  return str1;
}

function voirDetails(id, matiere_id) {
  console.log("details");
  window.location.hash = "#detailMatiere";
  window.location.reload();

  sessionStorage.setItem("idDetailsMatiere", id);
  sessionStorage.setItem("matiere_idDetailsMatiere", matiere_id);
}
</script>

<template>
  <div class="main mx-4 my-1">
    <h1>Vous êtes connectés en tant que : <b>{{ userSession }}</b></h1>
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button v-for="classe in Classes" :key="classe" @click="valueHasClicked($event)"
          class="column button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger">
          {{ classe.id }}
        </button>
      </div>
    </div>
    <div class="select is-danger">
      <select @change="valueHasChanged($event)">
        <option>Tous les cours</option>
        <template v-if="!historique">
          <option v-for="matiere in Matiere.uniqueMatiere" :key="matiere">
            {{ matiere }}
          </option>
        </template>
        <template v-if="historique">
          <option v-for="matiere in Matiere.uniqueMatiereHistorique" :key="matiere">
            {{ matiere }}
          </option>
        </template>
      </select>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 15px;">
      <Switch v-model:checked="shouldReceiveNewsletter" label="Historique" @change="toggleHistorique()" />
    </div>
    <Toggle v-model="value" />
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div class="tile is-parent is-vertical">
          <template v-if="historique">
            <template v-for="day in CoursUser.uniqueCoursHistoriqueByDate" :key="day.Jour">
              <span style="text-align:left;" :class="setClass(day)" class="spanCours">{{ day.Date }}</span>
              <card-cours v-for="cours in day.Cours" :key="cours.id" :data-id="cours.id" :class="cours.matiere_id"
                class="cours" :debut="cours.HeureDebut" :fin="cours.HeureFin" :cours="cours.matiere_id"
                :salle="cours.salle_id">
                <button class="button is-pulled-right is-white has-background-light"
                  @click="voirDetails(cours.id, cours.matiere_id)">
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </card-cours>
            </template>
          </template>
          <template v-for="day in CoursUser.uniqueCoursByDate" :key="day.Jour">
            <span style="text-align:left;" :class="setClass(day)" class="spanCours">{{ day.Date }}</span>
            <card-cours v-for="cours in day.Cours" :key="cours.id" :data-id="cours.id" :class="cours.matiere_id"
              class="cours" :debut="cours.HeureDebut" :fin="cours.HeureFin" :cours="cours.matiere_id"
              :salle="cours.salle_id">
              <button class="button is-pulled-right is-white has-background-light"
                @click="voirDetails(cours.id, cours.matiere_id)">
                <span class="icon is-small">
                  <i class="fa fa-info"></i>
                </span>
              </button>
            </card-cours>
          </template>
          <div v-if="(CoursUser.uniqueCoursByDate == undefined)">
            <h2>Cours en chargement</h2>
          </div>
          <div v-else-if="(CoursUser.uniqueCoursByDate.size == 0) && (!historique)">
            <h2>Plus de cours actuellement</h2>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button v-show="role == 'Administration'" class="button is-right js-modal-trigger" data-target="modal-js-example"
        id="fixedbutton" @click="showModalForm = !showModalForm">
        <span class="icon is-large has-text-danger">
          <i class="fa fa-4x fa-plus-square"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
