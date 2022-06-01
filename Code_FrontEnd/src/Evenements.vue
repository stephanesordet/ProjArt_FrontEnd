<script setup>
import CardEventVue from './components/CardEvent.vue';
import TheCardWrapper from './components/TheCardWrapper.vue';
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
      <card-event-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
      </card-event-vue>
    </the-card-wrapper>
    <div id="fixedbutton">
      <span class="icon is-large has-text-link">
        <i class="fa fa-4x fa-plus-square"></i>
      </span>
    </div>
  </div>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>
