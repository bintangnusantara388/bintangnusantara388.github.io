
// Step 1: Initialize the IndexedDB
let db;
function initDB() {
    const request = indexedDB.open("ContactDB", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        const objectStore = db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: false });
        objectStore.createIndex("message", "message", { unique: false });
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Database initialized successfully");
    };

    request.onerror = function (event) {
        console.error("Database failed to open", event);
    };
}

// Step 2: Function to save form data to IndexedDB
function saveMessage() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const transaction = db.transaction(["messages"], "readwrite");
    const objectStore = transaction.objectStore("messages");

    const newMessage = { name, email, message };
    const request = objectStore.add(newMessage);

    request.onsuccess = function () {
        console.log("Message saved successfully!");
        alert("Pesan Anda telah disimpan!");
        document.getElementById("name").value = '';
        document.getElementById("email").value = '';
        document.getElementById("message").value = '';
    };

    request.onerror = function () {
        console.error("Error saving message", request.error);
    };
}

// Step 3: Event listener to trigger save on form submission
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    saveMessage();
});

// Initialize the database on page load
window.onload = initDB;

