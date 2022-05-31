<script setup>
/*import bulmaCalendar from "/../../node_modules/bulma-calendar/dist/js/bulma-calendar.min.js";

// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="date"]', options);

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
</script>

<template>
  <div class="main">
    <!--     <link
      href="~bulma-calendar/dist/css/bulma-calendar.min.css"
      rel="stylesheet"
    /> -->
    <h1 class="title is-1">Nouveau cours</h1>

    <div class="field">
      <label class="label">Date</label>
      <div class="control">
        <!-- <input
          type="date"
          data-display-mode="inline"
          data-is-range="true"
          data-close-on-select="false"
        /> -->
        <input class="input" type="date" placeholder="Entrez une date" />
        <!-- https://bulma-calendar.onrender.com/-->
      </div>
    </div>

    <div class="field">
      <label class="label">Matière</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Matière 1</option>
            <option>Matière 2</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Classe</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Classe 1</option>
            <option>Classe 2</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Heure de début</label>
      <div class="control">
        <input
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
          class="input"
          type="text"
          placeholder="Entre le lieu d'une classe"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary">Insérer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding: 1rem;
}

.input,
.select,
.select select {
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  max-width: 100%;
  width: 100%;
}
</style>
