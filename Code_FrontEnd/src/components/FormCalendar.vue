<script setup>
import { ref, computed } from "vue";
/*import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min.js";

// Initialize all input of date type.
//const calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
calendars.forEach((calendar) => {
  // Add listener to select event
  calendar.on("select", (date) => {
    console.log(date);
  });
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector("#my-element");
if (element) {
  // bulmaCalendar instance is available as element.bulmaCalendar
  element.bulmaCalendar.on("select", (datepicker) => {
    console.log(datepicker.data.value());
  });
}*/

const date = ref(null);
const classe = ref(null);
const matiere = ref(null);
const heureDebut = ref(null);
const heureFin = ref(null);
const lieu = ref(null);

const contentAddCours = [
  {
    date: "aujd",
    classe: "m49",
    matiere: "maths",
    heureDebut: "8h30",
    heureFin: "10h30",
    lieu: "T152",
  },
];

function addCours() {
  contentAddCours.push({
    date: date.value,
    classe: classe.value,
    matiere: matiere.value,
    heureDebut: heureDebut.value,
    heureFin: heureFin.value,
    lieu: lieu.value,
  });
  console.log(contentAddCours);
}
</script>

<template>
  <div class="main my-4 mx-4">
    <!--     <link
      href="~bulma-calendar/dist/css/bulma-calendar.min.css"
      rel="stylesheet"
    /> -->
    <h1 class="title is-1">Nouveau cours</h1>
    <form @submit.prevent="addCours()">
      <div class="field">
        <label class="label">Date</label>
        <div class="control">
          <input
            type="date"
            data-display-mode="inline"
            data-is-range="true"
            data-close-on-select="false"
          />
          <input
            v-model="date"
            class="input"
            type="date"
            placeholder="Entrez une date"
          />
          <!-- https://bulma-calendar.onrender.com/-->
        </div>
      </div>

      <div class="field">
        <label class="label">Classe</label>
        <div class="control">
          <div class="select">
            <select v-model="classe">
              <option>Classe 1</option>
              <option>Classe 2</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Matière</label>
        <div class="control">
          <div class="select">
            <select v-model="matiere">
              <option>Matière 1</option>
              <option>Matière 2</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Heure de début</label>
        <div class="control">
          <input
            v-model="heureDebut"
            class="input"
            type="time"
            placeholder="Entrez une heure de début"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Heure de fin</label>
        <div class="control">
          <input
            v-model="heureFin"
            class="input"
            type="time"
            placeholder="Entrez une heure de fin"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Lieu</label>
        <div class="control">
          <input
            v-model="lieu"
            class="input"
            type="text"
            placeholder="Entre le lieu d'une classe"
          />
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <input
            type="submit"
            class="button is-primary"
            value="Ajouter le cours"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input,
.select,
.select select {
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  max-width: 100%;
  width: 100%;
}
</style>
