import { ref } from "vue";

export function useFetch(url) {
  const data = ref(null);

  async function loadJson() {
    const res = await fetch(url);
    const json = await res.json();
    data.value = json;
  }

  loadJson();

  return { data };
}
