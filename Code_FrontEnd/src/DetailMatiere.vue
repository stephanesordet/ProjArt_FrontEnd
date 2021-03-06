<script setup>
import { ref, computed, watchEffect } from "vue";
import TheDetailsMatieres from "./components/TheDetailsMatieres.vue";
import TheDetailsMatieresRemarques from "./components/TheDetailsMatieresRemarques.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import TheReturnButton from "./components/TheReturnButton.vue";
import {
  BASE_URL,
  idDetailsMatiere,
  matiere_idDetailsMatiere,
  todayDate,
} from "../composables/store.js";
import axios from "axios";
import { changeFormatDateBasic } from "../composables/function.js";

let userSession = ref(sessionStorage.getItem("user"));

// ---------------------- Fetch data for this cours -----------------------------
const cours = ref([]);
const remarques = ref([]);

watchEffect(() => {
  if (idDetailsMatiere.value != null) {
    fetch(BASE_URL + "cours/info/" + idDetailsMatiere.value)
      .then((res) => res.json())
      .then((coursResults) => (cours.value = coursResults));
  }

  fetch(
    BASE_URL +
      "remarque/user/" +
      userSession.value +
      "/" +
      matiere_idDetailsMatiere.value
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
let showInfoModal = ref(false);

// ---------------------- Traitement form after submit -----------------------------
const Titre = ref("");
const Description = ref("");
const Visibilite = ref("");
const DateRemarque = ref("");
const id = ref("");
const messageToUser = ref("");

function addRemarqueCours() {
  axios
    .post(BASE_URL + "remarque/create", {
      Titre: Titre.value,
      Description: Description.value,
      Date: DateRemarque.value,
      cours_id: idDetailsMatiere.value,
      user_Email: userSession.value,
      Visibilite: Visibilite.value,
    })
    .then((res) => {
      showModalForm.value = !showModalForm.value;
      messageToUser.value = "Remarque ajoutée avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => {
      showModalForm.value = !showModalForm.value;
      messageToUser.value = "Remarque ajoutée avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .finally(() => {
      //window.location.reload();
    });
}
</script>
<template>
  <div v-if="userSession">
    <TheReturnButton></TheReturnButton>
    <!--- Vfor insert name cours and prof + vfor insert details of each remarque --->
    <TheDetailsMatieres
      v-for="cours in allCours"
      :matiere="cours.matiere_id"
      :prof="cours.FullName"
    >
      <TheDetailsMatieresRemarques
        v-for="remarque in allRemarques"
        :user_Email="remarque.user_Email"
        :DateRemarque="changeFormatDateBasic(remarque.Date)"
        :Description="remarque.Description"
        :Titre="remarque.Titre"
        :Visibilite="remarque.Visibilite"
        :id="remarque.id"
      >
      </TheDetailsMatieresRemarques>
      <!--- Html for add remarque, with modal that open on click --->
      <div class="column buttons">
        <button
          class="button is-danger"
          @click="showModalForm = !showModalForm"
        >
          <span class="icon is-medium has-text-danger-dark">
            <i class="fa fa-solid fa-plus"></i>
          </span>
          <span>Ajouter une remarque</span></button
        ><br />
      </div>
    </TheDetailsMatieres>
  </div>

  <div v-else>
    <h1>Vous devez être connecté</h1>
  </div>

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

        <div class="select">
          <select v-model="Visibilite" required>
            <option disabled selected hidden value="">
              Choisissez la visibilité
            </option>
            <option value="public">Publique</option>
            <option value="prive">Privée</option>
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
            required
            :min="todayDate"
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
            placeholder="Entrez le nom de la remarque"
            required
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
            placeholder="Entrez une description"
            required
          />
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input
          type="submit"
          class="button is-danger is-rounded"
          value="Ajouter la remarque"
        />
      </BaseInputSubmit>
    </BaseFormModal>
  </BaseModalForm>

  <!-- MODAL FORM INFO  -->
  <BaseModalForm
    :class="{ 'is-active': showInfoModal }"
    @close="showInfoModal = false"
  >
    <!-- CRUD ACTION  -->
    <BaseFormModal>
      <h1 class="title is-2">{{ messageToUser }}</h1>
    </BaseFormModal>
  </BaseModalForm>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

div > select {
  width: 300px;
}

body {
  overflow-x: hidden;
}

.column .buttons {
  margin-bottom: 1rem;
}
</style>
