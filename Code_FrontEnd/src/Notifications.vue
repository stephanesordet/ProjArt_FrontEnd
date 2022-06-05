<script setup>
import { ref } from "vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import CardNotif from "./components/CardNotif.vue";
import { useFetch } from "../composables/fetch";
//import TheReturnButton from "./components/TheReturnButton.vue";
import TheBreadCrums from "./components/TheBreadcrums.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";

/* const { data: notif } = useFetch(
  ""
); */
let showModalForm = ref(false);
</script>

<template>
  <!--   <the-card-notif v-for="notif in notifs" :key="notif.id" :user="notif.user" :object="notif.object" :message="notif.message" :envoiHeureDate="notif.envoiHeureDate"></the-card-notif>
 -->
  <the-card-wrapper>
    <card-notif
      :user="'AGE'"
      :object="'Soirée CultureG'"
      :envoiHeure="'13:05'"
      :message="'Venez nombreux !'"
    >
    </card-notif>
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
      <!--     <link
      href="~bulma-calendar/dist/css/bulma-calendar.min.css"
      rel="stylesheet"
    /> -->
      <h1 class="title is-1">Nouvelle notification</h1>

      <BaseInput>
        <template v-slot:label>Titre</template>
        <template v-slot:input>
          <input
            v-model="eventTitle"
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
            v-model="eventDescription"
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
