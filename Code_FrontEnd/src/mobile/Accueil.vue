<script setup>
import { def } from "@vue/shared";
import axios from "axios";
import { computed, ref, watch, watchEffect } from "vue";
import { useFetch } from "../../composables/fetch";
import CardCours from "../components/CardCours.vue";
import BaseFormModal from "../components/BaseFormModal.vue";
import BaseInputSubmit from "../components/BaseInputSubmit.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseModalForm from "../components/BaseModalForm.vue";
import Switch from "../components/Switch.vue";
import ArrowPrev from "../components/ArrowPrev.vue";
import ArrowNext from "../components/ArrowNext.vue";
import randomColor from "randomcolor";
import TheLoader from "../components/TheLoader.vue";
import { BASE_URL } from "../../composables/store";

const { data: classes } = useFetch(BASE_URL + "classes");

const selectedClasses = ref("M49-1");

const classeCours = ref([]);

var dateActuelle = new Date();

const lundiSemaine = ref([
  formatDate(
    new Date(dateActuelle.setDate(dateActuelle.getDate() - dateActuelle.getDay() + 1))
  ),
]);

const vendrediSemaine = ref([
  formatDate(
    new Date(dateActuelle.setDate(dateActuelle.getDate() - dateActuelle.getDay() + 5))
  ),
]);

var viewLundiSemaine = ref([]);
var viewVendrediSemaine = ref([]);

const dateStr = formatDateView(dateActuelle);

watchEffect(() => {
  fetch(BASE_URL + "cours/classe/" + selectedClasses.value)
    .then((res) => res.json())
    .then((coursClasse) => (classeCours.value = coursClasse));
});

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

function checkDate(date) {
  var dateLundi = lundiSemaine.value[0];
  var dateVendredi = vendrediSemaine.value[0];
  var dateCheck = date.toString();

  var d1 = dateLundi.split("/");
  var d2 = dateVendredi.split("/");
  var c = dateCheck.split("/");

  var from = new Date(d1);
  var to = new Date(d2);
  var check = new Date(c);

  var reponse = false;

  if (check >= from && check <= to) {
    reponse = true;
  }

  return reponse;
}

const role = ref(sessionStorage.getItem("role"));

