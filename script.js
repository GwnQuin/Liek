// Initial button section
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const initialSection = document.getElementById('initial-section');
const quizSection = document.getElementById('quiz-section');
const angerMessage = document.getElementById('no-anger');

let noClickCount = 0;
let inactivityTimer = null;
let angle = 0;
let radius = 150;
let isMoving = false;

const angryMessages = [
    "Hey! 😠 Niet klikken!",
    "STOP! 😡 Ik ben serieus!",
    "Waarom probeer je nog steeds?! 😤",
    "Je kunt me niet vangen! 💨",
    "Oké, dit wordt echt irritant nu... 😠",
    "LAAT ME MET RUST! 😡😡😡",
    "IK ZEG NEE! PUNT UIT! 😤💢"
];

// Make the No button move around the Yes button (Quin) in a circle
noBtn.addEventListener('mouseenter', () => {
    startMovingAroundQuin();
    resetInactivityTimer();
});

noBtn.addEventListener('mousemove', () => {
    resetInactivityTimer();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startMovingAroundQuin();
    noClickCount++;
    
    if (noClickCount <= angryMessages.length) {
        showAngerMessage(angryMessages[noClickCount - 1]);
    } else {
        showAngerMessage("OKÉ OKÉ! IK GEEF TOE! 😭 Quin houdt WEL van je!");
    }
    
    resetInactivityTimer();
});

function startMovingAroundQuin() {
    if (isMoving) return;
    isMoving = true;
    noBtn.classList.add('moving');
    moveAroundQuin();
}

function moveAroundQuin() {
    if (!isMoving) return;
    
    const container = noBtn.parentElement;
    const yesRect = yesBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate center position of Yes button relative to container
    const centerX = yesRect.left - containerRect.left + yesRect.width / 2;
    const centerY = yesRect.top - containerRect.top + yesRect.height / 2;
    
    // Move in circle around Yes button
    angle += 0.2;
    const x = centerX + Math.cos(angle) * radius - noBtn.offsetWidth / 2;
    const y = centerY + Math.sin(angle) * radius - noBtn.offsetHeight / 2;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    
    requestAnimationFrame(moveAroundQuin);
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        stopMoving();
    }, 5000);
}

function stopMoving() {
    isMoving = false;
    noBtn.classList.remove('moving');
}

function showAngerMessage(message) {
    angerMessage.textContent = message;
    angerMessage.classList.remove('hidden');
    
    setTimeout(() => {
        angerMessage.classList.add('hidden');
    }, 3000);
}

// When Yes button is clicked, show quiz
yesBtn.addEventListener('click', () => {
    initialSection.classList.remove('active');
    initialSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    quizSection.classList.add('active');
    startQuiz();
});

// Quiz logic
let quizScore = 0;
let hasFailed = false;
let wrongAnswers = [];

const quizQuestions = [
    {
        question: "Heb je een pik inmiddel?",
        answers: [
            { text: "Ja", path: "fail", action: "instantFail", isCorrect: false },
            { text: "Nee", path: "continue", action: "good", isCorrect: true }
        ]
    },
    {
        question: "Ben je een furry?",
        answers: [
            { text: "Ja", path: "fail", action: "instantFail", isCorrect: false },
            { text: "Nee", path: "continue", action: "good", isCorrect: true }
        ]
    },
    {
        question: "Ademt Quin nog?",
        answers: [
            { text: "Ja", path: "continue", action: "positive", isCorrect: true },
            { text: "Nee", path: "continue", action: "negative", isCorrect: false }
        ]
    },
    {
        question: "Ben je vreemd gegaan?",
        answers: [
            { text: "Ja", path: "fail", action: "cheatFail", isCorrect: false },
            { text: "Nee", path: "continue", action: "veryPositive", isCorrect: true }
        ]
    },
    {
        question: "Besta je nog?",
        answers: [
            { text: "Ja", path: "continue", action: "positive", isCorrect: true },
            { text: "Nee", path: "continue", action: "positive", isCorrect: true }
        ]
    },
    {
        question: "Ben je een bleg?",
        answers: [
            { text: "Ja", path: "fail", action: "instantFail", isCorrect: false },
            { text: "Nee", path: "continue", action: "good", isCorrect: true }
        ]
    },
    {
        question: "Heb je een boy best friend?",
        answers: [
            { text: "Ja", path: "continue", action: "wrong", isCorrect: false },
            { text: "Nee", path: "continue", action: "good", isCorrect: true }
        ]
    }
];

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    hasFailed = false;
    wrongAnswers = [];
    renderQuestion();
}

