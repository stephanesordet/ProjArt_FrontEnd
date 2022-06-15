<script setup>
import { ref, computed, watchEffect, nextTick } from "vue";
import CardEvent from "./components/CardEvent.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import { currentEventId } from "../composables/store";
import axios from "axios";
import { useFetch } from "../composables/fetch.js";
import { BASE_URL, idDetailsEvent, todayDate } from "../composables/store.js";
import { changeFormatDateWithoutHoursMinutes } from "../composables/function.js";
import randomColor from "randomcolor";

// ---------------------- Fetch data for all events -----------------------------
const { data: events } = useFetch(BASE_URL + "events/");
const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));
const auteur = ref(false);

const date = new Date();
const dateStr =
  date.getFullYear() +
  "-" +
  ("00" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  ("00" + date.getDate()).slice(-2);

const allEvents = computed(() => {
  const tabEvents = [];
  if (!events.value?.length) {
    return [];
  } else {
    events.value.forEach((element) => {
      if (element.Debut >= dateStr) {
        tabEvents.push(element);
      }
    });
  }
  return tabEvents;
});

// ---------------------- Boolean for showing the modal form -----------------------------
const showModalForm = ref(false);
const showUpdateModalForm = ref(false);
const showDeleteModalForm = ref(false);
const showInfoModal = ref(false);

// ---------------------- Traitement form after submit -----------------------------
const Titre = ref("");
const Description = ref("");
const Lieu = ref("");
const Debut = ref("");
const Fin = ref("");
const messageToUser = ref("");

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
      showModalForm.value = !showModalForm.value;
      messageToUser.value = "L'événement a été créé avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => {
      // error.response.status Check status code
      showModalForm.value = !showModalForm.value;
      messageToUser.value = "Erreur lors de la création de l'événement";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .finally(() => { });
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
      showUpdateModalForm.value = !showUpdateModalForm.value;
      messageToUser.value = "L'événement a été modifié avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => {
      // error.response.status Check status code
      showUpdateModalForm.value = !showUpdateModalForm.value;
      messageToUser.value = "Erreur lors de la modification de l'événement";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .finally(() => { });
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
      showDeleteModalForm.value = !showDeleteModalForm.value;
      messageToUser.value = "L'événement a été supprimé avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => {
      // error.response.status Check status code
      messageToUser.value = "L'événement a été supprimé avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .finally(() => { });
}

async function voirDetails(id) {
  sessionStorage.setItem("idDetailsEvent", id);
  idDetailsEvent.value = id;
  await nextTick();
  window.location.hash = "#detailEvent";
}

fetch(BASE_URL + "role")
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
      i += 7;
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

function addEventModal() {
  Titre.value = "";
  Description.value = "";
  Lieu.value = "";
  Debut.value = "";
  Fin.value = "";
  showModalForm.value = !showModalForm.value;
}
</script>

