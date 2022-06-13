<script setup>
import { watchPostEffect } from "@vue/runtime-core";
import { ref, computed, watchEffect } from "vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import axios from "axios";
import { BASE_URL } from "../composables/store";

let email = ref("");
let password = ref("");
let hash = ref(window.location.hash);
let userSession = ref(false);
let showWelcomeModalForm = ref(false);
let showMailErrorModalForm = ref(false);
let showUserPswErrorModalForm = ref(false);

function compareMail(email) {
  const refMail = "heig-vd.ch";
  const userMail = email.substring(email.indexOf("@") + 1);
  if (refMail === userMail) {
    return true;
  } else {
    return false;
  }
}

function useFetchLogin(password, email) {
  if (compareMail(email)) {
    axios
      .post(
        BASE_URL + "login?Email=" +
        email +
        "&Password=" +
        password,
        {}
      )
      .then((res) => {
        if (res.data.includes("connected") || res.data.includes("DB")) {

          sessionStorage.setItem("user", email);
          userSession.value = sessionStorage.getItem("user");
          if (res.data.includes("Professeur")) {
            sessionStorage.setItem("role", "Professeur");
          } else if (res.data.includes("Etudiant")) {
            sessionStorage.setItem("role", "Etudiant");
          } else if (res.data.includes("Administration")) {
            sessionStorage.setItem("role", "Administration");
          } else {
            sessionStorage.setItem("role", "AGE");
          }

          showWelcomeModalForm.value = !showWelcomeModalForm.value;

        } else if (
          res.data.includes("user found : error in password or username")
        ) {
          showUserPswErrorModalForm.value = !showUserPswErrorModalForm.value;
          userSession.value = null;
        } else {
          showUserPswErrorModalForm.value = !showUserPswErrorModalForm.value;
          userSession.value = null;
        }
      })
      .catch((error) => {
        // error.response.status Check status code
        console.log(error);
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
  window.location.reload()

}
</script>

<template>
  <section class="hero">
    <!-- To accept bulma's icons -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form @submit.prevent="useFetchLogin(password, email)" class="box">
              <div class="field">
                <label for="" class="label">Adresse mail</label>
                <div class="control has-icons-left">
                  <input v-model="email" type="email" placeholder="prenom.nom@heig-vd.ch" class="input" required />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Mot de passe</label>
                <div class="control has-icons-left">
                  <input v-model="password" type="password" placeholder="*******" class="input" required />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-danger">Connexion</button><br><br>
                <a href="#PasswordReset" class="is-size-7">Mot de passe oublié ?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL FORM WELCOME -->
  <BaseModalForm :class="{ 'is-active': showWelcomeModalForm }" @close="showWelcomeModalForm = false, changeHash()">

    <BaseFormModal>
      <h2 class="title is-4">Bienvenue dans <b>Kairos</b> </h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input type="submit" class="button is-primary is-rounded" value="Entrer"
        @click="showWelcomeModalForm = false, changeHash()" />
    </BaseInputSubmit>
  </BaseModalForm>

  <!-- MODAL FORM @MAIL ERROR -->
  <BaseModalForm :class="{ 'is-active': showMailErrorModalForm }" @close="showMailErrorModalForm = false">
    <BaseFormModal>
      <h2 class="title is-4">Utilisez votre mail <b>@heig-vd.ch</b> pour vous connecter</h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input type="submit" class="button is-primary is-rounded" value="Compris"
        @click="showMailErrorModalForm = false" />
    </BaseInputSubmit>
  </BaseModalForm>

  <!-- MODAL FORM USER OR PASSWORD ERROR -->
  <BaseModalForm :class="{ 'is-active': showUserPswErrorModalForm }" @close="showUserPswErrorModalForm = false">
    <BaseFormModal>
      <h2 class="title is-4"> Erreur dans le <b>nom d'utilisateur</b> ou le <b>mot de passe</b></h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input type="submit" class="button is-primary is-rounded" value="Retour"
        @click="showUserPswErrorModalForm = false" />
    </BaseInputSubmit>
  </BaseModalForm>

</template>

<style scoped>
</style>
