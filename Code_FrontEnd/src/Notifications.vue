<script setup>
import { ref, computed, watchEffect } from "vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import CardNotif from "./components/CardNotif.vue";
import { useFetch } from "../composables/fetch";
import TheBreadCrums from "./components/TheBreadcrums.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import { BASE_URL } from "../composables/store";
import { changeFormatDate } from "../composables/function.js";
import randomColor from 'randomcolor';

const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));
const notifications = ref([]);

window.addEventListener("hashchange", () => {
  userSession.value = sessionStorage.getItem("user");
  role.value = sessionStorage.getItem("role");
});

watchEffect(() => {
  if (userSession.value != null) {
    fetch(BASE_URL + "notifications/" + userSession.value)
      .then((res) => res.json())
      .then((notifResults) => (notifications.value = notifResults));
  }
});

/* setInterval(function () {
  fetch(BASE_URL + "notifications/" + userSession.value)
    .then((res) => res.json())
    .then((notifResults) => (notifications.value = notifResults));
}, 2000000); */

const notifCount = 5;

const allNotifications = computed(() => {
  const tabNotifications = [];

  if (!notifications.value?.length) {
    return [];
  } else {
    notifications.value.forEach((element) => {
      tabNotifications.push(element);
    });
    if (tabNotifications.length != notifCount) {
      console.log(tabNotifications.length);
    } else {
      console.log("no new notif");
    }
  }
  return tabNotifications;
});

// ---------------------- Boolean for showing the modal form -----------------------------
let showModalForm = ref(false);

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
      i+=7;
    });
    console.log(matiereColor);
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
</script>

<template>
  <the-card-wrapper>
    <card-notif
      v-for="response in allNotifications"
      :user="role"
      :object="response.notification.Objet"
      :envoiHeure="changeFormatDate(response.notification.EnvoiHeureDate)"
      :message="response.notification.Message"
      :class="response.roles"
    >
    </card-notif>
  </the-card-wrapper>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>
