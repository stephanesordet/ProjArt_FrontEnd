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

const { data: matieres } = useFetch("http://localhost:8000/api/matiere");

const { data: coursClasse } = useFetch(
  "http://127.0.0.1:8000/api/cours/classe/"
);

const Classes = computed(() => {
  const tabClasses = [];
  if (!classes.value?.length) {
    return [];
  } else {
    classes.value.forEach((element) => {
      tabClasses.push(element);
    });
  }
  return tabClasses;
});

const CoursClasse = computed(() => {
  const tabCours = [];
  if (!coursClasse.value?.length) {
    return [];
  } else {
    coursClasse.value.forEach((element) => {
      tabCours.push(element);
    });
  }
  return tabCours;
});
let selectedClasse = ref("IM48");
let selectedMatiere = ref("Tous les cours");
let Matieres = ref([]);

function afficheForm() {
  console.log(4);
}

let showModalForm = ref(false);
</script>

<template>
  <div class="main mx-4 my-1">
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button v-for="classe in Classes" :key="classe" class=" column button has-background-light has-text-black
          is-medium is-one-fifth-mobile is-danger">
          {{ classe.id }}
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
