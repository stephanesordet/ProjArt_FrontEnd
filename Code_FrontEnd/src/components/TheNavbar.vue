<script setup>
import { computed, ref, watchEffect } from "vue";
const page = ref("#accueil");
const user = ref(null);
const session = ref(false);
const role = ref(null);

window.addEventListener("load", () => {
  if (sessionStorage.getItem("user")) {
    session.value = true;
    role.value = sessionStorage.getItem("role");
  } else {
    session.value = false;
  }
});

window.addEventListener("hashchange", () => {
  page.value = window.location.hash;
  document.querySelector("#navMenu").classList.remove("is-active");
  document.querySelector("#navBurger").classList.remove("is-active");
  if (sessionStorage.getItem("user")) {
    session.value = true;
    role.value = sessionStorage.getItem("role");
  } else {
    session.value = false;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      console.log(el);
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("role");
  window.location.hash = "#accueil";
  window.location.reload();
}

const props = defineProps({
  routes: {
    type: Object,
    required: true,
  },
  curHash: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <nav
    v-show="session"
    class="navbar is-transparent"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="#accueil">
        <img id="logoNavbar" src="../assets/logoProjArt.png" />
      </a>
      <a
        id="navBurger"
        role="button"
        class="navbar-burger mt-6"
        data-target="navMenu"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navMenu" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="#accueil"> Accueil </a>
        <a
          v-show="role != 'Administration' && role != 'AGE'"
          class="navbar-item"
          href="#agendaClasse"
        >
          Agenda personnel
        </a>
        <a class="navbar-item" href="#evenements"> Evenements </a>
        <a
          v-show="role != 'Administration' && role != 'AGE'"
          class="navbar-item"
          href="#notifications"
        >
          <span class="icon">
            <i class="fa fa-regular fa-bell"></i>
          </span>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a @click="logout()" class="button is-danger" href="#accueil">
              <strong>Se déconnecter</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div v-show="!session" class="columns is-6 is-variable is-vcentered">
    <div class="column is-one-quarter">
      <a class="" href="#accueil">
        <img id="logoNavbar" src="../assets/logoProjArt.png" />
      </a>
    </div>
    <div class="column is-one-quarter"></div>
    <div class="column is-one-quarter"></div>

    <div class="buttons column is-one-quarter">
      <a class="button is-danger" href="#login">
        <strong>Se connecter</strong>
      </a>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  margin: 10px;
}

.navbar-item {
  margin: 20px;
}

#logoNavbar {
  width: 120px;
  height: auto;
}

.navbar-item img {
  max-height: 7.5rem;
}
</style>
