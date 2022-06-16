<script setup>
import { ref } from "vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import axios from "axios";
import { BASE_URL } from "../composables/store";
import TheLoader from "./components/TheLoader.vue";
import TheReturnButton from "./components/TheReturnButton.vue";

let email = ref("");
let password = ref("");
let hash = ref(window.location.hash);
let userSession = ref(null);
let role = ref(null);
let showMailErrorModalForm = ref(false);
let showUserPswErrorModalForm = ref(false);
let showProblem = ref(false);

//testing that the email is valid --> @heig-vd.ch
function compareMail(email) {
  const refMail = "heig-vd.ch";
  const userMail = email.substring(email.indexOf("@") + 1);
  if (refMail === userMail) {
    return true;
  } else {
    return false;
  }
}

//log the user if he exists on gaps and if the password is correct and then store it in the session and database
function useFetchLogin(password, email) {
  if (compareMail(email)) {
    document.querySelector(".loading-box").style.display = "flex";
    axios
      .post(BASE_URL + "login", {
        Email: email,
        Password: password,
      })
      .then((res) => {
        if (res.data.includes("connected") || res.data.includes("DB")) {
          sessionStorage.setItem("user", email);
          if (res.data.includes("Professeur")) {
            sessionStorage.setItem("role", "Professeur");
            window.location.hash = "#agendaClasse";
          } else if (res.data.includes("Etudiant")) {
            sessionStorage.setItem("role", "Etudiant");
            window.location.hash = "#agendaClasse";
          } else if (res.data.includes("Administration")) {
            sessionStorage.setItem("role", "Administration");
            window.location.hash = "#accueil";
          } else {
            sessionStorage.setItem("role", "AGE");
            window.location.hash = "#accueil";
          }
          userSession.value = sessionStorage.getItem("user");
          window.location.reload();
          document.querySelector(".loading-box").style.display = "none";
        } else if (
          res.data.includes("user found : error in password or username")
        ) {
          document.querySelector(".loading-box").style.display = "none";
          showUserPswErrorModalForm.value = !showUserPswErrorModalForm.value;
          userSession.value = null;
        } else {
          document.querySelector(".loading-box").style.display = "none";
          showUserPswErrorModalForm.value = !showUserPswErrorModalForm.value;
          userSession.value = null;
        }
      })
      .catch((error) => {
        showProblem.value = !showProblem.value;
      })
      .finally(() => {
      });
  } else {
    showMailErrorModalForm.value = !showMailErrorModalForm.value;
  }
}
</script>

<template>
  <the-return-button></the-return-button>
  <TheLoader></TheLoader>
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
              <div class="tooltip"><i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="tooltiptext">Veuillez rentrer vos identifiants GAPS lors de la première connexion</span>
              </div>
              <div class="field">
                <button class="button is-danger">Connexion</button><br /><br />
                <a href="#PasswordReset" class="is-size-7">Mot de passe oublié ?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL FORM @MAIL ERROR -->
  <BaseModalForm :class="{ 'is-active': showMailErrorModalForm }" @close="showMailErrorModalForm = false">
    <BaseFormModal>
      <h2 class="title is-4">
        Utilisez votre mail <b>@heig-vd.ch</b> pour vous connecter
      </h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input type="submit" class="button is-primary is-rounded" value="Compris"
        @click="showMailErrorModalForm = false" />
    </BaseInputSubmit>
  </BaseModalForm>

  <!-- MODAL FORM USER OR PASSWORD ERROR -->
  <BaseModalForm :class="{ 'is-active': showUserPswErrorModalForm }" @close="showUserPswErrorModalForm = false">
    <BaseFormModal>
      <h2 class="title is-4">
        Erreur dans le <b>nom d'utilisateur</b> ou le <b>mot de passe</b>
      </h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input type="submit" class="button is-primary is-rounded" value="Retour"
        @click="showUserPswErrorModalForm = false" />
    </BaseInputSubmit>
  </BaseModalForm>

  <!-- MODAL FORM PROBLEM -->
  <BaseModalForm :class="{ 'is-active': showProblem }" @close="showProblem = false">
    <BaseFormModal>
      <h2 class="title is-4">Problème inconnu lors de l'envoi du mail !</h2>
    </BaseFormModal>
    <BaseInputSubmit>
      <input type="submit" class="button is-primary is-rounded" value="Réessayer" @click="showProblem = false" />
    </BaseInputSubmit>
  </BaseModalForm>
</template>

<style scoped>
body {
  overflow-x: hidden;
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 220px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 110%;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 20%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
