<script setup>
import TheEventTileVue from './components/TheEventTile.vue';

</script>

<template>
  <div class="main my-4 mx-4">
    <div class="select is-danger">
      <select>
        <option>Tous les cours</option>
        <option>With options</option>
      </select>
    </div>
    <div class="columns is-centered tile is-ancestors my-1 mx-1">
      <div class="column is-three-quarters">
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
        <the-event-tile-vue :debut="'19:30'" :fin="'23:00'" :titre="'AGE - Soirée culture G'" :lieu="'Bar de la gare'">
        </the-event-tile-vue>
      </div>
    </div>
    <div id="fixedbutton">
      <span class="icon is-large has-text-danger">
        <i class="fa fa-4x fa-plus-circle"></i>
      </span>
    </div>
  </div>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
