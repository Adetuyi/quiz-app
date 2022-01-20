const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const quizTime = 50;
let time = quizTime;
let countdown;
let hValues = [];
let qIndex = 0;

// Buttons
const startBtn = document.querySelector('.start-quiz');
const backBtn = document.querySelector('.back');
const clearBtn = document.querySelector('.clear-highscores');

// Containers
//Header
const viewHs = document.querySelector('#leaderboard');
const timer = document.querySelector('#time-left');

//Intro
const intro = document.querySelector('.intro');

//Quiz
const quiz = document.querySelector('.quiz');
const question = document.querySelector('.question');
const options = document.querySelector('.options');
const pass = document.querySelector('.pass');
const cState = document.querySelector('.correct-state');

// All Done
const completed = document.querySelector('.completed');
const score = document.querySelector('.score');
const form = document.querySelector('.initials-form');
const initials = document.querySelector('#initials');

//Highscore
const highsoresCon = document.querySelector('.highscores-container');
const highscores = document.querySelector('.highscores');

// Event listeners
startBtn.addEventListener('click', startQuiz);
backBtn.addEventListener('click', showIntro);
clearBtn.addEventListener('click', clearHs);
viewHs.addEventListener('click', showHs);
form.addEventListener('submit', setHs);
options.addEventListener('click', verifyClick);

document.addEventListener('DOMContentLoaded', () => {
    const hs = JSON.parse(localStorage.getItem('highscores'));
    if(hs){
        hValues = hs;
    }
})

function verifyClick(e){
    if(e.target.classList.contains('option')){
        options.removeEventListener('click', verifyClick);        
        answered(e.target);
    }
}

//Show Intro
function showIntro(){
    intro.classList.remove('hidden'); 
    highsoresCon.classList.add('hidden');
}

// Start quiz
function startQuiz(){
    intro.classList.add('hidden');
    quiz.classList.remove('hidden');    
    highsoresCon.classList.add('hidden');
    completed.classList.add('hidden');

    qIndex = 0;
    loadQuestion();

    // Start Coutdown
    setTimer();
}

// Load question
function loadQuestion(){
    if(qIndex === questions.length){
        showCompleted()
    }
    options.addEventListener('click', verifyClick);
    question.textContent = questions[qIndex].questionText;
    options.innerHTML = '';

    questions[qIndex].options.map(option => {
        options.innerHTML += `<div class='option'>${option}</div>`;
    })
}

// When a question is answered
function answered(target){
    if(qIndex === questions.length - 1){
        clearInterval(countdown);
    }
    pass.classList.remove('hidden');

    if(target.textContent === questions[qIndex].answer){
        cState.textContent = 'Correct!';
    }else{
        cState.textContent = 'Incorrect!';
        time -= 10;

        if(time <= 0){
            time = 0;
            showCompleted();
        }
    }

    qIndex++;

    setTimeout(() => {
        pass.classList.add('hidden');
        loadQuestion()
    }, 2000)
}

//Set and show timer
function setTimer(){
    // Reset time and show it
    time = quizTime;
    timer.textContent = time;

    countdown = setInterval(() => {
        time--;
        timer.textContent = time;

        if(time <= 0){
            showCompleted();
        }
    }, 1000)
}

// Show completed container
function showCompleted(){
    // Stop timer
    clearInterval(countdown);

    quiz.classList.add('hidden');
    completed.classList.remove('hidden');

    // Show score
    score.textContent = time;
}

// Add highscore to variable
function setHs(e){
    e.preventDefault();

    hValues.push([initials.value, time]);
    localStorage.setItem('highscores', JSON.stringify(hValues))

    showHs()
}

// Show highscores
function showHs(){
    intro.classList.add('hidden');
    quiz.classList.add('hidden');
    highsoresCon.classList.remove('hidden');
    completed.classList.add('hidden');

    // Stop timer if quiz is ongoing
    clearInterval(countdown)

    loadHs();
}

//Load highscores to DOM
function loadHs(){
    highscores.innerHTML = '';

    hValues.map(hs => {
        highscores.innerHTML += `<li>${hs[0]} - ${hs[1]}</li>`;
    })
}

// Clear highscores
function clearHs(){
    hValues = [];    
    localStorage.removeItem('highscores');

    loadHs();
}