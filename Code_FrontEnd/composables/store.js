import {
    ref
} from "vue";

export const BASE_URL = "http://localhost:8000/api/";
//To know which course is called for more info
export let currentCoursId = ref(2);
export let currentMatiereId = ref("");

export let currentEventId = ref(null);

export const idDetailsEvent = ref(sessionStorage.getItem("idDetailsEvent"));
export const idDetailsMatiere = ref(sessionStorage.getItem("idDetailsMatiere"));
export const matiere_idDetailsMatiere = ref(
  sessionStorage.getItem("matiere_idDetailsMatiere")
);

export const todayDate = new Date().toISOString().split('T')[0];