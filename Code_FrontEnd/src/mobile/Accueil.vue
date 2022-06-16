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
import { BASE_URL } from "../../composables/store";
import { currentCoursId } from "../../composables/store";

const { data: classes } = useFetch(BASE_URL + "classes");
const { data: matieres } = useFetch(BASE_URL + "matiere");

const pasCours = ref(false);

const selectedClasses = ref("M49-1");

const classeCours = ref([]);
const userSession = ref(sessionStorage.getItem("user"));

var dateActuelle = new Date();
const dateStr = formatDateView(dateActuelle);

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
  const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let monthDate = month[date.getMonth()];
  let year = date.getFullYear().toString().slice(-2);
  let dates = date.getDate() + "." + monthDate + "." + year;
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
      let dateDebut = element.Debut;
      dateDebut = dateDebut.replaceAll(" ", "T");
      dateTest = dateDebut;
      coursObj = new Object();
      coursObj.DateTest = formatDate(new Date(dateTest));
      coursObj.Date = element.Date;
      coursObj.Jour = element.Jour;
      coursObj.Cours = [];
      coursObj.Cours.push(element);
    } else if (coursObj.Date !== element.Date) {
      dateTest = new Date();
      let dateDebut = element.Debut;
      dateDebut = dateDebut.replaceAll(" ", "T");
      dateTest = dateDebut;
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
      let dateDebut = element.Debut;
      dateDebut = dateDebut.replaceAll(" ", "T");
      dateTest = formatDate(new Date(dateDebut));
      element.DateTest = dateTest;
      if (checkDate(element.DateTest)) {
        tabMatiere.push(element.matiere_id);
      }
    });
  }
  const uniqueMatiere = new Set(tabMatiere);
  return { uniqueMatiere };
});

const MatieresAnnee = computed(() => {
  const tabMatiere = [];
  if (!matieres.value?.length) {
    return [];
  } else {
    matieres.value.forEach((element) => {
      tabMatiere.push(element);
    });
  }
  return tabMatiere;
});

let showModalForm = ref(false);
let showDeleteModalForm = ref(false);
let showUpdateModalForm = ref(false);
let showInfoModal = ref(false);

//Traitement du form after submit
const dateCoursForm = ref("");
const selectedclasseForm = ref("");
const classeForm = ref("");
const heureDebutForm = ref("");
const heureFinForm = ref("");
const matiereForm = ref("");
const lieuForm = ref("");
const selectedAnnee = ref();
const messageToUser = ref("");
const profForm = ref("");

const selectedClasseModal = ref("");

