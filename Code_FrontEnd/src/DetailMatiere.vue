<script setup>
import { ref, computed, watchEffect } from "vue";
import TheDetailsMatieres from "./components/TheDetailsMatieres.vue";
import TheDetailsMatieresRemarques from "./components/TheDetailsMatieresRemarques.vue";
import { currentCoursId, currentMatiereId } from "../composables/store.js";
import CardEvent from "./components/CardEvent.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import axios from "axios";

let userSession = ref(sessionStorage.getItem("user"));

// ---------------------- Fetch data for this cours -----------------------------
const cours = ref([]);
const remarques = ref([]);

watchEffect(() => {
  fetch("http://127.0.0.1:8000/api/cours/info/" + currentCoursId.value)
    .then((res) => res.json())
    .then((coursResults) => (cours.value = coursResults));

  fetch(
    "http://127.0.0.1:8000/api/remarque/user/" +
      userSession +
      "/" +
      currentMatiereId.value
  )
    .then((res) => res.json())
    .then((remarqueMatiere) => (remarques.value = remarqueMatiere));
});

const allCours = computed(() => {
  const tabCours = [];
  if (!cours.value?.length) {
    return [];
  } else {
    cours.value.forEach((element) => {
      if (tabCours.length < 1) {
        tabCours.push(element);
      }
    });
  }
  return tabCours;
});

const allRemarques = computed(() => {
  const tabRemarques = [];
  if (!remarques.value?.length) {
    return [];
  } else {
    remarques.value.forEach((element) => {
      tabRemarques.push(element);
    });
  }
  return tabRemarques;
});

// ---------------------- Boolean for showing the modal form -----------------------------
let showModalForm = ref(false);

// ---------------------- Traitement form after submit -----------------------------
const Titre = ref("");
const Description = ref("");
const Visibilite = ref("");
const DateRemarque = ref("");

function addRemarqueCours() {
  axios
    .post("http://localhost:8000/api/remarque/create", {
      Titre: Titre.value,
      Description: Description.value,
      Date: DateRemarque.value,
      cours_id: currentCoursId.value,
      user_Email: userSession.value,
      // ---------------------- !!!!!!!!! CHANGER !!!!!!!!! -----------------------------

      Visibilite: Visibilite.value,
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
      //window.location.reload();
    });
}
</script>

<template>
  <TheDetailsMatieres
    v-for="cours in allCours"
    :matiere="cours.matiere_id"
    :prof="cours.FullName"
  >
    <TheDetailsMatieresRemarques
      v-for="remarque in allRemarques"
      :user_Email="remarque.user_Email"
      :DateRemarque="remarque.Date"
      :Description="remarque.Description"
    >
    </TheDetailsMatieresRemarques>
    <div class="column buttons">
      <button class="button is-danger" @click="showModalForm = !showModalForm">
        <span class="icon is-medium has-text-danger-dark">
          <i class="fa fa-solid fa-plus"></i>
        </span>
        <span>Ajouter une remarque</span></button
      ><br /></div
  ></TheDetailsMatieres>

  <!-- MODAL FORM  -->
  <BaseModalForm
    :class="{ 'is-active': showModalForm }"
    @close="showModalForm = false"
  >
    <!-- AJOUT REMARQUE COURS -->
    <BaseFormModal @submit.prevent="addRemarqueCours()">
      <h1 class="title is-1">Nouvelle remarque</h1>

      <div class="field" style="width: 300px">
        <label class="label" for="Remarque">Remarque</label>

        <div class="control">
          <select v-model="Visibilite">
            <option disabled value="">Please select one</option>
            <option value="public">Publique</option>
            <option value="private">Privée</option>
          </select>
        </div>
      </div>

      <BaseInput>
        <template v-slot:label>Date</template>
        <template v-slot:input>
          <input
            v-model="DateRemarque"
            class="input"
            type="date"
            placeholder="Entrez une date de début"
          />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Titre</template>
        <template v-slot:input>
          <input
            v-model="Titre"
            class="input"
            type="text"
            placeholder="Entrez le nom de l'évènement"
          />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Description</template>
        <template v-slot:input>
          <input
            v-model="Description"
            class="input"
            type="text"
            placeholder="Entrez la description de l'évènement"
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

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
