<script setup>
import { def } from "@vue/shared";
import { computed, ref, watch, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import CardCours from "./components/CardCours.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";

const { data: cours } = useFetch("http://localhost:8000/api/cours");

const { data: classes } = useFetch("http://localhost:8000/api/classes");

const selectedClasses = ref("IM49-1");

const { data: coursClasse } = useFetch(
        "http://127.0.0.1:8000/api/cours/classe/"+selectedClasses.value
      );

const date = new Date();
const dateStr =
  date.getFullYear() + "-" +
  ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
  ("00" + date.getDate()).slice(-2);

const CoursClasse = computed(() => {
  const tabCours = [];
  if (!coursClasse.value?.length) {
    return [];
  } else {
    coursClasse.value.forEach((element) => {
      if (element.Debut > dateStr) {
        tabCours.push(element);
      }
    });
    let duplicates = []
    const tempArray = tabCours.sort()
    for (let i = 0; i < tempArray.length; i++) {
      let j = i + 1;
      if (j >= tempArray.length) break;
      if (tempArray[j].id === tempArray[i].id) {
        duplicates.push(tempArray[i])
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
  alert("fetch");
  return tabCours;
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
  if (!coursClasse.value?.length) {
    return [];
  } else {
    coursClasse.value.forEach((element) => {
      tabMatiere.push(element.matiere_id);
    });
  }
  const uniqueMatiere = new Set(tabMatiere);
  console.log(uniqueMatiere);
  return uniqueMatiere;
});

function afficheForm() {
  console.log(4);
}

let showModalForm = ref(false);

//Traitement du form after submit
const Titre = ref("");
const Description = ref("");
const Lieu = ref("");
const Debut = ref("");
const Fin = ref("");

function addEvent() {
  axios
    .post("http://localhost:8000/api/event/create", {
      Titre: Titre.value,
      Description: Description.value,
      Lieu: Lieu.value,
      Debut: Debut.value,
      Fin: Fin.value,
      user_Email: "lucas.cuennet@heig-vd.ch",
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
      //Perform action in always
    });
}

    function valueHasChanged(event) {
      const cours = document.querySelectorAll('.cours');

      cours.forEach(coursSolo => {
      coursSolo.style.display = 'none';
      });

      const val = event.target.value

      if (val === 'Tous les cours') {
        cours.forEach(coursSolo => {
        coursSolo.style.display = 'block';
        });
      } else {
        const boxes = document.querySelectorAll('.'+val);

        boxes.forEach(box => {
          box.style.display = 'block';
        });
      }
    }

    function valueHasClicked(event) {
      const classe = event.target.innerHTML;
      
      selectedClasses.value = classe;
    }
</script>

<template>
  <div class="main mx-4 my-1">
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button v-for="classe in Classes" :key="classe" @click="valueHasClicked($event)" class="column button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger">
          {{ classe.id }}
        </button>
      </div>
    </div>
    <div class="select is-danger">
      <select @change="valueHasChanged($event)">
        <option>
          Tous les cours
        </option>
        <option v-for="matiere in Matiere" :key="matiere">
          {{ matiere }}
        </option>
      </select>
    </div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div class="tile is-parent is-vertical">
          <card-cours v-for="cours in CoursClasse" :id="cours.id" :class="cours.matiere_id" class="cours" :key="cours.id" :debut="cours.Debut" :fin="cours.Fin"
            :cours="cours.matiere_id" :salle="cours.salle_id">
          </card-cours>
        </div>
      </div>
    </div>
    <div>
      <button class="button is-right js-modal-trigger" data-target="modal-js-example" id="fixedbutton"
        @click="showModalForm = !showModalForm">
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
      ^
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
            <select v-model="classe">
              <option>Classe 1</option>
              <option>Classe 2</option>
            </select>
          </div>
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Matière</template>
        <template v-slot:input>
          <div class="select">
            <select v-model="matiere">
              <option>Matière 1</option>
              <option>Matière 2</option>
            </select>
          </div>
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Heure de début</template>
        <template v-slot:input>
          <input v-model="heureDebut" class="input" type="time" placeholder="Entrez une heure de début" />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Heure de fin</template>
        <template v-slot:input>
          <input v-model="heureFin" class="input" type="time" placeholder="Entrez une heure de fin" />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Lieu</template>
        <template v-slot:input>
          <input v-model="lieu" class="input" type="text" placeholder="Entrez le lieu d'une classe" />
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input type="submit" class="button is-danger is-rounded" value="Ajouter le cours" />
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
</style>
