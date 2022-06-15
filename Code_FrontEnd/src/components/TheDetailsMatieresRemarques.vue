<script setup>
import { ref } from "vue";
import axios from "axios";
import { BASE_URL } from "../../composables/store.js";
import BaseFormModal from "./BaseFormModal.vue";
import BaseModalForm from "./BaseModalForm.vue";

const user = ref(sessionStorage.getItem("user"));
let userValue = user.value;
const messageToUser = ref("");
let showInfoModal = ref(false);

defineProps({
  user_Email: {},
  Titre: {},
  Description: {},
  DateRemarque: {},
  Visibilite: {},
  id: {},
});

function deleteRemarque(id) {
  axios
    .post(BASE_URL + "remarque/delete/" + id)
    .then((res) => {
      //Perform Success Action
      console.log(res);
      messageToUser.value = "Remarque supprimée avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => {
      // error.response.status Check status code
      console.log(error);
      messageToUser.value = "Remarque supprimée avec succès";
      showInfoModal.value = !showInfoModal.value;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .finally(() => {});
}
</script>

<template>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div class="column">
    <div class="icon-text">
      <span class="icon is-small">
        <i class="fa fa-circle fa-solid has-text-info"></i>
      </span>
      <span class="has-text-info">{{ user_Email }} </span>

      <span v-if="Visibilite == 'public'">
        <span id="eye" class="icon is-medium">
          <i class="fa fa-eye"></i>
        </span>
        <span>Publique</span>
      </span>

      <span v-else>
        <span id="eye" class="icon is-medium">
          <i class="fa fa-eye-slash"></i>
        </span>
        <span>Privée</span>
      </span>

      <button
        v-show="user_Email == userValue"
        class="button is-pulled-right is-white has-background-light"
        @click="deleteRemarque(id)"
      >
        <span class="icon is-small">
          <i class="fa fa-trash"></i>
        </span>
      </button>
    </div>
    <p>
      <span
        >Pour la date du :
        {{ DateRemarque }}
      </span>
    </p>
    <p>
      <strong>{{ Titre }} : </strong><span>{{ Description }}</span>
    </p>
  </div>
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
.icon-text {
  display: block;
  text-align: left;
}

div .column {
  margin-bottom: 1rem;
}

div .column > p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

#eye {
  margin-left: 1rem;
}
</style>
