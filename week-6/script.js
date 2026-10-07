
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDa9M4ttTJ8Tzdbk728yI-sJIkAJvDWS4E",
    authDomain: "mobile-programming-d3d8d.firebaseapp.com",
    projectId: "mobile-programming-d3d8d",
    storageBucket: "mobile-programming-d3d8d.firebasestorage.app",
    messagingSenderId: "714397630277",
    appId: "1:714397630277:web:1cee1a1e904696bd77882c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

console.log(db);

function writeUserData(userId, name, age, gender, grade, school, address, phone, email, hobbies, skills) {
  return set(ref(db, 'users/' + userId), {
    name: name,
    age: age,
    gender: gender,
    grade: grade,
    school: school,
    address: address,
    phone: phone,
    email: email,
    hobbies: hobbies,
    skills: skills
  });
}


window.writeUserData = writeUserData;

function readUser(userId) {

  const userRef = ref(db, 'users/' + userId);

  return get(userRef)
    .then((snapshot) => {

      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available for " + userId);
        return null;
      }

    })
    .catch((error) => {
      console.error("Error reading user data:", error);
    });
}

window.readUser = readUser;