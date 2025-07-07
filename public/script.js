const firebaseConfig = {
  apiKey: "AIzaSyCu6a72nIlq8JP2IwzCZvHrZU3BbJP8HFY",
  authDomain: "eduhub-37795.firebaseapp.com",
  projectId: "eduhub-37795",
  storageBucket: "eduhub-37795.appspot.com",
  messagingSenderId: "490785901689",
  appId: "YOUR_FULL_APP_ID" // Replace with actual appId
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const topicsDiv = document.getElementById('topics');

auth.onAuthStateChanged((user) => {
  db.collection('courses').doc('computer-programming').collection('topics')
    .orderBy('order')
    .get()
    .then((querySnapshot) => {
      topicsDiv.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const topic = doc.data();
        const topicElement = document.createElement('div');
        topicElement.className = 'topic';
        if (!topic.isPaid || (topic.isPaid && user)) {
          topicElement.innerHTML = `
            <h2>${topic.title}</h2>
            <p><strong>Difficulty:</strong> ${topic.difficulty}</p>
            <p>${topic.content}</p>
            <p>Quiz: ${topic.quiz.question}</p>
            <select id="quiz-${doc.id}">
              ${topic.quiz.options.map((opt) => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
            <button onclick="checkAnswer('${doc.id}', '${topic.quiz.answer}')">Submit Quiz</button>
          `;
        } else {
          topicElement.className = 'topic locked';
          topicElement.innerHTML = `
            <h2>${topic.title} (Premium)</h2>
            <p><strong>Difficulty:</strong> ${topic.difficulty}</p>
            <p>Log in to access this topic.</p>
          `;
        }
        topicsDiv.appendChild(topicElement);
      });
    })
    .catch((error) => console.error("Error fetching topics: ", error));
});

function checkAnswer(docId, correctAnswer) {
  const userAnswer = document.getElementById(`quiz-${docId}`).value;
  alert(userAnswer === correctAnswer ? "Correct!" : "Incorrect. Try again!");
}

function signIn() {
  const email = prompt("Enter email:");
  const password = prompt("Enter password:");
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Logged in!"))
    .catch((error) => alert("Error: " + error.message));
}

function signOut() {
  auth.signOut().then(() => alert("Logged out!"));
}