<template>
  <div class="main my-4 mx-4">
    <the-card-wrapper>
      <template v-if="role == 'Administration' || role == 'AGE'">
        <card-event v-for="events in allEvents" :id="events.id"
          :debut="changeFormatDateWithoutHoursMinutes(events.Debut)"
          :fin="changeFormatDateWithoutHoursMinutes(events.Fin)" :titre="events.Titre" :lieu="events.Lieu"
          :description="events.Description" :class="events.role_id">
          <button class="button btnAdmin is-pulled-right is-white has-background-light" @click="voirDetails(events.id)">
            <span class="icon is-small">
              <i class="fa fa-info"></i>
            </span>
          </button>
          <button v-show="role == 'Administration' || role == 'AGE'"
            class="button is-pulled-right is-white has-background-light"
            @click="displayDeleteModal(events.id, events.user_Email)">
            <span class="icon is-small">
              <i class="fa fa-trash"></i>
            </span>
          </button>
          <button v-show="role == 'Administration' || role == 'AGE'"
            class="button btnAdmin is-pulled-right is-white has-background-light" @click="
              displayUpdateModal(
                events.id,
                events.Titre,
                events.Description,
                events.Lieu,
                events.Debut,
                events.Fin,
                events.user_Email
              )
            ">
            <span class="icon is-small">
              <i class="fa fa-pencil"></i>
            </span>
          </button>
        </card-event>
      </template>
      <template v-else>
        <card-event v-for="events in allEvents" :id="events.id"
          :debut="changeFormatDateWithoutHoursMinutes(events.Debut)"
          :fin="changeFormatDateWithoutHoursMinutes(events.Fin)" :titre="events.Titre" :lieu="events.Lieu"
          :description="events.Description" :class="events.role_id" @click="voirDetails(events.id)"
          style="cursor: pointer">
          <button class="button btnAdmin is-pulled-right is-white has-background-light" @click="voirDetails(events.id)">
            <span class="icon is-small">
              <i class="fa fa-info"></i>
            </span>
          </button>
          <button v-show="role == 'Administration' || role == 'AGE'"
            class="button btnAdmin is-pulled-right is-white has-background-light"
            @click="displayDeleteModal(events.id, events.user_Email)">
            <span class="icon is-small">
              <i class="fa fa-trash"></i>
            </span>
          </button>
          <button v-show="role == 'Administration' || role == 'AGE'"
            class="button btnAdmin is-pulled-right is-white has-background-light" @click="
              displayUpdateModal(
                events.id,
                events.Titre,
                events.Description,
                events.Lieu,
                events.Debut,
                events.Fin,
                events.user_Email
              )
            ">
            <span class="icon is-small">
              <i class="fa fa-pencil"></i>
            </span>
          </button>
        </card-event>
      </template>
    </the-card-wrapper>
    <button v-show="role == 'Administration' || role == 'AGE'" class="button is-right js-modal-trigger"
      data-target="modal-js-example" id="fixedbutton" @click="addEventModal()">
      <span class="icon is-large has-text-danger">
        <i class="fa fa-3x fa-plus-square"></i>
      </span>
    </button>
  </div>

  <!-- MODAL FORM  -->
  <BaseModalForm :class="{ 'is-active': showModalForm }" @close="showModalForm = false">
    <!-- AJOUT EVENT  -->
    <BaseFormModal @submit.prevent="addEvent()">
      <h3 class="title">Nouvel évènement</h3>

      <BaseInput>
        <template v-slot:label>Titre</template>
        <template v-slot:input>
          <input v-model="Titre" class="input" type="text" placeholder="Entrez le nom de l'évènement" required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Description</template>
        <template v-slot:input>
          <input v-model="Description" class="input" type="text" placeholder="Entrez la description de l'évènement"
            required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Lieu</template>
        <template v-slot:input>
          <input v-model="Lieu" class="input" type="text" placeholder="Entrez la description de l'évènement" required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Date de début</template>
        <template v-slot:input>
          <input v-model="Debut" class="input" type="date" placeholder="Entrez une date de début" required
            :min="todayDate" />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Date de fin</template>
        <template v-slot:input>
          <input v-model="Fin" class="input" type="date" placeholder="Entrez une date de fin" required
            :min="todayDate" />
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input type="submit" class="button is-danger is-rounded" value="Ajouter l'événement" />
      </BaseInputSubmit>
    </BaseFormModal>
  </BaseModalForm>

  <!-- MODAL FORM UPDATE -->
  <BaseModalForm :class="{ 'is-active': showUpdateModalForm }" @close="showUpdateModalForm = false">
    <!-- UPDATE EVENT  -->
    <BaseFormModal v-if="auteur" @submit.prevent="updateEvent()">
      <h3 class="title">Modifier évènement</h3>

      <BaseInput>
        <template v-slot:label>Titre</template>
        <template v-slot:input>
          <input v-model="Titre" class="input" type="text" placeholder="Entrez le nom de l'évènement" required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Description</template>
        <template v-slot:input>
          <input v-model="Description" class="input" type="text" placeholder="Entrez la description de l'évènement"
            required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Lieu</template>
        <template v-slot:input>
          <input v-model="Lieu" class="input" type="text" placeholder="Entrez la description de l'évènement" required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Date de début</template>
        <template v-slot:input>
          <input v-model="Debut" class="input" type="date" placeholder="Entrez une date de début" required
            :min="todayDate" />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Date de fin</template>
        <template v-slot:input>
          <input v-model="Fin" class="input" type="date" placeholder="Entrez une date de fin" required
            :min="todayDate" />
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input type="submit" class="button is-danger is-rounded" value="Modifier l'événement" />
      </BaseInputSubmit>
    </BaseFormModal>

    <BaseFormModal v-else>
      <h3 class="title">Vous ne pouvez pas modifier cet évènement</h3>

      <BaseInput>
        <template v-slot:label>Titre</template>
        <template v-slot:input>
          <input v-model="Titre" class="input" type="text" placeholder="Entrez le nom de l'évènement" required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Description</template>
        <template v-slot:input>
          <input v-model="Description" class="input" type="text" placeholder="Entrez la description de l'évènement"
            required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Lieu</template>
        <template v-slot:input>
          <input v-model="Lieu" class="input" type="text" placeholder="Entrez la description de l'évènement" required />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Date de début</template>
        <template v-slot:input>
          <input v-model="Debut" class="input" type="date" placeholder="Entrez une date de début" required
            :min="todayDate" />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Date de fin</template>
        <template v-slot:input>
          <input v-model="Fin" class="input" type="date" placeholder="Entrez une date de fin" required
            :min="todayDate" />
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input type="submit" class="button is-danger is-rounded" value="Modifier l'événement" />
      </BaseInputSubmit>
    </BaseFormModal>

    <!-- UPDATE EVENT  -->
    <BaseFormModal v-else>
      <h3 class="title">Vous ne pouvez pas modifier cet évènement</h3>

      <BaseInputSubmit>
        <input type="submit" class="button is-primary is-rounded" value="Retour" @click="showUpdateModalForm = false" />
      </BaseInputSubmit>
    </BaseFormModal>
  </BaseModalForm>

  <!-- MODAL FORM DELETE -->
  <BaseModalForm :class="{ 'is-active': showDeleteModalForm }" @close="showDeleteModalForm = false">
    <!-- DELETE EVENT  -->
    <BaseFormModal v-if="auteur">
      <h3 class="title">Voulez-vous vraiment supprimer l'évènement ?</h3>
      <BaseInputSubmit>
        <input type="submit" class="button is-danger is-rounded" value="Supprimer l'événement" @click="deleteEvent()" />
      </BaseInputSubmit>
      <BaseInputSubmit>
        <input type="submit" class="button is-primary is-rounded" value="Retour" @click="showDeleteModalForm = false" />
      </BaseInputSubmit>
    </BaseFormModal>
    <BaseFormModal v-else>
      <h3 class="title">Vous ne pouvez pas supprimer l'évènement</h3>
      <BaseInputSubmit>
        <input type="submit" class="button is-primary is-rounded" value="Retour" @click="showDeleteModalForm = false" />
      </BaseInputSubmit>
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

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 30px;
}
</style>
