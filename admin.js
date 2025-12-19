/********* AYAR *********/
const ADMIN_PASSWORD = "1234"; // değiştir

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
};
/************************/

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/********* GİRİŞ *********/
function adminLogin() {
  const pass = document.getElementById("adminPass").value;
  if (pass !== ADMIN_PASSWORD) return alert("Hatalı şifre");

  sessionStorage.setItem("admin", "1");
  document.querySelector(".box").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
  loadPhotos();
}

/********* KORUMA *********/
if (sessionStorage.getItem("admin") === "1") {
  document.querySelector(".box").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
  loadPhotos();
}

/********* FOTOĞRAFLARI ÇEK *********/
function loadPhotos() {
  db.collection("photos")
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      const area = document.getElementById("photoList");
      area.innerHTML = "";

      snapshot.forEach(doc => {
        const data = doc.data();

        const div = document.createElement("div");
        div.innerHTML = `
          <p><b>${data.rumuz}</b></p>
          <img src="${data.url}">
          <hr>
        `;
        area.appendChild(div);
      });
    });
}
