<script setup>
import { def } from "@vue/shared";
import { computed, ref, nextTick, watchEffect } from "vue";
import CardCours from "./components/CardCoursLink.vue";
import CardCours from "./components/CardCours.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import Switch from "./components/Switch.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import {
  BASE_URL,
  idDetailsMatiere,
  matiere_idDetailsMatiere,
} from "../composables/store";
import randomColor from "randomcolor";
import CardRemarque from "./components/CardRemarque.vue";

const userSession = ref(sessionStorage.getItem("user"));

const role = ref(sessionStorage.getItem("role"));

const historique = ref(false);
const classeCours = ref([]);
const userRemarque = ref([]);

var nbrMat = 0;

window.addEventListener("hashchange", () => {
  userSession.value = sessionStorage.getItem("user");
  role.value = sessionStorage.getItem("role");
});

watchEffect(() => {
  fetch(BASE_URL + "cours/user/" + userSession.value)
    .then((res) => res.json())
    .then((coursClasse) => (classeCours.value = coursClasse));
});

watchEffect(() => {
  fetch(BASE_URL + "remarque/user/" + userSession.value)
    .then((res) => res.json())
    .then((remarqueUser) => (userRemarque.value = remarqueUser));
});

const date = new Date();
const dateStrTest = formatDateView(date);
const dateStr =
  date.getFullYear() +
  "-" +
  ("00" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  ("00" + date.getDate()).slice(-2);

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join("/");
}

