<script setup>
import CardEvent from "./components/CardEvent.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";

function afficheForm() {
  alert("salut");
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
      <card-event
        :debut="'19:30'"
        :fin="'23:00'"
        :titre="'AGE - Soirée culture G'"
        :lieu="'Bar de la gare'"
      >
      </card-event>
    </the-card-wrapper>
    <button
      class="button is-right js-modal-trigger"
      data-target="modal-js-example"
      id="fixedbutton"
    >
      <span class="icon is-large has-text-danger">
        <i class="fa fa-4x fa-plus-square"></i>
      </span>
    </button>
  </div>

  <!-- MODAL FORM  -->
  <BaseModalForm>
    <!-- AJOUT EVENT  -->
    <BaseFormModal @submit.prevent="addEvent()">
      <!--     <link
      href="~bulma-calendar/dist/css/bulma-calendar.min.css"
      rel="stylesheet"
    /> -->
      <h1 class="title is-1">Nouveau évènement</h1>

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

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>
