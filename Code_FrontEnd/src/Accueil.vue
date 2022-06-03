<script setup>
import { def } from "@vue/shared";
import { computed, ref, watchEffect } from "vue";
import { useFetch } from "../composables/fetch";
import CardCours from "./components/CardCours.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";

const { data: horaires } = useFetch(
  "https://chabloz.eu/files/horaires/all.json"
);

let selectedClasse = ref("IM48");
let selectedMatiere = ref("Tous les cours");
let Matieres = ref([]);
let showModalForm = ref(false);

const Classes = computed(() => {
  const tabClasse = [];
  if (!horaires.value?.length) {
    return [];
  } else {
    horaires.value.forEach((element) => {
      if (!tabClasse.includes(element.class)) {
        tabClasse.push(element.class);
      }
    });
  }
  return tabClasse;
});

Matieres = computed(() => {
  const tabMatieres = [];
  if (!horaires.value?.length) {
    return [];
  } else {
    horaires.value.forEach((element) => {
      if (
        !tabMatieres.includes(element.label) &&
        element.class == selectedClasse.value
      ) {
        tabMatieres.push(element.label);
      }
    });
  }
  return tabMatieres;
});

function afficheForm() {
  alert("aaa");
}
</script>

<template>
  <div class="main mx-4 my-1">
    <div>
      <div class="buttons is-mobile columns is-centered mx-1 my-1">
        <button
          v-for="classe in Classes"
          :key="classe"
          @click="
            (selectedClasse = classe), (selectedMatiere = 'Tous les cours')
          "
          class="column button has-background-light has-text-black is-medium is-one-fifth-mobile is-danger"
        >
          {{ classe }}
        </button>
      </div>
    </div>
    <div class="select is-danger">
      <select>
        <option @click="selectedMatiere = 'Tous les cours'">
          Tous les cours
        </option>
        <option
          v-for="matiere in Matieres"
          :key="matiere"
          @click="selectedMatiere = matiere"
        >
          {{ matiere }}
        </option>
      </select>
    </div>
    <div class="columns is-centered tile is-ancestor">
      <div class="column is-three-quarters">
        <div
          v-if="selectedMatiere != 'Tous les cours'"
          class="tile is-parent is-vertical"
        >
          <card-cours
            v-for="horaire in horaires"
            :key="horaire.start"
            v-show="
              selectedClasse == horaire.class &&
              selectedMatiere == horaire.label
            "
            :debut="horaire.start"
            :fin="horaire.start"
            :cours="horaire.label"
            :salle="horaire.room"
          >
          </card-cours>
        </div>

        <div v-else class="tile is-parent is-vertical">
          <card-cours
            v-for="horaire in horaires"
            :key="horaire.id"
            v-show="selectedClasse == horaire.class"
            :debut="horaire.start"
            :fin="horaire.start"
            :cours="horaire.label"
            :salle="horaire.room"
          >
          </card-cours>
        </div>
      </div>
    </div>
    <div>
      <button
        class="button is-right js-modal-trigger"
        data-target="modal-js-example"
        id="fixedbutton"
        @click="showModalForm = !showModalForm"
      >
        <span class="icon is-large has-text-danger">
          <i class="fa fa-4x fa-plus-square"></i>
        </span>
      </button>
    </div>
  </div>
  <!-- MODAL FORM  -->
  <BaseModalForm
    :class="{ 'is-active': showModalForm }"
    @close="showModalForm = false"
  >
    <!-- AJOUT COURS  -->
    <BaseFormModal @submit.prevent="addCours()">
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
    </BaseFormModal>
  </BaseModalForm>
</template>
<style>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>
