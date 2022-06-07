<script setup>
import { watchPostEffect } from "@vue/runtime-core";
import { ref, computed, watch, watchEffect } from "vue";
import axios from "axios";

let email = ref("");
let password = ref("");

/* async function userLogin(email, password) {
  //using then, status is useFetchLogin, if status is true alert ok
  useFetchLogin(email, password);

  // const status = useFetchLogin(email, password);
  // console.log(status);

  // if (status) {
  //   alert("Connexion réussie");
  //   sessionStorage.setItem("user", email);
  //   window.location.href = "#accueil";
  //   window.location.reload();
  // } else {
  //   alert("Connexion échouée");
  // }
} */

function useFetchLogin(password, email) { 
  axios
  .post('http://localhost:8000/api/login?Email=' + email + '&Password=' + password, {
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
                <button class="button is-success">
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
