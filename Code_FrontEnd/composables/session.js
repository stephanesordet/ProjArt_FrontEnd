import { ref } from "vue";

// ---------------------- Function that create userSession  -----------------------------
export function createSession(value) {
  const session = ref(null);
  sessionStorage.setItem("user", value);
  session.value = sessionStorage.getItem("user");
  return session.value;
}

// ---------------------- Function that kill userSession  -----------------------------
export function killSession(name) {
  sessionStorage.removeItem(name);
}
