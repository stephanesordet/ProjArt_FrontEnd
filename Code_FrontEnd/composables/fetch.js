import { ref } from "vue";
import axios from "axios";
import { def } from "@vue/shared";

export function useFetch(url) {
  const data = ref(null);

  async function loadJson() {
    const res = await fetch(url);
    console.log(url);
    const json = await res.json();
    data.value = json;
    return { data };
  }

  loadJson();
  return { data };
}
