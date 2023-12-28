import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from   "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
  import {
    getDatabase,
    set,
    ref,
    onValue,
    push,
  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
  

  const auth = getAuth();
  const database = getDatabase();
  
  let done = document.querySelector(".done");
  
  const addClassFunc = () => {
    let chooseTimings = document.getElementById("chooseTimings");
    let chooseDay = document.getElementById("chooseDay");
    let chooseCourse = document.getElementById("chooseCourse");
    let batchNo = document.querySelector(".batchNo");
    let teachersName = document.querySelector(".teachersName");
    let classRef = ref(database, "classes/");
    if (
      !chooseCourse.value ||
      !chooseDay.value ||
      !chooseCourse.value ||
      !batchNo.value ||
      !teachersName.value
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "kindly fill all fields",
      });
    } else {
      let classInfo = {
        classTimings: chooseTimings.value,
        classDays: chooseDay.value,
        courseName: chooseCourse.value,
        batchNo: batchNo.value,
        teachersName: teachersName.value,
      };
      push(classRef, classInfo)
        .then((resolve) => {
          Swal.fire("class created");
          window.location.href = "./adminDashBoard.html";
        })
        .catch((error) => {
          console.log("class not created");
        });
    }
  };
  
  done.addEventListener("click", addClassFunc);