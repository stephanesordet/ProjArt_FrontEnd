import {
  ref
} from "vue";
// ---------------------- This file contains variable that are used in different files -----------------------------
export const BASE_URL = "http://localhost:8000/api/";
export const currentCoursId = ref(null);
export const currentEventId = ref(null);
export const idDetailsEvent = ref(sessionStorage.getItem("idDetailsEvent"));
export const idDetailsMatiere = ref(sessionStorage.getItem("idDetailsMatiere"));
export const matiere_idDetailsMatiere = ref(
  sessionStorage.getItem("matiere_idDetailsMatiere")
);
export const todayDate = new Date().toISOString().split('T')[0];