function formatDateView(date) {
  const month = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  let monthDate = month[date.getMonth()];
  let dates = date.getDate() + " " + monthDate + " " + date.getFullYear();
  return dates;
}
const CoursClasse = computed(() => {
  const tabCours = [];
  const tabCoursHistorique = [];
  if (!classeCours.value?.length && !userRemarque.value?.length) {
    return [];
  } else {
    classeCours.value.forEach((element) => {
      if (element.Debut > dateStr) {
        const month = [
          "Janvier",
          "Fevrier",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Aout",
          "Septembre",
          "Octobre",
          "Novembre",
          "Decembre",
        ];
        const days = [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ];
        const d = new Date(element.Debut);
        const f = new Date(element.Fin);
        let monthDate = month[d.getMonth()];
        let day = days[d.getDay()];
        let date = d.getDate() + " " + monthDate + " " + d.getFullYear();
        let heureDebut =
          d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
        let heureFin =
          f.getHours() + ":" + String(f.getMinutes()).padStart(2, "0");
        element.Jour = day;
        element.Date = date;
        element.HeureDebut = heureDebut;
        element.HeureFin = heureFin;
        element.Name = "Cours";
        console.log(element.salle_id);
        tabCours.push(element);
      } else {
        const month = [
          "Janvier",
          "Fevrier",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Aout",
          "Septembre",
          "Octobre",
          "Novembre",
          "Decembre",
        ];
        const days = [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ];
        const d = new Date(element.Debut);
        const f = new Date(element.Fin);
        let monthDate = month[d.getMonth()];
        let day = days[d.getDay()];
        let date = d.getDate() + " " + monthDate + " " + d.getFullYear();
        let heureDebut =
          d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
        let heureFin =
          f.getHours() + ":" + String(f.getMinutes()).padStart(2, "0");
        element.Jour = day;
        element.Date = date;
        element.HeureDebut = heureDebut;
        element.HeureFin = heureFin;
        element.Name = "Cours";
        tabCoursHistorique.push(element);
      }
    });
    userRemarque.value.forEach((element) => {
      if (element.Date >= dateStr) {
        const month = [
          "Janvier",
          "Fevrier",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Aout",
          "Septembre",
          "Octobre",
          "Novembre",
          "Decembre",
        ];
        const days = [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ];
        const d = new Date(element.Date);
        let monthDate = month[d.getMonth()];
        let day = days[d.getDay()];
        let date = d.getDate() + " " + monthDate + " " + d.getFullYear();
        element.Jour = day;
        element.Date = date;
        element.Name = "Remarque";
        tabCours.push(element);
      } else {
        const month = [
          "Janvier",
          "Fevrier",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Aout",
          "Septembre",
          "Octobre",
          "Novembre",
          "Decembre",
        ];
        const days = [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ];
        const d = new Date(element.Date);
        let monthDate = month[d.getMonth()];
        let day = days[d.getDay()];
        let date = d.getDate() + " " + monthDate + " " + d.getFullYear();
        element.Jour = day;
        element.Date = date;
        element.Name = "Remarque";
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
    tabCours.forEach((element) => {
      var salle = element.salle_id;
      if (salle !== undefined) {
        var tabSalle = salle.split(" ");
        var uniqueSalle = new Set(tabSalle);
        var txtUniqueSalle = Array.from(uniqueSalle).join(" ");
        element.salle_id = txtUniqueSalle;
      }
    });
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
    tabCoursHistorique.forEach((element) => {
      var salle = element.salle_id;
      if (salle !== undefined) {
        var tabSalle = salle.split(" ");
        var uniqueSalle = new Set(tabSalle);
        var txtUniqueSalle = Array.from(uniqueSalle).join(" ");
        element.salle_id = txtUniqueSalle;
      }
    });
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
  const uniqueCoursByDate = new Set();
  tabCoursByDate.forEach((element) => {
    uniqueCoursByDate.add(element);
    uniqueCoursByDate.forEach((element2) => {
      if (element.Date === element2.Date && element.Cours !== element2.Cours) {
        element.Cours.forEach((element3) => {
          element2.Cours.push(element3);
          uniqueCoursByDate.delete(element);
        });
      }
    });
  });
  const uniqueCoursHistoriqueByDate = new Set();
  tabCoursHistoriqueByDate.forEach((element) => {
    uniqueCoursHistoriqueByDate.add(element);
    uniqueCoursHistoriqueByDate.forEach((element2) => {
      if (element.Date === element2.Date && element.Cours !== element2.Cours) {
        element.Cours.forEach((element3) => {
          element2.Cours.push(element3);
          uniqueCoursHistoriqueByDate.delete(element);
        });
      }
    });
  });
  console.log(uniqueCoursByDate);
  console.log(uniqueCoursHistoriqueByDate);
  return { uniqueCoursByDate, uniqueCoursHistoriqueByDate };
});

const Matiere = computed(() => {
  const tabMatiere = [];
  const tabMatiereHistorique = [];
  const uniqueMatiereColor = new Set();
  if (!classeCours.value?.length && !userRemarque.value?.length) {
    return [];
  } else {
    classeCours.value.forEach((element) => {
      uniqueMatiereColor.add(element.matiere_id);
      if (element.Debut >= dateStr) {
        tabMatiere.push(element.matiere_id);
      } else {
        tabMatiereHistorique.push(element.matiere_id);
      }
    });
    userRemarque.value.forEach((element) => {
      uniqueMatiereColor.add(element.matiere_id);
      if (element.Date >= dateStr) {
        tabMatiere.push(element.matiere_id);
      } else {
        tabMatiereHistorique.push(element.matiere_id);
      }
    });
  }
  const uniqueMatiere = new Set(tabMatiere);
  const uniqueMatiereHistorique = new Set(tabMatiereHistorique);
  console.log(uniqueMatiere);
  console.log(uniqueMatiereHistorique);
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
  const btnClasses = document.querySelectorAll(".btnClasse");
  btnClasses.forEach((btnClasse) => {
    btnClasse.classList.remove("isActive");
  });
  event.target.classList.add("isActive");
  const cours = document.querySelectorAll(".cours");
  const spanCours = document.querySelectorAll(".spanCours");
  cours.forEach((coursSolo) => {
    coursSolo.style.display = "none";
  });
  spanCours.forEach((coursSolo) => {
    coursSolo.style.display = "none";
  });
  document.querySelector(".charger").style.display = "block";
  const classe = event.target.innerHTML;
  selectedClasses.value = classe;
  console.log(selectedClasses.value);
  setTimeout(hideLoader, 1000);
}

function hideLoader() {
  document.querySelector(".charger").style.display = "none";
  const cours = document.querySelectorAll(".cours");
  const spanCours = document.querySelectorAll(".spanCours");
  cours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
  spanCours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
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
  const str1 = Array.from(uniqueClass).join(" ");
  var e = document.querySelector("select");
  e.value = "Tous les cours";
  const cours = document.querySelectorAll(".cours");
  const spanCours = document.querySelectorAll(".spanCours");
  cours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
  spanCours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
  return str1;
}

async function voirDetails(id, matiere_id) {
  sessionStorage.setItem("idDetailsMatiere", id);
  sessionStorage.setItem("matiere_idDetailsMatiere", matiere_id);
  idDetailsMatiere.value = id;
  matiere_idDetailsMatiere.value = matiere_id;
  await nextTick();
  window.location.hash = "#detailMatiere";
}

fetch(BASE_URL + "matiere")
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
      i++;
    });
    console.log(matiereColor);
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
  <div class="main mx-4 my-1">
    <h1>
      Vous êtes connectés en tant que : <b>{{ userSession }}</b>
    </h1>
    <div class="select is-danger">
      <select @change="valueHasChanged($event)">
        <option>Tous les cours</option>
        <template v-if="!historique">
          <option v-for="matiere in Matiere.uniqueMatiere" :key="matiere">
            {{ matiere }}
          </option>
        </template>
        <template v-if="historique">
          <option
            v-for="matiere in Matiere.uniqueMatiereHistorique"
            :key="matiere"
          >
            {{ matiere }}
          </option>
        </template>
      </select>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 15px">
      <Switch
        v-model:checked="shouldReceiveNewsletter"
        label="Historique"
        @change="toggleHistorique()"
      />
    </div>
    <Toggle v-model="value" />
    <div class="charger">Loading...</div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div class="tile is-parent is-vertical">
          <template v-if="historique">
            <template
              v-for="day in CoursClasse.uniqueCoursHistoriqueByDate"
              :key="day.Jour"
            >
              <span
                style="text-align: left"
                :class="setClass(day)"
                class="spanCours"
                >{{ day.Date }}</span
              >
              <template v-for="cours in day.Cours" :key="cours.id">
                <card-cours
                  v-if="cours.Name == 'Cours'"
                  :key="cours.id"
                  :data-id="cours.id"
                  :class="cours.matiere_id"
                  class="cours"
                  :debut="cours.HeureDebut"
                  :fin="cours.HeureFin"
                  :cours="cours.matiere_id"
                  :salle="cours.salle_id"
                  @click="voirDetails(cours.id, cours.matiere_id)"
                >
                  <button
                    v-show="role == 'Administration'"
                    class="button is-pulled-right is-white has-background-light"
                    @click="displayDeleteModal(cours.id)"
                  >
                    <span class="icon is-small">
                      <i class="fa fa-trash"></i>
                    </span>
                  </button>

                  <button
                    v-show="role == 'Administration'"
                    class="button is-pulled-right is-white has-background-light"
                    @click="displayUpdateModal(cours.id, cours.salle_id)"
                  >
                    <span class="icon is-small">
                      <i class="fa fa-pencil"></i>
                    </span>
                  </button>
                  <button
                    class="button is-pulled-right is-white has-background-light"
                    @click="voirDetails(cours.id, cours.matiere_id)"
                  >
                    <span class="icon is-small">
                      <i class="fa fa-info"></i>
                    </span>
                  </button>
                </card-cours>
                <card-remarque
                  v-else-if="cours.Name == 'Remarque'"
                  :data-id="cours.id"
                  :class="cours.matiere_id"
                  class="cours remarque"
                  :Visibilite="cours.Visibilite"
                  :titre="cours.Titre"
                  :description="cours.Description"
                  :matiere_id="cours.matiere_id"
                  @click="voirDetails(cours.cours_id, cours.matiere_id)"
                >
                  <button
                    v-show="role == 'Administration'"
                    class="button is-pulled-right is-white has-background-light"
                    @click="displayDeleteModal(cours.id)"
                  >
                    <span class="icon is-small">
                      <i class="fa fa-trash"></i>
                    </span>
                  </button>

                  <button
                    v-show="role == 'Administration'"
                    class="button is-pulled-right is-white has-background-light"
                    @click="displayUpdateModal(cours.id, cours.salle_id)"
                  >
                    <span class="icon is-small">
                      <i class="fa fa-pencil"></i>
                    </span>
                  </button>
                  <button
                    class="button is-pulled-right is-white has-background-light"
                    @click="voirDetails(cours.cours_id, cours.matiere_id)"
                  >
                    <span class="icon is-small">
                      <i class="fa fa-info"></i>
                    </span>
                  </button>
                </card-remarque>
              </template>
            </template>
          </template>
          <template
            v-for="day in CoursClasse.uniqueCoursByDate"
            :key="day.Jour"
          >
            <span
              style="text-align: left"
              :class="setClass(day)"
              class="spanCours"
              >{{ day.Date }}</span
            >
            <HR
              v-if="dateStrTest == day.Date && historique"
              :class="setClass(day)"
              class="spanCours"
              style="background-color: blue; height: 5px"
            >
            </HR>
            <template v-for="cours in day.Cours" :key="cours.id">
              <card-cours
                v-if="cours.Name == 'Cours'"
                :data-id="cours.id"
                :class="cours.matiere_id"
                class="cours"
                :debut="cours.HeureDebut"
                :fin="cours.HeureFin"
                :cours="cours.matiere_id"
                :salle="cours.salle_id"
                @click="voirDetails(cours.id, cours.matiere_id)"
              >
                <button
                  v-show="role == 'Administration'"
                  class="button is-pulled-right is-white has-background-light"
                  @click="displayDeleteModal(cours.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>

                <button
                  v-show="role == 'Administration'"
                  class="button is-pulled-right is-white has-background-light"
                  @click="displayUpdateModal(cours.id, cours.salle_id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button
                  class="button is-pulled-right is-white has-background-light"
                  @click="voirDetails(cours.id, cours.matiere_id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </card-cours>
              <card-remarque
                v-else-if="cours.Name == 'Remarque'"
                :data-id="cours.id"
                :class="cours.matiere_id"
                class="cours remarque"
                :Visibilite="cours.Visibilite"
                :titre="cours.Titre"
                :description="cours.Description"
                :matiere_id="cours.matiere_id"
                @click="voirDetails(cours.cours_id, cours.matiere_id)"
              >
                <button
                  v-show="role == 'Administration'"
                  class="button is-pulled-right is-white has-background-light"
                  @click="displayDeleteModal(cours.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>

                <button
                  v-show="role == 'Administration'"
                  class="button is-pulled-right is-white has-background-light"
                  @click="displayUpdateModal(cours.id, cours.salle_id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button
                  class="button is-pulled-right is-white has-background-light"
                  @click="voirDetails(cours.cours_id, cours.matiere_id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </card-remarque>
            </template>
          </template>
          <div v-if="CoursClasse.uniqueCoursByDate == undefined">
            <h2>Cours en chargement</h2>
          </div>
          <div
            v-else-if="CoursClasse.uniqueCoursByDate.size == 0 && !historique"
          >
            <h2>Plus de cours actuellement</h2>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button
        v-show="role == 'Administration'"
        class="button is-right js-modal-trigger"
        data-target="modal-js-example"
        id="fixedbutton"
        @click="showModalForm = !showModalForm"
      >
        <span class="icon is-large has-text-danger">
          <i class="fa fa-4x fa-plus-square"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.charger,
.charger:before,
.charger:after {
  background: #ffffff;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}

.charger {
  color: #333;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  display: none;
}

.charger:before,
.charger:after {
  position: absolute;
  top: 0;
  content: "";
}

.charger:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.charger:after {
  left: 1.5em;
}

@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }

  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }

  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>
