<script setup>
import { ref, computed, watchEffect } from "vue";
import CardEvent from "./components/CardEvent.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import { currentEventId } from "../composables/store";
import axios from "axios";
import { useFetch } from "../composables/fetch.js";
import { BASE_URL } from "../composables/store";
import { changeFormatDateWithoutHoursMinutes } from "../composables/function.js";

// ---------------------- Fetch data for all events -----------------------------
const { data: events } = useFetch(BASE_URL + "events/");
const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));
const auteur = ref(false);

const allEvents = computed(() => {
  const tabEvents = [];
  if (!events.value?.length) {
    return [];
  } else {
    events.value.forEach((element) => {
      tabEvents.push(element);
    });
  }
  return tabEvents;
});

// ---------------------- Boolean for showing the modal form -----------------------------
const showModalForm = ref(false);
const showUpdateModalForm = ref(false);
const showDeleteModalForm = ref(false);

// ---------------------- Traitement form after submit -----------------------------
const Titre = ref("");
const Description = ref("");
const Lieu = ref("");
const Debut = ref("");
const Fin = ref("");

function addEvent() {
  axios
    .post(BASE_URL + "event/create", {
      Titre: Titre.value,
      Description: Description.value,
      Lieu: Lieu.value,
      Debut: Debut.value,
      Fin: Fin.value,
      // ---------------------- !!!!!!!!! CHANGER !!!!!!!!! -----------------------------
      user_Email: userSession.value,
    })
    .then((res) => {
      //Perform Success Action
      console.log(res);
      window.location.reload();
    })
    .catch((error) => {
      // error.response.status Check status code
      console.log(error);
    })
    .finally(() => {
      //window.location.reload();
    });
}

function displayUpdateModal(id, titre, description, lieu, debut, fin, email) {
  showUpdateModalForm.value = !showUpdateModalForm.value;
  if (email == userSession.value) {
    currentEventId.value = id;
    auteur.value = true;
    Titre.value = titre;
    Description.value = description;
    Lieu.value = lieu;
    Debut.value = debut;
    Fin.value = fin;
  } else {
    auteur.value = false;
  }
}

function updateEvent(user) {
  axios
    .post(BASE_URL + "event/modif/" + currentEventId.value, {
      Titre: Titre.value,
      Description: Description.value,
      Lieu: Lieu.value,
      Debut: Debut.value,
      Fin: Fin.value,
      // ---------------------- !!!!!!!!! CHANGER !!!!!!!!! -----------------------------
      user_Email: userSession.value,
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
    });
}

function displayDeleteModal(id, email) {
  showDeleteModalForm.value = !showDeleteModalForm.value;
  if (email == userSession.value) {
    currentEventId.value = id;
    auteur.value = true;
  } else {
    auteur.value = false;
  }
}

function deleteEvent() {
  axios
    .post(BASE_URL + "event/delete/" + currentEventId.value)
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
    });
}

function voirDetails(id) {
  console.log("detailEvents " + id);
  window.location.hash = "#detailEvent";
  window.location.reload();

  sessionStorage.setItem("idDetailsEvent", id);
  //console.log(sessionStorage.getItem("idDetailsEvent"));
  //sessionStorage.setItem("matiere_idDetailsMatiere", matiere_id);
}
</script>

<template>
  <div class="main my-4 mx-4">
    <div class="select is-danger">
      <select>
        <option>Tous les events</option>
        <option>With options ?</option>
      </select>
    </div>
    <the-card-wrapper>
      <card-event
        v-for="events in allEvents"
        :id="events.id"
        :debut="changeFormatDateWithoutHoursMinutes(events.Debut)"
        :fin="changeFormatDateWithoutHoursMinutes(events.Fin)"
        :titre="events.Titre"
        :lieu="events.Lieu"
        :description="events.Description"
      >
        <button
          class="button is-pulled-right is-white has-background-light"
          @click="voirDetails(events.id)"
        >
          <span class="icon is-small">
            <i class="fa fa-info"></i>
          </span>
        </button>
        <button
          v-show="role == 'Administration' || role == 'AGE'"
          class="button is-pulled-right is-white has-background-light"
          @click="displayDeleteModal(events.id, events.user_Email)"
        >
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
        </button>
        <button
          v-show="role == 'Administration' || role == 'AGE'"
          class="button is-pulled-right is-white has-background-light"
          @click="
            displayUpdateModal(
              events.id,
              events.Titre,
              events.Description,
              events.Lieu,
              events.Debut,
              events.Fin,
              events.user_Email
            )
          "
        >
          <span class="icon is-small">
            <i class="fa fa-pencil"></i>
          </span>
        </button>
      </card-event>
    </the-card-wrapper>
    <button
      v-show="role == 'Administration' || role == 'AGE'"
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

  <!-- MODAL FORM UPDATE -->
  <BaseModalForm
    :class="{ 'is-active': showUpdateModalForm }"
    @close="showUpdateModalForm = false"
  >
    <!-- UPDATE EVENT  -->
    <BaseFormModal v-if="auteur" @submit="updateEvent()">
      <h1 class="title is-1">Modifier évènement</h1>

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
          value="Modifier l'événement"
        />
      </BaseInputSubmit>
    </BaseFormModal>

    <BaseFormModal v-else>
      <h1 class="title is-1">Vous ne pouvez pas modifier cet évènement</h1>

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
          value="Modifier l'événement"
        />
      </BaseInputSubmit>
    </BaseFormModal>

    <!-- UPDATE EVENT  -->
    <BaseFormModal v-else>
      <h1 class="title is-2">Vous ne pouvez pas modifier cet évènement</h1>

      <BaseInputSubmit>
        <input
          type="submit"
          class="button is-primary is-rounded"
          value="Retour"
          @click="showUpdateModalForm = false"
        />
      </BaseInputSubmit>
    </BaseFormModal>
  </BaseModalForm>

  <!-- MODAL FORM DELETE -->
  <BaseModalForm
    :class="{ 'is-active': showDeleteModalForm }"
    @close="showDeleteModalForm = false"
  >
    <!-- DELETE EVENT  -->
    <BaseFormModal v-if="auteur">
      <h1 class="title is-2">Voulez-vous vraiment supprimer l'évènement ?</h1>
      <BaseInputSubmit>
        <input
          type="submit"
          class="button is-danger is-rounded"
          value="Supprimer l'événement"
          @click="deleteEvent()"
        />
      </BaseInputSubmit>
      <BaseInputSubmit>
        <input
          type="submit"
          class="button is-primary is-rounded"
          value="Retour"
          @click="showDeleteModalForm = false"
        />
      </BaseInputSubmit>
    </BaseFormModal>
    <BaseFormModal v-else>
      <h1 class="title is-2">Vous ne pouvez pas supprimer l'évènement</h1>
      <BaseInputSubmit>
        <input
          type="submit"
          class="button is-primary is-rounded"
          value="Retour"
          @click="showDeleteModalForm = false"
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
