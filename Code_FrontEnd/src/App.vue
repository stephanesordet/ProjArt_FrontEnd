<script setup>
import { ref, computed } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import TheNavbar from './components/TheNavbar.vue';
import AgendaClasse from './AgendaClasse.vue';
import Login from './Login.vue';
import Evenements from './Evenements.vue';
import Accueil from './Accueil.vue';

  const routes = {
    '#accueil': {
      label: 'Accueil',
      component: Accueil,
    },
    '#evenements': {
      label: 'Evenements',
      component: Evenements,
    },
    '#agendaClasse': {
      label: 'Agenda Classe',
      component: AgendaClasse,
    },
    '#login': {
      label: 'Login',
      component: Login,
    },
  };

  const hash = ref(window.location.hash);

  window.addEventListener('hashchange', () => hash.value = window.location.hash);

  const curHash = computed(() => routes[hash.value] ? hash.value : Object.keys(routes)[0]);
  const curComponent = computed(() => routes[curHash.value].component);
</script>

<template>
  <TheNavbar :routes="routes" :curHash="curHash"></TheNavbar>

  <main>
    <template v-for="(route, hash) of routes">
      <div v-show="hash == curHash">
        <component :is="route.component"/>
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
