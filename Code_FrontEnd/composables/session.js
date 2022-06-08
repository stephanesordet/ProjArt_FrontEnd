import { ref } from "vue";

export function createSession(value) {
  const session = ref(null);

  sessionStorage.setItem("user", value);

  session.value = sessionStorage.getItem("user");

  return session.value;
}

export function killSession(name) {
  sessionStorage.removeItem(name);
}
