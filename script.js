// Initial button section
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const initialSection = document.getElementById('initial-section');
const quizSection = document.getElementById('quiz-section');
const angerMessage = document.getElementById('no-anger');

let noClickCount = 0;
const angryMessages = [
    "Hey! 😠 Niet klikken!",
    "STOP! 😡 Ik ben serieus!",
    "Waarom probeer je nog steeds?! 😤",
    "Je kunt me niet vangen! 💨",
    "Oké, dit wordt echt irritant nu... 😠",
    "LAAT ME MET RUST! 😡😡😡",
    "IK ZEG NEE! PUNT UIT! 😤💢"
];

// Make the No button move away when hovered or clicked
noBtn.addEventListener('mouseenter', () => {
    moveButton(noBtn);
    noBtn.classList.add('moving');
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton(noBtn);
    noClickCount++;
    
    if (noClickCount <= angryMessages.length) {
        showAngerMessage(angryMessages[noClickCount - 1]);
    } else {
        showAngerMessage("OKÉ OKÉ! IK GEEF TOE! 😭 Quin houdt WEL van je!");
    }
    
    setTimeout(() => {
        noBtn.classList.add('moving');
    }, 50);
});

function moveButton(button) {
    const container = button.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Random position within container bounds
    const maxX = containerRect.width - buttonRect.width - 20;
    const maxY = containerRect.height - buttonRect.height - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
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
const quizQuestions = [
    {
        question: "Hoe vaak denk je dat Quin aan jou denkt per dag?",
        answers: [
            { text: "1-5 keer", path: "a" },
            { text: "6-10 keer", path: "b" },
            { text: "Meer dan 100 keer (waarschijnlijk)", path: "c" },
            { text: "Constant, zonder te stoppen", path: "d" }
        ]
    },
    {
        question: "Wat is Quin's favoriete moment met jou?",
        answers: [
            { text: "Samen koffie drinken", path: "a" },
            { text: "Samen lachen", path: "b" },
            { text: "Elk moment samen", path: "c" },
            { text: "Wanneer jij gelukkig bent", path: "d" }
        ]
    },
    {
        question: "Als Quin een superkracht kon kiezen, wat zou het zijn?",
        answers: [
            { text: "Vliegen", path: "a" },
            { text: "Onzichtbaar zijn", path: "b" },
            { text: "Tijdreizen", path: "c" },
            { text: "Je gedachten kunnen lezen (om te zien hoeveel jij ook van hem houdt)", path: "d" }
        ]
    },
    {
        question: "Wat maakt Quin het gelukkigst?",
        answers: [
            { text: "Goed eten", path: "a" },
            { text: "Een goede film", path: "b" },
            { text: "Zijn hobby's", path: "c" },
            { text: "Wanneer jij lacht of gelukkig bent", path: "d" }
        ]
    },
    {
        question: "Hoe zou Quin jou beschrijven?",
        answers: [
            { text: "Leuk", path: "a" },
            { text: "Aardig", path: "b" },
            { text: "Speciaal", path: "c" },
            { text: "De meest prachtige, geweldige, perfecte persoon die er bestaat", path: "d" }
        ]
    }
];

const resultPaths = {
    "aaaaa": {
        title: "Hmm... 🤔",
        message: "Je kent Quin misschien niet zo goed, maar dat is oké! Hij houdt nog steeds heel veel van je, zelfs als je niet alles weet.",
        emoji: "💝"
    },
    "bbbbb": {
        title: "Je kent hem een beetje! 😊",
        message: "Je weet wel wat over Quin, maar er is nog veel meer te ontdekken. Het goede nieuws: hij houdt ZEKER nog van je!",
        emoji: "💕"
    },
    "ccccc": {
        title: "Goed gedaan! 🎉",
        message: "Je kent Quin best goed! En het belangrijkste: hij houdt nog steeds heel veel van je, zelfs meer dan je denkt!",
        emoji: "💖"
    },
    "ddddd": {
        title: "PERFECT! 🌟",
        message: "Je kent Quin perfect! En het zal je niet verbazen dat hij nog steeds (en altijd) heel veel van je houdt. Je bent speciaal voor hem!",
        emoji: "💗"
    },
    "default": {
        title: "Geweldig! 💝",
        message: "Quin houdt nog steeds heel veel van je, ongeacht je antwoorden! Deze quiz was eigenlijk alleen maar om te bevestigen wat je al wist: hij is verliefd op jou!",
        emoji: "💕"
    }
};

let currentQuestionIndex = 0;
let selectedPath = "";

function startQuiz() {
    currentQuestionIndex = 0;
    selectedPath = "";
    renderQuestion();
}

function renderQuestion() {
    const questionContainer = document.getElementById('question-container');
    const progressFill = document.getElementById('progress-fill');
    
    if (currentQuestionIndex >= quizQuestions.length) {
        showResult();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    
    progressFill.style.width = progress + '%';
    
    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="answer-options">
            ${question.answers.map((answer, index) => 
                `<button class="answer-btn" onclick="selectAnswer('${answer.path}')">${answer.text}</button>`
            ).join('')}
        </div>
    `;
}

function selectAnswer(path) {
    selectedPath += path;
    currentQuestionIndex++;
    renderQuestion();
}

function showResult() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const progressFill = document.getElementById('progress-fill');
    
    progressFill.style.width = '100%';
    questionContainer.classList.add('hidden');
    
    let result = resultPaths[selectedPath] || resultPaths.default;
    
    resultContainer.innerHTML = `
        <div class="result-image">${result.emoji}</div>
        <h2 class="result-title">${result.title}</h2>
        <p class="result-message">${result.message}</p>
        <p style="font-size: 1.5rem; color: #667eea; margin-top: 30px;">
            Met heel veel liefde,<br>
            Quin 💕
        </p>
    `;
    
    resultContainer.classList.remove('hidden');
}
