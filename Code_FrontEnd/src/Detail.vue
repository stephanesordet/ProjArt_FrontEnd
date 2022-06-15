<script setup>
import { ref, computed, watchEffect, nextTick } from "vue";
import CardEvent from "./components/CardEvent.vue";
import TheCardWrapper from "./components/TheCardWrapper.vue";
import BaseFormModal from "./components/BaseFormModal.vue";
import BaseInputSubmit from "./components/BaseInputSubmit.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseModalForm from "./components/BaseModalForm.vue";
import { currentEventId } from "../composables/store";
import axios from "axios";
import { useFetch } from "../composables/fetch.js";
import { BASE_URL, idDetailsEvent, todayDate } from "../composables/store.js";
import { changeFormatDateWithoutHoursMinutes } from "../composables/function.js";
import randomColor from "randomcolor";
import CardInfoVue from "./components/CardInfo.vue";

// ---------------------- Fetch data for all events -----------------------------
const { data: classe } = useFetch(BASE_URL + "classes/filiere/COMEM+/");
const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));

const allClasse = computed(() => {
  const tabCalsse = [];
  if (!classe.value?.length) {
    return [];
  } else {
    classe.value.forEach((element) => {
        tabCalsse.push(element);
    });
  }
  return tabCalsse;
});

fetch(BASE_URL + "classes/filiere/COMEM+/")
  .then((res) => res.json())
  .then((AllMatiere) => {
    var couleurMatiereOb;
    const matiereColor = [];
    var i = 0;
    AllMatiere.forEach((matiere) => {
      couleurMatiereOb = Object();
      couleurMatiereOb.id = matiere.id;
      couleurMatiereOb.color = randomColor({ seed: i });
      matiereColor.push(couleurMatiereOb);
      i += 7;
    });
    console.log(matiereColor);
    matiereColor.forEach((element) => {
      document.head.insertAdjacentHTML(
        "beforeend",
        "<style>." +
          element.id +
          "{border-color:" +
          element.color +
          " !important}</style>"
      );
    });
  });

    function changeVue() {
    window.location.hash = "#Etudiant";
  }
</script>

<template>
     <div class="main my-4 mx-4">
        <card-info-vue 
        info="Liste étudiants"
        @click="changeVue()">
        </card-info-vue>
    </div>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>