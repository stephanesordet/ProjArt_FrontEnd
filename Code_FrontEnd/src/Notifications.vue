<script setup>
import { ref, computed, watchEffect } from "vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import CardNotif from "./components/CardNotif.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import { BASE_URL } from "../composables/store.js";
import { changeFormatDate } from "../composables/function.js";
import randomColor from "randomcolor";
import axios from "axios";

const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));
const notifications = ref([]);
const newNotifs = ref("");

//when on the notifications page, the not readed notifications are send to the server to be mark as readed
window.addEventListener("hashchange", () => {
  userSession.value = sessionStorage.getItem("user");
  role.value = sessionStorage.getItem("role");
  if (window.location.hash == "#notifications" && newNotifs.value != "") {
    updateNotifs();
    newNotifs.value = "";
  }
});


window.addEventListener("hashchange", () => {
  if (newNotifs.value != "") {
    if (window.location.hash != "#notifications") {
      fetch(BASE_URL + "notifications/" + userSession.value)
        .then((res) => res.json())
        .then((notifResults) => (notifications.value = notifResults));
    }
  }
});

//fetch the notifications of the user when logged in
watchEffect(() => {
  if (userSession.value != null) {
    fetch(BASE_URL + "notifications/" + userSession.value)
      .then((res) => res.json())
      .then((notifResults) => (notifications.value = notifResults));
  }
});

//interval to update the notifications every 60 seconds
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
      element.roles = element.roles + "";
      tabNotifications.push(element);
      if (
        element.status == false &&
        !newNotifs.value.includes(element.notification.id)//if the notification is not readed and not already in the newNotifs
      ) {
        newNotifs.value += "," + element.notification.id;//add the notification id to the newNotifs string
      }
    });
    return tabNotifications;
  }
});

// changing the color of the notification
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

//update the notifications status to readed
function updateNotifs() {
  axios
    .post(BASE_URL + "read/notifications", {
      User: userSession.value,
      Notifications: newNotifs.value.substring(1),//the id of the string will be readed
      // ---------------------- !!!!!!!!! CHANGER !!!!!!!!! -----------------------------
    })
    .then((res) => {
      //Perform Success Action
      newNotifs.value = "";
    })
    .catch((error) => {
      // error.response.status Check status code
      newNotifs.value = "";
    })
    .finally(() => {
      newNotifs.value = "";
    });

  newNotifs.value = "";
}

// ---------------------- Boolean for showing the modal form -----------------------------
let showModalForm = ref(false);
let showInfoModal = ref(false);

// ---------------------- Traitement du form apres submit -----------------------------
const descriptionForm = ref("");
const destinataireForm = ref("");
const titreForm = ref("");
const messageToUser = ref("");


async function addNotif() {
  try {
    const cours = await axios
      .post(BASE_URL + "notif/create", {
        user_Email: userSession.value,
        destinataire_Email: destinataireForm.value,
        Description: descriptionForm.value,
        Titre: titreForm.value,
      })
      .then((response) => {
        showModalForm.value = !showModalForm.value;
        messageToUser.value = response.data;
        showInfoModal.value = !showInfoModal.value;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
  } catch (e) {
    showModalForm.value = !showModalForm.value;
    messageToUser.value = e;
    showInfoModal.value = !showInfoModal.value;
    setTimeout(() => {
          window.location.reload();
        }, 1000);
  }
}
</script>

<template>
  <div v-if="userSession">
    <the-card-wrapper>
      <card-notif v-for="response in allNotifications" :user="response.roles" :object="response.notification.Objet"
        :envoiHeure="changeFormatDate(response.notification.EnvoiHeureDate)" :message="response.notification.Message"
        :class="response.roles">
        <span v-if="response.status == false" class="icon">
          <i class="fa fa-solid fa-circle fa-lg"></i>
        </span>
      </card-notif>
    </the-card-wrapper>
  </div>
  <div v-else>
    <h1>Vous devez être connecté</h1>
  </div>
<div>
      <button
        v-show="role == 'Administration'"
        class="button is-right js-modal-trigger"
        data-target="modal-js-example"
        id="fixedbutton"
        @click="showModalForm = true"
      >
        <span class="icon is-large has-text-danger">
          <i class="fa fa-3x fa-plus-square"></i>
        </span>
      </button>
    </div>

   <!-- MODAL FORM  -->
  <BaseModalForm
    :class="{ 'is-active': showModalForm }"
    @close="showModalForm = false"
  >
    <!-- AJOUT COURS  -->
    <BaseFormModal @submit.prevent="addNotif()">
      <h3 class="title">Nouvelle Notification</h3>
      <BaseInput>
        <template v-slot:label>Destinataire</template>
        <template v-slot:input>
          <input
            v-model="destinataireForm"
            class="input"
            type="text"
            placeholder="eloi.coquoz@heig-vd.ch,M49-1 "
            required
          />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Titre</template>
        <template v-slot:input>
          <input
            v-model="titreForm"
            class="input"
            type="text"
            placeholder="Objet"
            required
          />
        </template>
      </BaseInput>
      <BaseInput>
        <template v-slot:label>Message</template>
        <template v-slot:input>
          <textarea 
            style="resize: none; width: 300px;"
            v-model="descriptionForm"
            class="input"
            type="textarea"
            placeholder="Message"
            required>
          </textarea>
        </template>
      </BaseInput>

      <BaseInputSubmit>
        <input
          type="submit"
          class="button is-danger is-rounded"
          value="Envoyer"
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
      <h3 class="title">{{ messageToUser }}</h3>
      <div class="modal-info select is-danger"></div>
      <div class="btnProf"></div>
    </BaseFormModal>
  </BaseModalForm>
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

body {
  overflow-x: hidden;
}
</style>
