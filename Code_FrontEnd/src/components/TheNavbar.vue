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
  if (sessionStorage.getItem("user")) {
    session.value = true;
    role.value = sessionStorage.getItem("role");
  } else {
    session.value = false;
  }
});

window.addEventListener('load', () => {
  if (sessionStorage.getItem('user')) {
    session.value = true

  } else {
    session.value = false
  }
})

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

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

function reload() {
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

function afficheNotif() {
  console.log(4);
}
</script>

<template>
  <nav
    v-show="session"
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="#accueil">
        <img id="logoNavbar" src="../assets/logoProjArt.png" />
      </a>
      <button class="button is-large is-white mt-6" @click="afficheNotif()">
        <span class="icon">
          <i class="fa fa-regular fa-bell"></i>
        </span>
      </button>
      <a
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

    <div class="navbar-menu">
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
        <a class="navbar-item" href="#notifications"> Notifications </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a @click="reload()" class="button is-primary" href="#accueil">
              <strong>Logout</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <nav
    v-show="!session"
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="#accueil">
        <img id="logoNavbar" src="../assets/logoProjArt.png" />
      </a>
      <a
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

    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="#accueil"> Accueil </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" href="#login">
              <strong>Se connecter</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
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
