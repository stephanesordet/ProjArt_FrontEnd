import { ref } from "vue";


export function useFetch(url) {
  const data = ref(null);

  async function loadJson() {
    const res = await fetch(url);
    const json = await res.json();
    data.value = json;
    return {data};
  }

  loadJson();
  return { data };
}

export async function useFetchLogin(user, mdp) {
  console.log(mdp);
  async function loadHtml(email, password) {
    const u = /* encodeURIComponent */(email);
    const p = /* encodeURIComponent */(password);
    const res = await fetch('http://127.0.0.1:8000/api/login/' + p + '/' + u);
    const html = await res.text();
    if(html == 'user found and connected'){
      alert("Connexion réussie");
      sessionStorage.setItem("user", email);
      window.location.href = "#accueil";
      window.location.reload();
      console.log('hello')
      return true;
    } else {
      html == 'User not found'
      alert("Connexion échouée");
      return false;
    }
  }

 loadHtml(user, mdp);

}