const CoursClasse = computed(() => {
  const tabCours = [];
  if (!classeCours.value?.length) {
    return [];
  } else {
    classeCours.value.forEach((element) => {
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
      let heureDebut = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
      let heureFin = f.getHours() + ":" + String(f.getMinutes()).padStart(2, "0");
      element.Jour = day;
      element.Date = date;
      element.HeureDebut = heureDebut;
      element.HeureFin = heureFin;
      tabCours.push(element);
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
  }

  let coursObj;
  let dateTest;
  const tabCoursByDate = [];
  tabCours.forEach((element) => {
    if (coursObj === undefined) {
      dateTest = new Date();
      dateTest = element.Debut;
      coursObj = new Object();
      coursObj.DateTest = formatDate(new Date(dateTest));
      coursObj.Date = element.Date;
      coursObj.Jour = element.Jour;
      coursObj.Cours = [];
      coursObj.Cours.push(element);
    } else if (coursObj.Date !== element.Date) {
      dateTest = new Date();
      dateTest = element.Debut;
      coursObj = new Object();
      coursObj.DateTest = formatDate(new Date(dateTest));
      coursObj.Date = element.Date;
      coursObj.Jour = element.Jour;
      coursObj.Cours = [];
      coursObj.Cours.push(element);
    } else {
      coursObj.Cours.push(element);
    }
    tabCoursByDate.push(coursObj);
  });
  const uniqueCoursByDate = new Set(tabCoursByDate);
  return { uniqueCoursByDate };
});

const Classes = computed(() => {
  const tabClasse = [];
  if (!classes.value?.length) {
    return [];
  } else {
    classes.value.forEach((element) => {
      tabClasse.push(element);
    });
  }
  viewLundiSemaine.value = formatDateView(new Date(lundiSemaine.value[0]));
  viewVendrediSemaine.value = formatDateView(new Date(vendrediSemaine.value[0]));
  return tabClasse;
});

const Matiere = computed(() => {
  const tabMatiere = [];
  var dateTest;
  if (!classeCours.value?.length) {
    return [];
  } else {
    classeCours.value.forEach((element) => {
      dateTest = new Date();
      dateTest = formatDate(new Date(element.Debut));
      element.DateTest = dateTest;
      if (checkDate(element.DateTest)) {
        tabMatiere.push(element.matiere_id);
      }
    });
  }
  const uniqueMatiere = new Set(tabMatiere);
  return { uniqueMatiere };
});

function afficheForm() {
  console.log(4);
}

let showModalForm = ref(false);

//Traitement du form after submit
const dateCours = ref("");
const selectedclasseModal = ref("");
const heureDebut = ref("");
const heureFin = ref("");
const matiere = ref("");
const lieu = ref("");

const selectedClasseModal = ref("");

watchEffect(() => {
  console.log(dateCours.value);
  console.log(selectedclasseModal.value);
  console.log(heureDebut.value);
  console.log(heureFin.value);
  console.log(matiere.value);
  console.log(lieu.value);
});
/* function addCours() {
  axios
    .post(BASE_URL + "cours/create", {
      Debut: date.value + ' ' + heureDebut.value,
      Fin: date.value + ' ' + heureFin.value,
      matiere_id: matiere.value,
    })
    .then((res) => {
      //Perform Success Action
      console.log(res);
    })
    .catch((error) => {
      // error.response.status Check status code
      console.log(error);
    })
    .finally(() => {
      window.location.reload();
    })
} */

async function addCours() {
  try {
    const cours = await axios
      .post(BASE_URL + "cours/create", {
        Debut: dateCours.value + " " + heureDebut.value,
        Fin: dateCours.value + " " + heureFin.value,
        matiere_id: matiere.value,
      })
      .then(() => {
        window.location.reload();
      });
    console.log(cours);
  } catch (e) {
    console.log(e);
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

function setClass(day) {
  const uniqueClass = new Set();
  day.Cours.forEach((element) => {
    uniqueClass.add(element.matiere_id);
  });
  const str1 = Array.from(uniqueClass).join(" ");
  return str1;
}

function changeSemaine(change) {
  if (change === "previous") {
    lundiSemaine.value[0] = formatDate(
      new Date(
        dateActuelle.setDate(dateActuelle.getDate() - dateActuelle.getDay() + 1 - 7)
      )
    );
    vendrediSemaine.value[0] = formatDate(
      new Date(dateActuelle.setDate(dateActuelle.getDate() - dateActuelle.getDay() + 5))
    );
  } else {
    lundiSemaine.value[0] = formatDate(
      new Date(
        dateActuelle.setDate(dateActuelle.getDate() - dateActuelle.getDay() + 1 + 7)
      )
    );
    vendrediSemaine.value[0] = formatDate(
      new Date(dateActuelle.setDate(dateActuelle.getDate() - dateActuelle.getDay() + 5))
    );
  }

  viewLundiSemaine.value = formatDateView(new Date(lundiSemaine.value[0]));
  viewVendrediSemaine.value = formatDateView(new Date(vendrediSemaine.value[0]));
}

fetch(BASE_URL + "matiere")
  .then((res) => res.json())
  .then((AllMatiere) => {
    console.log("----------------------");
    console.log(matiere);
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

window.onload = function loader() {
  document.querySelector(".loading-box").style.display = "flex";
  setTimeout(showPage, 1000);
};
function showPage() {
  document.querySelector(".loading-box").style.display = "none";
}
</script>
<template>
  <TheLoader></TheLoader>
  <div class="main mx-4 my-1">
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button
          v-for="classe in Classes"
          :key="classe"
          @click="valueHasClicked($event)"
          class="column button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger btnClasse"
        >
          {{ classe.id }}
        </button>
      </div>
    </div>
    <p>Semaine du</p>
    <ArrowPrev :span="viewLundiSemaine" @click="changeSemaine('previous')" />
    <span> au </span>
    <ArrowNext :span="viewVendrediSemaine" @click="changeSemaine('next')" />
    <div class="charger">Loading...</div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div class="tile is-parent is-vertical">
          <template v-for="day in CoursClasse.uniqueCoursByDate" :key="day.Jour">
            <template v-if="checkDate(day.DateTest)">
              <span style="text-align: left" :class="setClass(day)" class="spanCours">{{
                day.Date
              }}</span>
              <HR
                v-if="dateStr == day.Date"
                :class="setClass(day)"
                class="spanCours"
                style="background-color: blue; height: 5px"
              ></HR>
              <card-cours
                v-for="cours in day.Cours"
                :key="cours.id"
                :data-id="cours.id"
                :class="cours.matiere_id"
                class="cours"
                :debut="cours.HeureDebut"
                :fin="cours.HeureFin"
                :cours="cours.matiere_id"
                :salle="cours.salle_id"
              >
              </card-cours>
            </template>
          </template>
          <div v-if="CoursClasse.uniqueCoursByDate == undefined">
            <h2>Cours en chargement</h2>
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
  <!-- MODAL FORM  -->
  <BaseModalForm :class="{ 'is-active': showModalForm }" @close="showModalForm = false">
    <!-- AJOUT COURS  -->
    <BaseFormModal @submit.prevent="addCours()">
      <h1 class="title is-1">Nouveau cours</h1>

      <BaseInput>
        <template v-slot:label>Date</template>
        <template v-slot:input>
          <input v-model="date" class="input" type="date" placeholder="Entrez une date" />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Classe</template>
        <template v-slot:input>
          <div class="select">
            <select v-model="selectedclasseModal">
              <option v-for="classe in Classes" @click="selectedclasseModal = classe.id">
                {{ classe.id }}
              </option>
            </select>
          </div>
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Matière</template>
        <template v-slot:input>
          <div class="select">
            <select v-model="matiere">
              <option>Droit2</option>
            </select>
          </div>
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Heure de début</template>
        <template v-slot:input>
          <input
            v-model="heureDebut"
            class="input"
            type="time"
            placeholder="Entrez une heure de début"
          />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Heure de fin</template>
        <template v-slot:input>
          <input
            v-model="heureFin"
            class="input"
            type="time"
            placeholder="Entrez une heure de fin"
          />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Lieu</template>
        <template v-slot:input>
          <input
            v-model="lieu"
            class="input"
            type="text"
            placeholder="Entrez le lieu d'une classe"
          />
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input
          type="submit"
          class="button is-danger is-rounded"
          value="Ajouter le cours"
        />
      </BaseInputSubmit>
    </BaseFormModal>
  </BaseModalForm>
</template>
<style>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
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
button.isActive {
  background-color: #f14668 !important;
  color: #ffffff !important;
}
</style>
