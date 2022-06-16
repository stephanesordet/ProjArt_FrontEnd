<script setup>
import { ref, computed, watchEffect } from "vue";
import { useFetch } from "../composables/fetch.js";
import { BASE_URL } from "../composables/store.js";
import { changeFormatDateWithoutHoursMinutes } from "../composables/function.js";
import randomColor from "randomcolor";
import CardInfoVue from "./components/CardInfo.vue";
import CardProf from "./components/CardProf.vue";
import CardLink from "./components/CardLink.vue";
import Menu from "./components/Menu.vue";

const filiereStore = ref("COMEM+");
const filiereView = ref(true);
const classeStore = ref("M49-1");
const classeView = ref(false);
const detailView = ref(false);
const etudiantView = ref(false);
const profView = ref(false);
const linkView = ref(false);
const cafeteriaView = ref(false);
const actualiteView = ref(false);
const prof = ref([]);
const classe = ref([]);
const etudiant = ref([]);
const { data: filiere } = useFetch(BASE_URL + "filiere/");
const { data: menu } = useFetch("https://apix.blacktree.io/top-chef/today/");

// ---------------------- Fetch data for all events -----------------------------
const userSession = ref(sessionStorage.getItem("user"));
const role = ref(sessionStorage.getItem("role"));

if (window.location.hash == "#Information" || location) {
  watchEffect(() => {
    fetch(BASE_URL + "etudiant/" + classeStore.value + "/")
      .then((res) => res.json())
      .then((etudiants) => (etudiant.value = etudiants));
  });

  watchEffect(() => {
    fetch(BASE_URL + "prof/" + filiereStore.value)
      .then((res) => res.json())
      .then((profs) => (prof.value = profs));
  });

  watchEffect(() => {
    fetch(BASE_URL + "classes/filiere/" + filiereStore.value)
      .then((res) => res.json())
      .then((classes) => (classe.value = classes));
  });
}

fetch(BASE_URL + "filiere")
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

fetch(BASE_URL + "classes/filiere/" + filiereStore.value + "/")
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

const allEtudiant = computed(() => {
  const tabEtudiant = new Set();
  if (!etudiant.value?.length) {
    return [];
  } else {
    etudiant.value.forEach((element) => {
      tabEtudiant.add(element);
    });
  }
  return tabEtudiant;
});

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

const allFiliere = computed(() => {
  const tabFiliere = [];
  if (!filiere.value?.length) {
    return [];
  } else {
    filiere.value.forEach((element) => {
      tabFiliere.push(element);
    });
  }
  return tabFiliere;
});

const allMenu = computed(() => {
  const tabMenu = [];
  if (!menu.value) {
    return [];
  } else {
    menu.value.date = changeFormatDateWithoutHoursMinutes(menu.value.day);
    var objMenu = menu.value.menus;
    var objMenu2 = [];
    objMenu.forEach((element) => {
      element.mainCourse = element.mainCourse.join(", ");
      if (element.mainCourse !== "") {
        objMenu2.push(element);
      }
    });
    menu.value.menus = objMenu2;
    tabMenu.push(menu.value);
  }
  return tabMenu;
});

// ---------------------- Functions to display all the views -----------------------------
function changeVueFiliere(filiere) {
  filiereStore.value = filiere;
  filiereView.value = false;
  classeView.value = true;
  detailView.value = false;
  etudiantView.value = false;
  profView.value = false;
  cafeteriaView.value = false;
  linkView.value = false;
  actualiteView.value = false;
}

function changeVueClasse(classe) {
  classeStore.value = classe;
  detailView.value = true;
  classeView.value = false;
  filiereView.value = false;
  etudiantView.value = false;
  profView.value = false;
  cafeteriaView.value = false;
  linkView.value = false;
  actualiteView.value = false;
}

function changeVueEtudiant() {
  etudiantView.value = true;
  classeView.value = false;
  filiereView.value = false;
  profView.value = false;
  detailView.value = false;
  cafeteriaView.value = false;
  linkView.value = false;
  actualiteView.value = false;
}

function changeVue() {
  etudiantView.value = false;
  classeView.value = false;
  filiereView.value = true;
  profView.value = false;
  detailView.value = false;
  cafeteriaView.value = false;
  linkView.value = false;
  actualiteView.value = false;
}

function changeVueProf() {
  classeView.value = false;
  filiereView.value = false;
  etudiantView.value = false;
  detailView.value = false;
  profView.value = true;
  cafeteriaView.value = false;
  linkView.value = false;
  actualiteView.value = false;
}

function changeVueCafeteria() {
  cafeteriaView.value = true;
  classeView.value = false;
  filiereView.value = false;
  etudiantView.value = false;
  detailView.value = false;
  profView.value = false;
  linkView.value = false;
  actualiteView.value = false;
}

function changeVueLink() {
  linkView.value = true;
  classeView.value = false;
  filiereView.value = false;
  etudiantView.value = false;
  detailView.value = false;
  profView.value = false;
  cafeteriaView.value = false;
  actualiteView.value = false;
}

function link(link) {
  let a = document.createElement("a");
  a.target = "_blank";
  a.href = link;
  a.click();
}
</script>

