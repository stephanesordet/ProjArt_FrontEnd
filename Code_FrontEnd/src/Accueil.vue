<script setup>
import { def } from "@vue/shared";
import axios from "axios";
import { computed, ref, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import CardCours from "./components/CardCours.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import Switch from "./components/Switch.vue";
import randomColor from 'randomcolor';
import { BASE_URL } from "../composables/store";
import { currentCoursId } from "../composables/store";
import TheLoader from "./components/TheLoader.vue";

const { data: classes } = useFetch(BASE_URL + "classes");
const selectedClasses = ref("M49-1");
const historique = ref(false);
const classeCours = ref([]);
watchEffect(() => {
  fetch(BASE_URL + "cours/classe/" + selectedClasses.value)
    .then((res) => res.json())
    .then((coursClasse) => (classeCours.value = coursClasse));
});
const role = ref(sessionStorage.getItem("role"));
const date = new Date();
const dateStrTest = formatDateView(date);
const dateStr =
  date.getFullYear() +
  "-" +
  ("00" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  ("00" + date.getDate()).slice(-2);

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join('/');
}

function formatDateView(date) {
  const month = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
  let monthDate = month[date.getMonth()];
  let dates = date.getDate() + " " + monthDate + " " + date.getFullYear();
  return dates;
}
const CoursClasse = computed(() => {
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
const Classes = computed(() => {
  const tabClasse = [];
  if (!classes.value?.length) {
    return [];
  } else {
    classes.value.forEach((element) => {
      tabClasse.push(element);
    });
  }
  return tabClasse;
});
const Matiere = computed(() => {
  const tabMatiere = [];
  const tabMatiereHistorique = [];
  const uniqueMatiereColor = new Set();
  if (!classeCours.value?.length) {
    return [];
  } else {
    classeCours.value.forEach((element) => {
      uniqueMatiereColor.add(element.matiere_id);
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

let showModalForm = ref(false);
let showDeleteModalForm = ref(false);
let showUpdateModalForm = ref(false);

//Traitement du form after submit
const dateCoursForm = ref("");
const selectedclasseForm = ref("");
const heureDebutForm = ref("");
const heureFinForm = ref("");
const matiereForm = ref("");
const lieuForm = ref("");



async function addCours() {
  try {
    const cours = await axios
      .post("cours/create", {
        Debut: dateCoursForm.value + " " + heureDebutForm.value,
        Fin: dateCoursForm.value + " " + heureFinForm.value,
        matiere_id: matiereForm.value,
      })
      .then(() => {
        window.location.reload();
      });
    console.log(cours);
  } catch (e) {
    console.log(e);
  }
}
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
  event.target.classList.add('isActive');
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

function hideLoader(){
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
  const str1 = Array.from(uniqueClass).join(' ');
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

function displayDeleteModal(id) {
  showDeleteModalForm.value = !showDeleteModalForm.value;
  currentCoursId.value = id;
  console.log(id)

}

function displayUpdateModal(id, start, end, salle) {
  showUpdateModalForm.value = !showUpdateModalForm.value;
  selectedclasseForm.value = selectedClasses.value;
  heureDebutForm.value = start;
  console.log(heureDebutForm.value)

  lieuForm.value = salle
}

function deleteCours() {
  axios
    .post("cours/delete/" + currentCoursId.value)
    .then((res) => {
      //Perform Success Action
    })
    .catch((error) => {
      // error.response.status Check status code
      console.log(error);
    })
    .finally(() => {
      //window.location.reload();
    });
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
      couleurMatiereOb.color = randomColor({ seed: i });;
      matiereColor.push(couleurMatiereOb);
      i++;
    });
    console.log(matiereColor);
    matiereColor.forEach((element) => {
      document.head.insertAdjacentHTML("beforeend", '<style>.' + element.id + '{border-color:' + element.color + ' !important}</style>');
    });
  });

  window.onload = function loader() {
    document.querySelector(".loading-box").style.display = "flex";
    setTimeout(showPage, 1000);
  }
  function showPage() {
  document.querySelector(".loading-box").style.display = "none";
}
</script>
<template>
<TheLoader></TheLoader>
  <div class="main mx-4 my-1 contenu">
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button v-for="classe in Classes" :key="classe" @click="valueHasClicked($event)"
          class="column button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger btnClasse">
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
    <div class="charger">Loading...</div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div class="tile is-parent is-vertical">
          <template v-if="historique">
            <template v-for="day in CoursClasse.uniqueCoursHistoriqueByDate" :key="day.Jour">
              <span style="text-align:left;" :class="setClass(day)" class="spanCours">{{ day.Date }}</span>
              <card-cours v-for="cours in day.Cours" :key="cours.id" :data-id="cours.id" :class="cours.matiere_id"
                class="cours" :debut="cours.HeureDebut" :fin="cours.HeureFin" :cours="cours.matiere_id"
                :salle="cours.salle_id">
                <button v-show="role == 'Administration'" class="button is-pulled-right is-white has-background-light"
                  @click="displayDeleteModal(cours.id)">
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>

                <button v-show="role == 'Administration'" class="button is-pulled-right is-white has-background-light"
                  @click="
                    displayUpdateModal(
                      cours.id,
                      cours.HeureDebut,
                      cours.HeureFin,
                      cours.salle_id
                    )
                  ">
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
              </card-cours>
            </template>
          </template>
          <template v-for="day in CoursClasse.uniqueCoursByDate" :key="day.Jour">
            <span style="text-align:left;" :class="setClass(day)" class="spanCours">{{ day.Date }}</span>
            <HR v-if="(dateStrTest == day.Date) && historique" :class="setClass(day)" class="spanCours"
              style="background-color: blue; height:5px;">
            </HR>
            <card-cours v-for="cours in day.Cours" :key="cours.id" :data-id="cours.id" :class="cours.matiere_id"
              class="cours" :debut="cours.HeureDebut" :fin="cours.HeureFin" :cours="cours.matiere_id"
              :salle="cours.salle_id">
              <button v-show="role == 'Administration'" class="button is-pulled-right is-white has-background-light"
                @click="displayDeleteModal(cours.id)">
                <span class="icon is-small">
                  <i class="fa fa-trash"></i>
                </span>
              </button>

              <button v-show="role == 'Administration'" class="button is-pulled-right is-white has-background-light"
                @click="
                  displayUpdateModal(
                    cours.id,
                    cours.HeureDebut,
                    cours.HeureFin,
                    cours.salle_id
                  )
                ">
                <span class="icon is-small">
                  <i class="fa fa-pencil"></i>
                </span>
              </button>

            </card-cours>
          </template>
          <div v-if="(CoursClasse.uniqueCoursByDate == undefined)">
            <h2>Cours en chargement</h2>
          </div>
          <div v-else-if="(CoursClasse.uniqueCoursByDate.size == 0) && (!historique)">
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
  <!-- MODAL FORM  -->
  <BaseModalForm :class="{ 'is-active': showModalForm }" @close="showModalForm = false">
    <!-- AJOUT COURS  -->
    <BaseFormModal @submit.prevent="addCours()">
      <h1 class="title is-1">Nouveau cours</h1>
      <BaseInput>
        <template v-slot:label>Date</template>
        <template v-slot:input>
          <input v-model="dateCoursForm" class="input" type="date" placeholder="Entrez une date" />
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
        <template v-slot:label>Lieu</template>
        <template v-slot:input>
          <input v-model="lieuForm" class="input" type="text" placeholder="Entrez le lieu d'une classe" />
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
      <h1 class="title is-1">Modification cours</h1>

      <BaseInput>
        <template v-slot:label>Date</template>
        <template v-slot:input>
          <input v-model="dateCoursForm" class="input" type="date" placeholder="Entrez une date" />
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
        <template v-slot:label>Lieu</template>
        <template v-slot:input>
          <input v-model="lieuForm" class="input" type="text" placeholder="Entrez le lieu d'une classe" />
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
      <h1 class="title is-2">Voulez-vous vraiment supprimer le cours ?</h1>
      <BaseInputSubmit>
        <input type="submit" class="button is-danger is-rounded" value="Supprimer le cours ?" @click="deleteCours()" />
      </BaseInputSubmit>
      <BaseInputSubmit>
        <input type="submit" class="button is-primary is-rounded" value="Retour" @click="showDeleteModalForm = false" />
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
  content: '';
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

button.isActive{
  background-color: #f14668 !important;
  color: #ffffff !important;
}

</style>