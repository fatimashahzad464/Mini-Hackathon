import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from   "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";;
  import {
    getDatabase,
    set,
    ref,
    onValue,
    push,
  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
  
  
  const auth = getAuth();
  const database = getDatabase();
  
  const createStudent = () => {
    let studentName = document.querySelector(".studentName").value;
    let studentEmail = document.querySelector(".studentEmail").value;
    let chooseCourse = document.querySelector("#chooseCourse").value; // Fix this line
    let batchNo = document.querySelector(".batchNo").value;
    if (
      !studentName ||
      !studentEmail ||
      !chooseCourse || // Fix the variable name here
      !batchNo
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kindly fill all fields",
      });
    } else if (studentEmail === "admin@gmail.com") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "admin can't become a student",
      });
    } else {
      let stdRef = ref(database, "students/" );
      let studentObj = {
        studentName,
        studentEmail,
        chooseCourse, // Fix the variable name here
        batchNo,
      };
  

  push(stdRef, studentObj)
        .then((resolve) => {
          Swal.fire("student created");
          window.location.href = "./adminDashBoard.html";
        })
        .catch((error) => {
          console.log("student not created");
        });
    }


    
  };
  let done = document.querySelector(".done");
  done.addEventListener("click", createStudent);
  