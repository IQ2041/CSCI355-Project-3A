/* Script for displaying card questions using API data */

let questions = []; 
let selectedQuestions = [];
let currentQ = 0;
let score = 0;

fetch('/quiz/api')
  .then(res => res.json())
  .then(data => {
    questions = data;
    selectedQuestions = questions;
    currentQ = 0;
    displayQuestion(); // Start the quiz
  })
  .catch(err => console.error("Error loading questions from API:", err));

function displayQuestion() {
  const questionData = selectedQuestions[currentQ];
  const container = document.getElementById("question_bank");

  if (!container) {
    console.error("Container element not found");
    return;
  }

  container.innerHTML = "";

  const questionText = document.createElement("p");
  questionText.className = "question-text";
  questionText.innerHTML = questionData.question; // HTML-safe
  container.appendChild(questionText);

  const options = ["A", "B", "C", "D"];
  options.forEach(option => {
    const button = document.createElement("button");
    button.className = "question-button";
    button.innerText = `${option}. ${questionData[option]}`;
    button.onclick = () => selectAnswer(option, questionData.answer);
    container.appendChild(button);
  });

  if (currentQ < selectedQuestions.length - 1) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next Question";
    nextButton.className = "btn btn-success next-button";
    nextButton.onclick = () => {
      currentQ++;
      displayQuestion();
    };
    container.appendChild(nextButton);
  } else {
    const completeButton = document.createElement("button");
    completeButton.innerText = "View Results";
    completeButton.className = "btn btn-warning mt-3";
    completeButton.onclick = () => {
      sessionStorage.setItem("finalScore", score);
      window.location.href = "result.html";
    };
    container.appendChild(completeButton);
  }
}

function selectAnswer(selectedOption, correctAnswer) {
  const buttons = document.querySelectorAll(".question-button");

  buttons.forEach(button => {
    const option = button.innerText.charAt(0);

    if (option === correctAnswer) {
      button.style.backgroundColor = "green";
      button.style.color = "white";
    } else {
      button.style.backgroundColor = "red";
      button.style.color = "white";
    }

    button.disabled = true;
  });

  if (selectedOption === correctAnswer) {
    score++;
    console.log("Correct! Score:", score);
  } else {
    console.log("Incorrect!");
  }
}


// Show a welcome message if available
window.addEventListener('load', () => {
  const username = sessionStorage.getItem("username");
  const guest = sessionStorage.getItem('isGuest');

  const welcome = document.getElementById("welcome-message");
  if (welcome) {
    if (username) {
      welcome.textContent = `Hello ${username}.`;
    } else if (guest) {
      welcome.textContent = 'Welcome, Guest';
    } else {
      welcome.textContent = 'Welcome!';
    }
  }
});

/* Sign out logic */
const logoutButton = document.getElementById('logout-btn');
logoutButton?.addEventListener('click', () => {
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('isGuest');
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = 'signup';
  }
});
