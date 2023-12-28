import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from  "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
  import {
    getDatabase,
    set,
    ref,
    onValue,
    push,
  } from  "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
  
  const auth = getAuth();
  const database = getDatabase();
  let createClassButton = document.querySelector("#createClassButton");
  createClassButton.addEventListener("click", () => {
    window.location.href = "./classSchedule.html";
  });
  let createStudentButton = document.querySelector("#createStudentButton");
  createStudentButton.addEventListener("click", () => {
    window.location.href = "./createStudent.html";
  });
  let markAttendance = document.querySelector("#markAttendance");
  markAttendance.addEventListener("click", () =>{
     window.location.href = "./markAttendence.html";
  })
  let courseName;
  
  let AllClassesDiv = document.querySelector(".AllClassesDiv");
  let seeAllClassesButton = document.querySelector("#seeAllClassesButton");
  const seeClassesFunc = () => {
    let classRef = ref(database, "classes/");
    onValue(classRef, (snapshot) => {
      snapshot.forEach((element) => {
        let classes = document.createElement("div");
  
        // Create paragraph elements for each data item
         courseName = document.createElement("h1");
        let batchNo = document.createElement("p");
        let classDays = document.createElement("p");
        let classTimings = document.createElement("p");
        let teacherName = document.createElement("p");
  
        // Set the text content for each paragraph element based on your data
        courseName.textContent = "course name: " + element.val().courseName;
        batchNo.textContent = "Batch No: " + element.val().batchNo;
        classDays.textContent = "Class Days: " + element.val().classDays;
        classTimings.textContent = "Class Timings: " + element.val().classTimings;
        teacherName.textContent = "Teacher Name: " + element.val().teachersName;
          //giving classes
          classes.classList.add("class-item");
        // Append the paragraph elements to the classes div
        classes.appendChild(courseName);
        classes.appendChild(batchNo);
        classes.appendChild(classDays);
        classes.appendChild(classTimings);
        classes.appendChild(teacherName);
          AllClassesDiv.appendChild(classes);
      });
    });
  };
  
  seeAllClassesButton.addEventListener("click", () => {
    AllClassesDiv.innerHTML = ""
    seeClassesFunc()
  });