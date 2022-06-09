<script setup>
import { currentCoursId } from "../../composables/store.js";

defineProps({
  cours: {
    type: String,
  },
  debut: {
    type: String,
  },
  fin: {
    type: String,
  },
  classe: {
    type: String,
  },
  salle: {
    type: String,
  },
  id: {
    type: Number,
  },
});

function modifCours() {
  console.log("modifCours");
}

function deleteCours() {
  console.log("deleteCours");
}

function voirDetails(id) {
  console.log("details");
  window.location.hash = "#detailMatiere";
  currentCoursId.value = id;
  console.log(id + " " + currentCoursId.value);
  //window.location.reload();
}
</script>

<template>
  <article class="tile is-child notification is-light has-text-left-mobile">
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <p class="is-size-4 has-text-weight-bold">{{ cours }}</p>
    <p class="is-size-6">{{ debut }} - {{ fin }}</p>
    <p class="is-size-5">
      <span class="icon">
        <i class="fa fa-map-marker"></i>
      </span>
      {{ salle }}
    </p>
    <button
      class="button is-pulled-right is-white has-background-light"
      @click="deleteCours()"
    >
      <span class="icon is-small">
        <i class="fa fa-trash"></i>
      </span>
    </button>

    <button
      class="button is-pulled-right is-white has-background-light"
      @click="modifCours()"
    >
      <span class="icon is-small">
        <i class="fa fa-pencil"></i>
      </span>
    </button>

    <button
      class="button is-pulled-right is-white has-background-light"
      @click="voirDetails(id)"
    >
      <span class="icon is-small">
        <i class="fa fa-info"></i>
      </span>
    </button>
  </article>
</template>

<style scoped>
article {
  border-left-width: 15px;
  border-style: solid;
  border-color: #ff3860;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
  padding-bottom: 40px;
}
</style>
