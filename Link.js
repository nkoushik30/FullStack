function searchMovie() {
    const title = document.getElementById("movieTitle").value.trim();

    if (!title) {
        document.getElementById("movieResult").innerText = "Please enter a movie title.";
        return;
    }

    fetch(`http://localhost:5000/api/movie?title=${encodeURIComponent(title)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("movieResult").innerText = data.error;
            } else {
                document.getElementById("movieResult").innerText = `
                    Title: ${data.title}
                    Year: ${data.year || "N/A"}
                    Genre: ${data.genre || "N/A"}
                    Certificate: ${data.certificate || "N/A"}
                    Runtime: ${data.runtime || "N/A"}
                    Rating: ${data.rating || "N/A"}
                    Votes: ${data.votes || "N/A"}
                    Description: ${data.desc || "N/A"}
                `;
            }
        })
        .catch(error => {
            document.getElementById("movieResult").innerText = "Error fetching movie data.";
            console.error("Fetch error:", error);
        });
}
import admin from "firebase-admin";
import fs from "fs";

// Read Firebase credentials from the JSON file
const serviceAccount = JSON.parse(fs.readFileSync("./config/firebase-service-account.json", "utf8"));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com",
});

console.log("Firebase Admin Initialized Successfully");
