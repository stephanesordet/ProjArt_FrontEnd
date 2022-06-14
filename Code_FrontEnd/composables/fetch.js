import { ref } from "vue";

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