<template>
  <!--- Change vue depending which button was clicked --->
  <div v-if="userSession" class="main my-4 mx-4">
    <template v-if="classeView">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button
        @click="changeVue()"
        class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text"
      >
        <span class="icon">
          <i class="fa fa-arrow-left is-flex has-text-black"></i>
        </span>
      </button>
    </template>
    <template v-if="detailView">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button
        @click="changeVueFiliere(filiereStore)"
        class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text"
      >
        <span class="icon">
          <i class="fa fa-arrow-left is-flex has-text-black"></i>
        </span>
      </button>
    </template>
    <template v-if="etudiantView">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button
        @click="changeVueClasse(classeStore)"
        class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text"
      >
        <span class="icon">
          <i class="fa fa-arrow-left is-flex has-text-black"></i>
        </span>
      </button>
    </template>
    <template v-if="profView">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button
        @click="changeVueFiliere(filiereStore)"
        class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text"
      >
        <span class="icon">
          <i class="fa fa-arrow-left is-flex has-text-black"></i>
        </span>
      </button>
    </template>
    <template v-if="linkView">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button
        @click="changeVue()"
        class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text"
      >
        <span class="icon">
          <i class="fa fa-arrow-left is-flex has-text-black"></i>
        </span>
      </button>
    </template>
    <template v-if="cafeteriaView">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button
        @click="changeVue()"
        class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text"
      >
        <span class="icon">
          <i class="fa fa-arrow-left is-flex has-text-black"></i>
        </span>
      </button>
    </template>
    <!--- Vfor insert infos relating to the vue selected --->
    <template v-if="filiereView">
      <card-info-vue
        v-for="filiere in allFiliere"
        :info="filiere.id"
        :class="filiere.id"
        @click="changeVueFiliere(filiere.id)"
      >
      </card-info-vue>
      <card-info-vue info="Liens utiles" class="links" @click="changeVueLink()">
      </card-info-vue>
      <card-info-vue
        info="Caféteria"
        class="cafeteria"
        @click="changeVueCafeteria()"
      >
      </card-info-vue>
    </template>
    <template v-if="classeView">
      <card-info-vue
        v-for="classe in allClasse"
        :info="classe.id"
        :class="classe.id"
        @click="changeVueClasse(classe.id)"
      >
      </card-info-vue>
      <card-info-vue info="Liste Professeurs" @click="changeVueProf()">
      </card-info-vue>
    </template>
    <template v-if="linkView">
      <card-link
        info="Attestation d'études"
        @click="
          link(
            'https://intra.heig-vd.ch/academique/attestation-etude/Pages/default.aspx'
          )
        "
      >
      </card-link>
      <card-link
        info="Calendrier Académique"
        @click="
          link(
            'https://intra.heig-vd.ch/academique/calendriers-academiques/Pages/calendriers-academiques.aspx'
          )
        "
      >
      </card-link>
      <card-link
        info="Justificatif d'absences"
        @click="
          link(
            'https://intra.heig-vd.ch/academique/formulaire-absence/Pages/default.aspx'
          )
        "
      >
      </card-link>
      <card-link info="Webmail" @click="link('https://webmail.heig-vd.ch/owa')">
      </card-link>
      <card-link
        info="Bulletin de notes"
        @click="
          link(
            'https://gaps.heig-vd.ch/consultation/notes/bulletin.php?id=17484&format=pdf&timestamp=1655105738532'
          )
        "
      >
      </card-link>
      <card-link
        info="Contrôles continus"
        @click="
          link(
            'https://gaps.heig-vd.ch/consultation/controlescontinus/consultation.php?idst=17484'
          )
        "
      >
      </card-link>
      <card-link
        info="Enseignement à choix"
        @click="link('https://gaps.heig-vd.ch/consultation/choixOption/')"
      >
      </card-link>
      <card-link
        info="Eval. des enseignants"
        @click="
          link(
            'https://gaps.heig-vd.ch/consultation/evaluationenseignements/index.php'
          )
        "
      >
      </card-link>
    </template>
    <template v-if="actualiteView">
      <card-link
        v-for="news in allNews"
        :info="news.title"
        @click="link('https://intra.heig-vd.ch' + news.link)"
      >
      </card-link>
    </template>
    <template v-if="detailView">
      <card-info-vue info="Liste étudiants" @click="changeVueEtudiant()">
      </card-info-vue>
    </template>
    <template v-if="profView">
      <card-prof
        v-for="prof in allProf"
        :info="prof.FullName"
        :class="prof.FullName"
        :email="prof.Email"
        :acronyme="prof.Acronyme"
      >
      </card-prof>
    </template>
    <template v-if="etudiantView">
      <card-prof
        v-for="prof in allEtudiant"
        :info="prof.FullName"
        :class="prof.FullName"
        :email="prof.Email"
        :acronyme="prof.Email"
      >
      </card-prof>
    </template>
    <template v-if="cafeteriaView">
      <template v-for="day in allMenu">
        <p
          class="mb-3"
          data-v-37ffd5dc=""
          style="text-align: center; margin-top: 30px; font-size: 1.2rem"
        >
          Menus du : <strong>{{ day.date }}</strong>
        </p>
        <Menu
          v-for="menu in day.menus"
          :starter="menu.starter"
          :mainCourse="menu.mainCourse"
          :dessert="menu.dessert"
        >
        </Menu>
      </template>
    </template>
  </div>
  <div v-else>
    <h1>Vous devez être connecté</h1>
  </div>
</template>

<style scoped>
#fixedbutton {
  position: fixed;
  bottom: 20px;
  right: 40px;
}

body {
  overflow-x: hidden;
}
</style>
