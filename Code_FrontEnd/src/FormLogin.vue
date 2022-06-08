<script setup>
import { watchPostEffect } from "@vue/runtime-core";
import { ref, computed, watch, watchEffect } from "vue";
import axios from "axios";

let email = ref("");
let password = ref("");
let session = ref(false);

function useFetchLogin(password, email) {
  axios
    .post(
      "http://localhost:8000/api/login?Email=" +
        email +
        "&Password=" +
        password,
      {}
    )
    .then((res) => {
      if (res.data.includes("connected") || res.data.includes("DB")) {
        console.log("Connected");

        sessionStorage.setItem("user", email);
        session.value = true;
        if (res.data.includes("Professeur")) {
          sessionStorage.setItem("role", "Professeur");
        } else if (res.data.includes("Etudiant")) {
          sessionStorage.setItem("role", "Etudiant");
        } else if (res.data.includes("Administration")) {
          sessionStorage.setItem("role", "Administration");
        } else {
          sessionStorage.setItem("role", "AGE");
        }

        window.location.hash = "#accueil";
      } else if (
        res.data.includes("user found : error in password or username")
      ) {
        console.log("mdp ou user");
        session.value = false;
      } else {
        console.log("pas de compte");
        session.value = false;
      }
    })
    .catch((error) => {
      // error.response.status Check status code
      console.log(error);
    })
    .finally(() => {
      //Perform action in always
    });
}
</script>

<template>
  <section class="hero is-primary is-fullheight">
    <!-- To accept bulma's icons -->
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form @submit.prevent="useFetchLogin(password, email)" class="box">
              <div class="field">
                <label for="" class="label">Adresse mail</label>
                <div class="control has-icons-left">
                  <input
                    v-model="email"
                    type="email"
                    placeholder="example@gmail.com"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Mot de passe</label>
                <div class="control has-icons-left">
                  <input
                    v-model="password"
                    type="password"
                    placeholder="*******"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-success">Connexion</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
