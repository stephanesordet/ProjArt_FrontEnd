<script setup>
import { ref } from "vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import axios from "axios";
import TheReturnButton from "./components/TheReturnButton.vue";
import { BASE_URL } from "../composables/store";

let email = ref("");
let hash = ref(window.location.hash);
let userSession = ref(false);
let showMailErrorModalForm = ref(false);
let showResetOk = ref(false);
let showProblem = ref(false);

// ---------------------- Function to verify domain of email address -----------------------------
function compareMail(email) {
  const refMail = "heig-vd.ch";
  const userMail = email.substring(email.indexOf("@") + 1);
  if (refMail === userMail) {
    return true;
  } else {
    return false;
  }
}

// ---------------------- Function send email for reset password -----------------------------
function sendEmail(email) {
  if (compareMail(email)) {
    axios
      .get(BASE_URL + "oubli-mdp/" + email, {})
      .then((res) => {
        if (res.data.includes("user not found")) {
          showMailErrorModalForm.value = !showMailErrorModalForm.value;
        } else if (res.data.includes("Message sent successfully")) {
          showResetOk.value = !showResetOk.value;
        } else {
          showProblem.value = !showProblem.value;
        }
      })
      .catch((error) => {
        showProblem.value = !showProblem.value;
      })
      .finally(() => {
        //Perform action in always
      });
  } else {
    showMailErrorModalForm.value = !showMailErrorModalForm.value;
  }
}
function changeHash() {
  window.location.hash = "#accueil";
}
</script>

<template>
  <the-return-button></the-return-button>
  <section class="hero">
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form class="box" @submit.prevent="sendEmail(email)">
              <div class="field">
                <label for="" class="label">Adresse mail</label>
                <div class="control has-icons-left">
                  <input
                    v-model="email"
                    type="email"
                    placeholder="prenom.nom@heig-vd.ch"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-danger">Envoyer</button><br /><br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL FORM PASSWORD RESET -->
  <BaseModalForm
    :class="{ 'is-active': showResetOk }"
    @close="(showResetOk = false), changeHash()"
  >
    <BaseFormModal>
      <h2 class="title is-4">
        Un nouveau mot de passe à été envoyé à<br />
        <b>{{ email }}</b>
      </h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input
        type="submit"
        class="button is-primary is-rounded"
        value="Compris"
        @click="(showResetOk = false), changeHash()"
      />
    </BaseInputSubmit>
  </BaseModalForm>

  <!-- MODAL FORM @MAIL ERROR -->
  <BaseModalForm
    :class="{ 'is-active': showMailErrorModalForm }"
    @close="showMailErrorModalForm = false"
  >
    <BaseFormModal>
      <h2 class="title is-4">
        Utilisez votre mail <b>@heig-vd.ch</b> pour la récupération
      </h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input
        type="submit"
        class="button is-primary is-rounded"
        value="Compris"
        @click="showMailErrorModalForm = false"
      />
    </BaseInputSubmit>
  </BaseModalForm>

  <!-- MODAL FORM @MAIL PROBLEM -->
  <BaseModalForm
    :class="{ 'is-active': showProblem }"
    @close="showProblem = false"
  >
    <BaseFormModal>
      <h2 class="title is-4">Problème inconnu lors de l'envoi du mail !</h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input
        type="submit"
        class="button is-primary is-rounded"
        value="Réessayer"
        @click="showProblem = false"
      />
    </BaseInputSubmit>
  </BaseModalForm>
</template>

<style scoped>
body {
  overflow-x: hidden;
}
</style>
