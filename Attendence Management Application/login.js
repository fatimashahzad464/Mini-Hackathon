import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

const loginFunc = () => {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((resolve) => {
        Swal.fire("successfully login");
      let uniqueId = auth.currentUser.uid;
      console.log(uniqueId);
      let adminReference = ref(database, "users/" + uniqueId);
      onValue(adminReference, (snapshot) => {
        let checkKey = snapshot.val().adminKey;
        console.log(snapshot.val().adminKey);
        if (checkKey == "admin") {
        Swal.fire("you are admin");
          window.location.href = "./adminDashBoard.html";
        } else {
          return;
        }
      });
    })
    .catch((error) => {
      Swal.fire("error");
      console.log(error);
    });
};
// const loginBtn = document.getElementById("done");
// done.addEventListener("click", doneFunc);
// done.addEventListener("click", () => {
//   window.location.href = "./adminDashBoard.html";
// });

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {

window.location.href = "./adminDashBoard.html";
});


