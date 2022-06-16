import { ref } from "vue";

// ---------------------- Fetch reusable -----------------------------
export function useFetch(url) {
  const data = ref(null);

  async function loadJson() {
    const res = await fetch(url);
    const json = await res.json();
    data.value = json;
    return { data };
  }

  loadJson();
  return { data };
}
