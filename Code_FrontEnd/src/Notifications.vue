<script setup>
import { ref, computed, watchEffect } from "vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import CardNotif from "./components/CardNotif.vue";
import { useFetch } from "../composables/fetch";
import TheBreadCrums from "./components/TheBreadcrums.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import { BASE_URL } from "../composables/store";
import { changeFormatDate } from "../composables/function.js";
import randomColor from 'randomcolor';
import axios from "axios";

const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));
const notifications = ref([]);
const newNotifs = ref("")

window.addEventListener("hashchange", () => {
  userSession.value = sessionStorage.getItem("user");
  role.value = sessionStorage.getItem("role");
  if (window.location.hash == "#notifications" && newNotifs.value != "") {
    updateNotifs();
    window.addEventListener('hashchange', () => {
      if (window.location.hash != "#notifications") {
        fetch(BASE_URL + "notifications/" + userSession.value)
          .then((res) => res.json())
          .then((notifResults) => (notifications.value = notifResults));
      }
    });
  }
});

watchEffect(() => {
  if (userSession.value != null) {
    fetch(BASE_URL + "notifications/" + userSession.value)
      .then((res) => res.json())
      .then((notifResults) => (notifications.value = notifResults));
  }
});

setInterval(() => {
  if (userSession.value != null) {
    fetch(BASE_URL + "notifications/" + userSession.value)
      .then((res) => res.json())
      .then((notifResults) => (notifications.value = notifResults));
  }
}, 60000);


const allNotifications = computed(() => {
  const tabNotifications = [];

  if (!notifications.value?.length) {
    return [];
  } else {
    notifications.value.forEach((element) => {
      tabNotifications.push(element);
      if (element.status == false && !newNotifs.value.includes(element.notification.id)) {
        newNotifs.value += "," + element.notification.id;
      }
    });
  }

  return tabNotifications.reverse();
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
      i += 7;
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

function updateNotifs() {
  axios
    .post(BASE_URL + "notifications/read/", {
      User: userSession.value,
      Notifications: newNotifs.value.substring(1)
      // ---------------------- !!!!!!!!! CHANGER !!!!!!!!! -----------------------------
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

    });

  newNotifs.value = "";
}
watchEffect(() => {
  console.log(newNotifs.value)
})

setInterval(() => {
  console.log(newNotifs.value)
}, 5000)

</script>

<template>
  <the-card-wrapper>
    <card-notif v-for="response in allNotifications" :user="role" :object="response.notification.Objet"
      :envoiHeure="changeFormatDate(response.notification.EnvoiHeureDate)" :message="response.notification.Message"
      :class="response.roles">
      <span v-if="response.status == false" class="icon">
        <i class="fa fa-solid fa-circle fa-lg"></i>
      </span>
    </card-notif>
  </the-card-wrapper>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}

.icon {
  color: #ff3860;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
