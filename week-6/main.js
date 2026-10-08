// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { get, getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
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


// Function to save contact message
function saveContactMessage(name, email, message) {

    // Reference to contactMessages
    const contactRef = ref(db, "contactMessages");


    // Generate a unique ID
    const newContactRef = push(contactRef);


    // Save data to Firebase
    set(newContactRef, {

        name: name,

        email: email,

        message: message

    })


    // If data is saved successfully
    .then(() => {

        console.log("Message sent successfully");


        // Show submitted data on webpage
        document.getElementById("contact-result").innerHTML =

            "<h3>Message Sent Successfully!</h3>" +

            "<p><strong>Name:</strong> " + name + "</p>" +

            "<p><strong>Email:</strong> " + email + "</p>" +

            "<p><strong>Message:</strong> " + message + "</p>";


        // Clear the form
        document.getElementById("contact-form").reset();

    })


    // If there is an error
    .catch((error) => {

        console.error("Error sending message:", error);


        document.getElementById("contact-result").textContent =
            "Error sending message.";

    });

}


// When the form is submitted
document.getElementById("contact-form").addEventListener(
    "submit",
    function(event) {

        // Prevent page from refreshing
        event.preventDefault();


        // Get name
        const name =
            document.getElementById("contact-name").value;


        // Get email
        const email =
            document.getElementById("contact-email").value;


        // Get message
        const message =
            document.getElementById("contact-message").value;


        // Save the data to Firebase
        saveContactMessage(name, email, message);

    }
);