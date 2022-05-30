<script setup>
import { ref } from 'vue';

  const page = ref('#accueil');
  window.addEventListener('hashchange', () => {
    page.value = window.location.hash
  })
  
  document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

  const props = defineProps({
    routes: {
      type: Object,
      required: true
    },
    curHash: {
      type: String,
      required: true
    }
  });

</script>

<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
      <span>LOGO</span>
      <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
    </a>

    <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navMenu" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="#accueil">
        Accueil
      </a>

      <a class="navbar-item" href="#evenements">
        Evenements
      </a>
      <a class="navbar-item" href="#agendaClasse">
        Agenda des classes
      </a>
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


</style>