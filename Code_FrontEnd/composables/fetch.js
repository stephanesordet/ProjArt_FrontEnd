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

export function useFetchLogin(user, mdp) {
  

  async function loadHtml() {
    const res = await fetch('http://127.0.0.1:8000/api/login/' + mdp + '/' + user);
    const html = await res.text();
    if(html == 'user found and connected'){
      console.log('hello')
      return true;
    }
  }

  loadHtml();

}

