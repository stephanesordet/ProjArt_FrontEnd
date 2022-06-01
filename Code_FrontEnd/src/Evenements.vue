<script setup>
import CardEvent from './components/CardEvent.vue';
import TheCardWrapper from './components/TheCardWrapper.vue';

function afficheForm() {
  console.log(4);
}
</script>

<template>
  <div class="main my-4 mx-4">
    <div class="select is-danger">
      <select>
        <option>Tous les cours</option>
        <option>With options</option>
      </select>
    </div>
    <the-card-wrapper>
      <card-event :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
      </card-event>
    </the-card-wrapper>
    <button class="button is-right" id="fixedbutton" @click="afficheForm()">
      <span class="icon is-large has-text-danger">
        <i class="fa fa-4x fa-plus-square"></i>
      </span>
    </button>
  </div>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>
