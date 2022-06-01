// import { useFetch } from '../composables/fetch.js';

// const { data: remarques } = useFetch(
//   ""
// );

export function mietteDePain(hash) {
    let crumbs = {};
    switch (hash) {
        case "#accueil":
            crumbs = {
                element1: "Horaire des cours",
                // element2 : " "
            }
            break;
        case "#login":
            crumbs = {
                element1: "Login",
                // element2 : " "
            }
            break;
        case "#agendaPerso":
            crumbs = {
                element1: "Agenda Personnel",
                // element2 : " "
            }
            break;
        case "#detailMatiere":
            crumbs = {
                element1: "Agenda Personnel",
                // element2 : "LabVeilSoc" //matiere.id
            }
            break;
        case "#detailRemarque":
            crumbs = {
                element1: "Agenda Personnel",
                // element2 : "Regarder film" //remarques.titre
            }
            break;
        case "#ajoutRemarque":
            crumbs = {
                element1: "Agenda Personnel",
                // element2 : "Nouvelle remarque privée"
            }
            break;
        case "#evenements":
            crumbs = {
                element1: "Evénements",
                // element2 : " "
            }
            break;
        case "#detailEvenement":
            crumbs = {
                element1: "Evènement",
                // element2 : "Titre événement" //evenement.titre
            }
            break;
        case "#ajoutDate":
            crumbs = {
                element1: "Horaire des cours",
                // element2 : "Ajouter une date"
            }
            break;
        case "#notifications":
            crumbs = {
                element1: "Notifications",
                // element2 : " "
            }
            break;
    }
    return [crumbs.element1];
}

