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
import CardProf from "./components/CardProf.vue";

// ---------------------- Fetch data for all events -----------------------------
const { data: prof } = useFetch(BASE_URL + "prof/COMEM+");
const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));

const allProf = computed(() => {
  const tabProf = new Set();
  if (!prof.value?.length) {
    return [];
  } else {
    prof.value.forEach((element) => {
        tabProf.add(element);
    });
  }
  return tabProf;
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
</script>

<template>
    <div class="main my-4 mx-4">
        <card-prof  v-for="prof in allProf"
        :info="prof.FullName"
        :class="prof.FullName"
        :email="prof.Email"
        :acronyme="prof.Acronyme">
        </card-prof>
    </div>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
</style>