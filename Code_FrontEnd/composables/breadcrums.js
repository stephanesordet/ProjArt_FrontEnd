import { ref } from "vue";

const hash = ref(window.location.hash);
export let crumbs = {};

// import { useFetch } from '../composables/fetch.js';

// const { data: remarques } = useFetch(
//   ""
// );

window.addEventListener("hashchange",() => {
    hash.value = window.location.hash;
    switch (hash.value){
        case "#accueil" :
            crumbs = {
                element1 : "Horaire des cours",
            }
        break;
        case "#login" :
            crumbs = {
                element1 : "Login",
            }
        break;
        case "#agendaPerso" :
            crumbs = {
                element1 : "Agenda Personnel",
            }
        break;
        case "#detailMatiere" :
            crumbs = {
                element1 : "Agenda Personnel",
                // element2 : remarques.fk_matiere
            }
        break;
        case "#detailRemarque":
            crumbs = {
                element1 : "Agenda Personnel",
                // element2 : remarques.titre
            }
        break;
        case "#evenements" :
            crumbs = {
                element1 : "Evénements",
            }
        break;
        case "#detailEvenement" :
            crumbs = {
                element1 : "Evènement",
                // element2 : remarques.fk_matiere
            }
        break;
        case "#ajoutDate" :

        break;

    }
}
);