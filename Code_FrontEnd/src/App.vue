import TheReturnButtonVue from "./components/TheReturnButton.vue";
<script setup>
import { ref, computed, watchEffect } from "vue";
import TheNavbar from "./components/TheNavbar.vue";
import AgendaClasse from "./AgendaClasse.vue";
import Login from "./FormLogin.vue";
import Evenements from "./Evenements.vue";
import Accueil from "./Accueil.vue";
import AccueilMobile from "./mobile/Accueil.vue";
import DetailMatiere from "./DetailMatiere.vue";
import Notifications from "./Notifications.vue";
import AjoutCours from "./FormAjoutCours.vue";
import DetailEvent from "./DetailEvent.vue";
import PasswordReset from "./PasswordReset.vue";
import TheReturnButton from "./components/TheReturnButton.vue";
var routes = {};
let userSession = ref(false);
isMobileDevice();
function isMobileDevice() {
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    routes = {
      "#accueil": {
        label: "Accueil",
        component: AccueilMobile,
      },
      "#evenements": {
        label: "Evenements",
        component: Evenements,
      },
      "#agendaClasse": {
        label: "Agenda Classe",
        component: AgendaClasse,
      },
      "#login": {
        label: "Login",
        component: Login,
      },
      "#detailMatiere": {
        label: "Detail matiere",
        component: DetailMatiere,
      },
      "#notifications": {
        label: "Notifications",
        component: Notifications,
      },
      "#ajoutCours": {
        label: "Ajouter un cours",
        component: AjoutCours,
      },
      "#detailEvent": {
        label: "Detail event",
        component: DetailEvent,
      },
      "#PasswordReset": {
        label: "PasswordReset",
        component: PasswordReset,
      },
    };
  } else {
    routes = {
      "#accueil": {
        label: "Accueil",
        component: Accueil,
      },
      "#evenements": {
        label: "Evenements",
        component: Evenements,
      },
      "#agendaClasse": {
        label: "Agenda Classe",
        component: AgendaClasse,
      },
      "#login": {
        label: "Login",
        component: Login,
      },
      "#detailMatiere": {
        label: "Detail matiere",
        component: DetailMatiere,
      },
      "#notifications": {
        label: "Notifications",
        component: Notifications,
      },
      "#ajoutCours": {
        label: "Ajouter un cours",
        component: AjoutCours,
      },
      "#detailEvent": {
        label: "Detail event",
        component: DetailEvent,
      },
      "#PasswordReset": {
        label: "PasswordReset",
        component: PasswordReset,
      },
    };
  }
}

const hash = ref(window.location.hash);
window.addEventListener("hashchange", () => {
  hash.value = window.location.hash;
  userSession.value = sessionStorage.getItem("user");
});
const curHash = computed(() =>
  routes[hash.value] ? hash.value : Object.keys(routes)[0]
);

window.addEventListener("load", () => {
  hash.value = window.location.hash;
  userSession.value = sessionStorage.getItem("user");
});

const curComponent = computed(() => routes[curHash.value].component);

watchEffect(() => {
  if (curComponent.value) {
    window.scrollTo(0, 0);
  }
});
</script>

<template>
  <TheNavbar :routes="routes" :curHash="curHash"></TheNavbar>
  <!--   <the-return-button v-if="userSession"></the-return-button> -->
  <main>
    <template v-for="(route, hash) of routes">
      <div v-show="hash == curHash">
        <component :is="route.component" />
      </div>
    </template>
  </main>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
