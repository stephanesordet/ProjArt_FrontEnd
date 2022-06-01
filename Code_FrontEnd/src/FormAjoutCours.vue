<script setup>
import BaseForm from "./components/BaseForm.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import { ref, computed } from "vue";

/*import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min.js";
<!-- https://bulma-calendar.onrender.com/-->

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
  <BaseForm @submit.prevent="addCours()">
    <!--     <link
      href="~bulma-calendar/dist/css/bulma-calendar.min.css"
      rel="stylesheet"
    /> -->
    <h1 class="title is-1">Nouveau cours</h1>

    <BaseInput>
      <template v-slot:label>Date</template>
      <template v-slot:input>
        <input
          v-model="date"
          class="input"
          type="date"
          placeholder="Entrez une date"
        />
        <!--           <input
            type="date"
            data-display-mode="inline"
            data-is-range="true"
            data-close-on-select="false"
          /> -->
      </template>
    </BaseInput>

    <BaseInput>
      <template v-slot:label>Classe</template>
      <template v-slot:input>
        <div class="select">
          <select v-model="classe">
            <option>Classe 1</option>
            <option>Classe 2</option>
          </select>
        </div>
      </template>
    </BaseInput>

    <BaseInput>
      <template v-slot:label>Matière</template>
      <template v-slot:input>
        <div class="select">
          <select v-model="matiere">
            <option>Matière 1</option>
            <option>Matière 2</option>
          </select>
        </div>
      </template>
    </BaseInput>

    <BaseInput>
      <template v-slot:label>Heure de début</template>
      <template v-slot:input>
        <input
          v-model="heureDebut"
          class="input"
          type="time"
          placeholder="Entrez une heure de début"
        />
      </template>
    </BaseInput>

    <BaseInput>
      <template v-slot:label>Heure de fin</template>
      <template v-slot:input>
        <input
          v-model="heureFin"
          class="input"
          type="time"
          placeholder="Entrez une heure de fin"
        />
      </template>
    </BaseInput>

    <BaseInput>
      <template v-slot:label>Lieu</template>
      <template v-slot:input>
        <input
          v-model="lieu"
          class="input"
          type="text"
          placeholder="Entrez le lieu d'une classe"
        />
      </template>
    </BaseInput>

    <BaseInputSubmit>
      <input
        type="submit"
        class="button is-primary is-rounded"
        value="Ajouter le cours"
      />
    </BaseInputSubmit>
  </BaseForm>
</template>

<style scoped></style>