function renderQuestion() {
    const questionContainer = document.getElementById('question-container');
    const progressFill = document.getElementById('progress-fill');
    
    if (currentQuestionIndex >= quizQuestions.length || hasFailed) {
        showResult();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    
    progressFill.style.width = progress + '%';
    
    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="answer-options">
            ${question.answers.map((answer) => 
                `<button class="answer-btn" onclick="selectAnswer('${answer.action}', ${currentQuestionIndex}, ${answer.isCorrect})">${answer.text}</button>`
            ).join('')}
        </div>
    `;
}

function selectAnswer(action, questionIndex, isCorrect) {
    // Track wrong answers
    if (!isCorrect && questionIndex < quizQuestions.length) {
        const question = quizQuestions[questionIndex];
        wrongAnswers.push(question.question);
    }
    switch(action) {
        case "instantFail":
            hasFailed = true;
            showFailResult("FAIL! ❌ Quin houdt niet meer van je!");
            break;
        case "cheatFail":
            hasFailed = true;
            showFailResult("Hoe durf je! Dit wordt naar Quin verstuurd! 😡");
            break;
        case "good":
            quizScore += 1;
            currentQuestionIndex++;
            renderQuestion();
            break;
        case "positive":
            quizScore += 2;
            currentQuestionIndex++;
            renderQuestion();
            break;
        case "veryPositive":
            quizScore += 3;
            currentQuestionIndex++;
            renderQuestion();
            break;
        case "negative":
            quizScore -= 2;
            currentQuestionIndex++;
            renderQuestion();
            break;
        case "wrong":
            quizScore -= 1;
            currentQuestionIndex++;
            renderQuestion();
            break;
        default:
            currentQuestionIndex++;
            renderQuestion();
    }
}

function showResult() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const progressFill = document.getElementById('progress-fill');
    
    progressFill.style.width = '100%';
    questionContainer.classList.add('hidden');
    
    let result;
    if (hasFailed) {
        result = {
            title: "FAIL! ❌",
            message: "Quin houdt niet meer van je!",
            emoji: "😢"
        };
    } else if (quizScore >= 8) {
        result = {
            title: "PERFECT! 🌟",
            message: "Quin houdt nog heel veel van je! Je bent perfect!",
            emoji: "💗"
        };
    } else if (quizScore >= 5) {
        result = {
            title: "Geweldig! 💝",
            message: "Quin houdt nog steeds van je!",
            emoji: "💕"
        };
    } else if (quizScore >= 0) {
        result = {
            title: "Oké... 🤔",
            message: "Quin houdt nog van je, maar je moet beter je best doen!",
            emoji: "💝"
        };
    } else {
        result = {
            title: "Hmm... 😟",
            message: "Quin houdt nog van je, maar je hebt minpunten gekregen.",
            emoji: "💔"
        };
    }
    
    let wrongAnswersSection = '';
    if (wrongAnswers.length > 0) {
        wrongAnswersSection = `
            <div style="margin-top: 40px; padding: 20px; background: #ffe6e6; border-radius: 10px; text-align: left;">
                <h3 style="color: #d32f2f; margin-bottom: 15px; font-size: 1.5rem;">Wat je fout deed: 😔</h3>
                <ul style="list-style: none; padding: 0;">
                    ${wrongAnswers.map((answer, index) => 
                        `<li style="margin: 10px 0; padding-left: 25px; position: relative;">
                            <span style="position: absolute; left: 0;">❌</span>
                            ${answer}
                        </li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }
    
    resultContainer.innerHTML = `
        <div class="result-image">${result.emoji}</div>
        <h2 class="result-title">${result.title}</h2>
        <p class="result-message">${result.message}</p>
        ${wrongAnswersSection}
        <p style="font-size: 1.5rem; color: #667eea; margin-top: 30px;">
            Met heel veel liefde,<br>
            Quin 💕
        </p>
    `;
    
    resultContainer.classList.remove('hidden');
}

function showFailResult(message) {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const progressFill = document.getElementById('progress-fill');
    
    progressFill.style.width = '100%';
    questionContainer.classList.add('hidden');
    
    let wrongAnswersSection = '';
    if (wrongAnswers.length > 0) {
        wrongAnswersSection = `
            <div style="margin-top: 30px; padding: 20px; background: #ffe6e6; border-radius: 10px; text-align: left;">
                <h3 style="color: #d32f2f; margin-bottom: 15px; font-size: 1.5rem;">Wat je fout deed: 😔</h3>
                <ul style="list-style: none; padding: 0;">
                    ${wrongAnswers.map((answer, index) => 
                        `<li style="margin: 10px 0; padding-left: 25px; position: relative;">
                            <span style="position: absolute; left: 0;">❌</span>
                            ${answer}
                        </li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }
    
    resultContainer.innerHTML = `
        <div class="result-image">😡</div>
        <h2 class="result-title" style="color: #f5576c;">${message}</h2>
        ${wrongAnswersSection}
        <p style="font-size: 1.5rem; color: #667eea; margin-top: 30px;">
            Met heel veel liefde,<br>
            Quin 💕
        </p>
    `;
    
    resultContainer.classList.remove('hidden');
}
