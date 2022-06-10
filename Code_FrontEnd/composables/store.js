import { ref } from "vue";

export const BASE_URL = "http://127.0.0.1:8000/api/";
//To know which course is called for more info
export let currentCoursId = ref(2);
export let currentMatiereId = ref("");

export let currentEventId = ref(null);
