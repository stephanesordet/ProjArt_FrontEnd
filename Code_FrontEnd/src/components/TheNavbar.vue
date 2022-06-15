<script setup>
import { computed, ref, watchEffect } from "vue";
import { BASE_URL } from "../../composables/store";
const page = ref("#accueil");
const userSession = ref(null);
const session = ref(false);
const role = ref(null);
const notifications = ref([]);
const newNotifs = ref(false);


window.addEventListener("load", () => {
  if (sessionStorage.getItem("user")) {
    userSession.value = sessionStorage.getItem("user");
    session.value = true;
    role.value = sessionStorage.getItem("role");
  } else {
    session.value = false;
  }
});

window.addEventListener("hashchange", () => {
  page.value = window.location.hash;
  if (page.value === "#accueil") {
  var e = document.querySelector("select");
  e.value = "Tous les cours";
  const cours = document.querySelectorAll(".cours");
  const spanCours = document.querySelectorAll(".spanCours");
  cours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
  spanCours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
  }else if(page.value === "#agendaClasse"){
     var e = document.querySelector("select");
  e.value = "Tous les cours";
  const cours = document.querySelectorAll(".cours");
  const spanCours = document.querySelectorAll(".spanCours");
  cours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
  spanCours.forEach((coursSolo) => {
    coursSolo.style.display = "block";
  });
  }
  userSession.value = sessionStorage.getItem("user");
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
  window.location.hash = "#";
}

const props = defineProps({
  routes: {
    required: true,
  },
  curHash: {
    required: true,
  },
});

watchEffect(() => {
  if (userSession.value != null) {
    fetch(BASE_URL + "notifications/" + userSession.value)
      .then((res) => res.json())
      .then((notifResults) => (notifications.value = notifResults));
  }
});

watchEffect(() => {
  console.log('watch')
  notifications.value.forEach(element => {
    if (element.status == false) {
      newNotifs.value = true
    }
  });
})

setInterval(() => {
  if (userSession.value != null) {
    fetch(BASE_URL + "notifications/" + userSession.value)
      .then((res) => res.json())
      .then((notifResults) => (notifications.value = notifResults));
  }
}, 60000);

watchEffect(() => {
  console.log(newNotifs.value)
})
</script>

<template>
  <nav v-show="session" class="navbar is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#accueil">
        <img id="logoNavbar" src="../assets/logoProjArt.png" />
      </a>
      <a id="navBurger" role="button" class="navbar-burger mt-6" data-target="navMenu" aria-label="menu"
        aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navMenu" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="#accueil"> Accueil </a>
        <a v-show="role != 'Administration' && role != 'AGE'" class="navbar-item" href="#agendaClasse">
          Agenda personnel
        </a>
        <a class="navbar-item" href="#evenements"> Evenements </a>
        <a class="navbar-item" href="#Information"> Informations </a>
        <a v-show="role != 'Administration' && role != 'AGE'" class="navbar-item" href="#notifications">
          <span class="icon">
            <i v-show="newNotifs == true" class="fa fa-bell" style="color:red" @click="newNotifs = false"></i>
            <i v-show="newNotifs == false" class="fa fa-bell"></i>
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
