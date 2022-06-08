<script setup>
import { ref, computed } from "vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import CardNotif from "./components/CardNotif.vue";
import { useFetch } from "../composables/fetch";
import TheBreadCrums from "./components/TheBreadcrums.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";

/* console.log(sessionStorage.getItem("user"));
// ---------------------- Fetch data for all events -----------------------------
// ---------------------- !!!!!!!!! CHANGER !!!!!!!!! -----------------------------
const { data: notifications } = useFetch(
  "http://127.0.0.1:8000/api/notifications/lucas.cuennet@heig-vd.ch" //+ sessionStorage.getItem("user")
);
console.log(notifications);

const allNotifications = computed(() => {
  const tabNotifications = [];
  if (!notifications.value?.length) {
    return [];
  } else {
    notifications.value.forEach((element) => {
      tabNotifications.push(element);
    });
  }
  return tabNotifications;
}); */

// ---------------------- Boolean for showing the modal form -----------------------------
let showModalForm = ref(false);
</script>

<template>
  <the-card-wrapper>
    <!--     <card-notif
      v-for="response in allNotifications"
      :user="'AGE'"
      :object="response.notification.Objet"
      :envoiHeure="response.notification.EnvoiHeureDate"
      :message="response.notification.Message"
    >
    </card-notif> -->
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
  <!-- MODAL FORM  -->
  <BaseModalForm
    :class="{ 'is-active': showModalForm }"
    @close="showModalForm = false"
  >
    <!-- AJOUT NOTIFICATION  -->
    <BaseFormModal @submit.prevent="addNotification()">
      <h1 class="title is-1">Nouvelle notification</h1>

      <BaseInput>
        <template v-slot:label>Titre</template>
        <template v-slot:input>
          <input
            v-model="Objet"
            class="input"
            type="text"
            placeholder="Entrez le nom de l'évènement"
          />
        </template>
      </BaseInput>

      <BaseInput>
        <template v-slot:label>Message</template>
        <template v-slot:input>
          <input
            v-model="Message"
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
      </BaseInputSubmit> </BaseFormModal
  ></BaseModalForm>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>
