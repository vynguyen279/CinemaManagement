function signOut() {
  localStorage.clear();
  window.location.href = "/login";
}

export default signOut;
