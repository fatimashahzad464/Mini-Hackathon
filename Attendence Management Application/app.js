import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,  } from   "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {getDatabase, set , ref,onValue  }from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
  





const auth = getAuth();
const database = getDatabase();



const signup = () => {
    let firstname = document.getElementById("first-name").value;
    let lastname = document.getElementById("last-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    let repeatPassword = document.getElementById("signup-repeat-password").value;

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
        alert("Password should be at least 8 characters long.");
        return;
    }

    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        alert("Password should include both uppercase and lowercase letters.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
            alert("Successfully Signed Up");
            
            let userId = response.user.uid;
            let usersReference = ref(database, "users/" + userId);
            let usersObj = {
                firstname: firstname,
                lastname: lastname,
                email: email,
            };
            set(usersReference, usersObj);

    
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log("Successfully Logged In");
                    window.location.href = "./login.html"; 
                })
                .catch((error) => {
                    alert("Login error: " + error.message);
                });


        })
        .catch((error) => {
            alert("Please try again: " + error.message);
        });
}

let signup_btn = document.getElementById("signupBtn");
 signup_btn.addEventListener("click", signup);