async function addCours() {
  try {
    const cours = await axios
      .post(BASE_URL + "cours/create", {
        Debut: dateCoursForm.value + " " + heureDebutForm.value,
        Fin: dateCoursForm.value + " " + heureFinForm.value,
        Matiere: matiereForm.value,
        Salles: lieuForm.value,
        Classes: classeForm.value,
        User: userSession.value,
        Prof: profForm.value,
      })
      .then((response) => {
        showModalForm.value = !showModalForm.value;
        messageToUser.value = "Cours ajouté avec succès";
        showInfoModal.value = !showInfoModal.value;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .then(() => { });
  } catch (e) {
    showModalForm.value = !showModalForm.value;
    messageToUser.value = "Erreur lors de l'ajout du cours";
    showInfoModal.value = !showInfoModal.value;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
  checkPasCours();
}

function checkPasCours($tab = CoursClasse.value.uniqueCoursByDate) {
  var pasCours2 = false;
  var testPasCours = true;
  $tab.forEach((element) => {
    if (checkDate(element.DateTest)) {
      pasCours2 = false;
      testPasCours = false;
    }else if(testPasCours){
      pasCours2 = true;
    }
  });

  return pasCours2;
}


function toggleActiveAnnee(event) {
  const btnClasses = document.querySelectorAll(".btnAnnee");
  btnClasses.forEach((btnClasse) => {
    btnClasse.classList.remove("isActive");
  });
  event.target.classList.add("isActive");
}

function displayUpdateModal(id, salle) {
  showUpdateModalForm.value = !showUpdateModalForm.value;
  currentCoursId.value = id;
  lieuForm.value = salle;
}

async function updateCours() {
  try {
    const cours = await axios
      .post(BASE_URL + "cours/modif/" + currentCoursId.value, {
        Debut: dateCoursForm.value + " " + heureDebutForm.value,
        Fin: dateCoursForm.value + " " + heureFinForm.value,
        Salles: lieuForm.value,
        User: userSession.value,
      })
      .then(() => {
        dateCoursForm.value = "";
        heureDebutForm.value = "";
        heureFinForm.value = "";
        lieuForm.value = "";
        showUpdateModalForm.value = !showUpdateModalForm.value;
        messageToUser.value = "Cours modifié avec succès";
        showInfoModal.value = !showInfoModal.value;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  } catch (e) {
    showUpdateModalForm.value = !showUpdateModalForm.value;
    messageToUser.value = "Erreur lors de la modification du cours";
    showInfoModal.value = !showInfoModal.value;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

function displayDeleteModal(id) {
  showDeleteModalForm.value = !showDeleteModalForm.value;
  currentCoursId.value = id;
}

function deleteCours() {
  axios
    .post(BASE_URL + "cours/delete/" + currentCoursId.value, {
      User: userSession.value,
    })
    .then((res) => {
      //Perform Success Action
      showDeleteModalForm.value = !showDeleteModalForm.value;
      messageToUser.value = "Cours supprimé avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => {
      // error.response.status Check status code
      showDeleteModalForm.value = !showDeleteModalForm.value;
      messageToUser.value = "Cours supprimé avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .finally(() => { });
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
    <div>
      <div class="is-mobile buttons columns is-centered mx-1 my-1">
        <button v-for="classe in Classes" :key="classe" @click="valueHasClicked($event)"
          class="column button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger btnClasse is-size-6-mobile">
          {{ classe.id }}
        </button>
      </div>
    </div>
    <p class="mt-5"><b>Semaine du</b></p>
    <div class="semaineContainer" style="display: flex; align-items: center; justify-content: center">
      <div class="selecteurSemaine" style="display: flex; align-items: center; justify-content: center">
        <div class="mr-4">
          <ArrowPrev :span="viewLundiSemaine" @click="changeSemaine('previous')" />
        </div>
        <p>au</p>
        <div class="ml-4">
          <ArrowNext :span="viewVendrediSemaine" @click="changeSemaine('next')" />
        </div>
      </div>
    </div>
    <div class="charger">Loading...</div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div class="tile is-parent is-vertical">
          <template v-for="day in CoursClasse.uniqueCoursByDate" :key="day.Jour">
            <template v-if="checkDate(day.DateTest)">
              <span style="text-align: left" :class="setClass(day)" class="spanCours">{{
                  day.Date
              }}</span>
              <HR v-if="dateStr == day.Date" :class="setClass(day)" class="spanCours"
                style="background-color: blue; height: 5px">
              </HR>
              <card-cours v-for="cours in day.Cours" :key="cours.id" :data-id="cours.id" :class="cours.matiere_id"
                class="cours" :debut="cours.HeureDebut" :fin="cours.HeureFin" :cours="cours.matiere_id"
                :salle="cours.salle_id">
                <button v-show="role == 'Administration'" class="button is-pulled-right is-white has-background-light"
                  @click="displayDeleteModal(cours.id)">
                  <span class="icon is-small">
                    <i class="fa fa-trash ml-6"></i>
                  </span>
                </button>

                <button v-show="role == 'Administration'" class="button is-pulled-right is-white has-background-light"
                  @click="displayUpdateModal(cours.id, cours.salle_id)">
                  <span class="icon is-small">
                    <i class="fa fa-pencil ml-6"></i>
                  </span>
                </button>
              </card-cours>
            </template>
          </template>
          <div v-if="CoursClasse.uniqueCoursByDate == undefined">
            <h2>Cours en chargement</h2>
          </div>
          <div
            v-else-if="pasCours || checkPasCours()"
          >
            <h2>Plus de cours actuellement</h2>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button v-show="role == 'Administration'" class="button is-right js-modal-trigger" data-target="modal-js-example"
        id="fixedbutton" @click="showModalForm = !showModalForm">
        <span class="icon is-large has-text-danger">
          <i class="fa fa-3x fa-plus-square"></i>
        </span>
      </button>
    </div>
  </div>
  <BaseModalForm :class="{ 'is-active': showModalForm }" @close="showModalForm = false">
    <!-- AJOUT COURS  -->
    <BaseFormModal @submit.prevent="addCours()">
      <h3 class="title">Nouveau cours</h3>
      <div class="field" style="width: 300px">
        <label class="label" for="Années">Années</label>
        <div class="buttons are-small is-mobile is-centered mx-1 my-1">
          <button @click="(selectedAnnee = 1), toggleActiveAnnee($event)"
            class="button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger btnAnnee">
            1ère
          </button>
          <button @click="(selectedAnnee = 2), toggleActiveAnnee($event)"
            class="button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger btnAnnee">
            2ème
          </button>
          <button @click="(selectedAnnee = 3), toggleActiveAnnee($event)"
            class="button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger btnAnnee">
            3ème
          </button>
        </div>
      </div>
      <div class="field" style="width: 300px">
        <label class="label" for="Matières">Matières</label>
        <div class="select">
          <select v-model="matiereForm" required>
            <option value="" disabled selected hidden>Matières</option>
            <option v-for="matiere in MatieresAnnee" v-show="matiere.Annee == selectedAnnee">
              {{ matiere.id }}
            </option>
          </select>
        </div>
      </div>
      <BaseInput>
        <template v-slot:label>Classe(s)</template>
        <template v-slot:input>
          <input v-model="classeForm" class="input" type="texte" placeholder="Exemple : M49-1 M49-2" required />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Date</template>
        <template v-slot:input>
          <input v-model="dateCoursForm" class="input" type="date" placeholder="Entrez une date" required
            :min="todayDate" />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Heure de début</template>
        <template v-slot:input>
          <input v-model="heureDebutForm" class="input" type="time" placeholder="Entrez une heure de début" required />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Heure de fin</template>
        <template v-slot:input>
          <input v-model="heureFinForm" class="input" type="time" placeholder="Entrez une heure de fin" required />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Professeur</template>
        <template v-slot:input>
          <input v-model="profForm" class="input" type="texte" placeholder="Exemple : JHS" required />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Salle(s)</template>
        <template v-slot:input>
          <input v-model="lieuForm" class="input" type="text" placeholder="Exemple: T153 T154" required />
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input type="submit" class="button is-danger is-rounded" value="Ajouter le cours" />
      </BaseInputSubmit>
    </BaseFormModal>
  </BaseModalForm>

  <!-- MODAL FORM UPDATE  -->
  <BaseModalForm :class="{ 'is-active': showUpdateModalForm }" @close="showUpdateModalForm = false">
    <!-- UPDATE COURS  -->
    <BaseFormModal @submit.prevent="updateCours()">
      <h3 class="title">Modification cours</h3>

      <BaseInput>
        <template v-slot:label>Date</template>
        <template v-slot:input>
          <input v-model="dateCoursForm" class="input" type="date" placeholder="Entrez une date" :min="todayDate" />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Heure de début</template>
        <template v-slot:input>
          <input v-model="heureDebutForm" class="input" type="time" placeholder="Entrez une heure de début" />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Heure de fin</template>
        <template v-slot:input>
          <input v-model="heureFinForm" class="input" type="time" placeholder="Entrez une heure de fin" />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Classe(s)</template>
        <template v-slot:input>
          <input v-model="lieuForm" class="input" type="text" placeholder="Entrez la/les classe(s)" />
        </template>
      </BaseInput>
      <BaseInputSubmit>
        <input type="submit" class="button is-danger is-rounded" value="Modifier le cours" />
      </BaseInputSubmit>
    </BaseFormModal>
  </BaseModalForm>

  <!-- MODAL FORM DELETE  -->
  <BaseModalForm :class="{ 'is-active': showDeleteModalForm }" @close="showDeleteModalForm = false">
    <!-- DELETE EVENT  -->
    <BaseFormModal>
      <h3 class="title">Voulez-vous vraiment supprimer le cours ?</h3>
      <span class="columns is-mobile">
        <BaseInputSubmit class="column">
          <input type="submit" class="button is-primary is-rounded" value="Retour"
            @click="showDeleteModalForm = false" />
        </BaseInputSubmit>
        <BaseInputSubmit class="column">
          <input type="submit" class="button is-danger is-rounded" value="Supprimer le cours ?"
            @click="deleteCours()" />
        </BaseInputSubmit>
      </span>
    </BaseFormModal>
  </BaseModalForm>

  <!-- MODAL FORM INFO  -->
  <BaseModalForm :class="{ 'is-active': showInfoModal }" @close="showInfoModal = false">
    <!-- CRUD ACTION  -->
    <BaseFormModal>
      <h3 class="title">{{ messageToUser }}</h3>
    </BaseFormModal>
  </BaseModalForm>
</template>
<style>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 30px;
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
body {
   overflow-x: hidden; 
}
</style>
