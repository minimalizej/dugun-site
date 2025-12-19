function login() {
  const nick = document.getElementById("nickname").value.trim();

  if (!nick) {
    alert("Lütfen rumuz girin");
    return;
  }

  localStorage.setItem("rumuz", nick);
  window.location.href = "panel.html";
}
