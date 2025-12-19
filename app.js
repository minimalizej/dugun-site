// GİRİŞ
function login() {
  const nick = document.getElementById("nickname").value.trim();
  if (!nick) return alert("Rumuz gir");

  localStorage.setItem("rumuz", nick);
  window.location = "panel.html";
}

// PANEL KORUMA
if (location.pathname.includes("panel.html")) {
  const rumuz = localStorage.getItem("rumuz");
  if (!rumuz) location.href = "index.html";
  document.getElementById("welcome").innerText = rumuz + " hoş geldin";
}

// 🔥 FIREBASE CONFIG (BURAYI DOLDUR)
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
  storageBucket: "xxx.appspot.com",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// FOTOĞRAF YÜKLEME
function uploadPhoto() {
  const file = document.getElementById("photo").files[0];
  if (!file) return alert("Foto seç");

  const rumuz = localStorage.getItem("rumuz");
  const ref = storage.ref("photos/" + rumuz + "_" + Date.now());

  ref.put(file).then(() => {
    ref.getDownloadURL().then(url => {
      const img = document.createElement("img");
      img.src = url;
      document.getElementById("photos").appendChild(img);
    });
  });
}
