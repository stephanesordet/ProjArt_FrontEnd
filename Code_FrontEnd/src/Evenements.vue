<script setup>
import { ref, computed, watchEffect } from "vue";
import CardEvent from "./components/CardEvent.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import axios from "axios";
import { useFetch } from "../composables/fetch.js";

const user = ref(null);
const session = ref(false);
const { data: events } = useFetch("http://127.0.0.1:8000/api/cours/");
console.log(events);
/* 
const tabCours = window.addEventListener("hashchange", () => {
  if (
    window.location.hash == "#agendaClasse" &&
    sessionStorage.getItem("user")
  ) {
    session.value = true;
  } else {
    session.value = false;
  }
});

const userCours = computed(() => {
  const tabCours = [];
  if (!cours.value?.length) {
    return [];
  } else {
    cours.value.forEach((element) => {
      tabCours.push(element);
    });
  }
  return tabCours;
}); */

const showModalForm = ref(false);

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
</script>

<template>
  <div class="main my-4 mx-4">
    <div class="select is-danger">
      <select>
        <option>Tous les cours</option>
        <option>With options</option>
      </select>
    </div>
    <the-card-wrapper>
      <card-event
        :debut="'19:30'"
        :fin="'23:00'"
        :titre="'AGE - Soirée culture G'"
        :lieu="'Bar de la gare'"
      >
      </card-event>
    </the-card-wrapper>
    <button
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

  <!-- MODAL FORM  -->
  <BaseModalForm
    :class="{ 'is-active': showModalForm }"
    @close="showModalForm = false"
  >
    <!-- AJOUT EVENT  -->
    <BaseFormModal @submit.prevent="addEvent()">
      <h1 class="title is-1">Nouveau évènement</h1>

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

      <BaseInput>
        <template v-slot:label>Lieu</template>
        <template v-slot:input>
          <input
            v-model="Lieu"
            class="input"
            type="text"
            placeholder="Entrez la description de l'évènement"
          />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Date de début</template>
        <template v-slot:input>
          <input
            v-model="Debut"
            class="input"
            type="datetime-local"
            placeholder="Entrez une date de début"
          />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Date de fin</template>
        <template v-slot:input>
          <input
            v-model="Fin"
            class="input"
            type="datetime-local"
            placeholder="Entrez une date de fin"
          />
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input
          type="submit"
          class="button is-danger is-rounded"
          value="Ajouter l'événement"
        />
      </BaseInputSubmit>
    </BaseFormModal>
  </BaseModalForm>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>
