<script setup>
import { ref, computed } from "vue";
import BaseForm from "./components/BaseForm.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";

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
  <!-- AJOUT COURS  -->
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
        class="button is-danger is-rounded"
        value="Ajouter le cours"
      />
    </BaseInputSubmit>
  </BaseForm>

  <!-- AJOUT REMARQUE COURS -->
  <BaseForm @submit.prevent="addRemarqueCours()">
    <!--     <link
      href="~bulma-calendar/dist/css/bulma-calendar.min.css"
      rel="stylesheet"
    /> -->
    <h1 class="title is-1">Nouvelle remarque pour : nomCours</h1>

    <div class="field" style="width: 300px">
      <label class="label" for="Remarque">Remarque</label>

      <div class="control">
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label for="html"> Publique</label><br />
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label for="css"> Privée</label><br />
      </div>
    </div>

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
      <template v-slot:label>Titre</template>
      <template v-slot:input>
        <input
          v-model="eventTitle"
          class="input"
          type="text"
          placeholder="Entrez le nom de l'évènement"
        />
      </template>
    </BaseInput>

    <BaseInput>
      <template v-slot:label>Description</template>
      <template v-slot:input>
        <input
          v-model="eventDescription"
          class="input"
          type="text"
          placeholder="Entrez la description de l'évènement"
        />
      </template>
    </BaseInput>

    <BaseInputSubmit>
      <input
        type="submit"
        class="button is-danger is-rounded"
        value="Ajouter le cours"
      />
    </BaseInputSubmit>
  </BaseForm>

  <!-- AJOUT REMARQUE PRIVÉE  -->
  <BaseForm @submit.prevent="addRemarquePrivate()">
    <!--     <link
      href="~bulma-calendar/dist/css/bulma-calendar.min.css"
      rel="stylesheet"
    /> -->
    <h1 class="title is-1">Nouvelle remarque privée</h1>

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
      <template v-slot:label>Titre</template>
      <template v-slot:input>
        <input
          v-model="eventTitle"
          class="input"
          type="text"
          placeholder="Entrez le nom de l'évènement"
        />
      </template>
    </BaseInput>

    <BaseInput>
      <template v-slot:label>Description</template>
      <template v-slot:input>
        <input
          v-model="eventDescription"
          class="input"
          type="text"
          placeholder="Entrez la description de l'évènement"
        />
      </template>
    </BaseInput>

    <BaseInputSubmit>
      <input
        type="submit"
        class="button is-danger is-rounded"
        value="Ajouter le cours"
      />
    </BaseInputSubmit>
  </BaseForm>

  <!-- MODAL FORM  -->
  <!-- <BaseModalForm> -->
  <!-- AJOUT NOTIFICATION  -->
  <BaseFormModal @submit.prevent="addNotification()">
    <!--     <link
      href="~bulma-calendar/dist/css/bulma-calendar.min.css"
      rel="stylesheet"
    /> -->
    <h1 class="title is-1">Nouvelle notification</h1>

    <BaseInput>
      <template v-slot:label>Titre</template>
      <template v-slot:input>
        <input
          v-model="eventTitle"
          class="input"
          type="text"
          placeholder="Entrez le nom de l'évènement"
        />
      </template>
    </BaseInput>

    <BaseInput>
      <template v-slot:label>Description</template>
      <template v-slot:input>
        <input
          v-model="eventDescription"
          class="input"
          type="text"
          placeholder="Entrez la description de l'évènement"
        />
      </template>
    </BaseInput>

    <BaseInputSubmit>
      <input
        type="submit"
        class="button is-danger is-rounded"
        value="Ajouter le cours"
      />
    </BaseInputSubmit> </BaseFormModal
  ><!-- </BaseModalForm> -->
</template>

<style scoped></style>
