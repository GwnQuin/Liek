// Initial button section
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const initialSection = document.getElementById('initial-section');
const quizSection = document.getElementById('quiz-section');
const angerMessage = document.getElementById('no-anger');

let noClickCount = 0;
let initialNoButtonClickCount = 0; // Track clicks on initial "nee" button

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
    moveButtonAway(noBtn);
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButtonAway(noBtn);
    initialNoButtonClickCount++;
    noClickCount++;
    
    if (initialNoButtonClickCount < 4) {
        if (noClickCount <= angryMessages.length) {
            showAngerMessage(angryMessages[noClickCount - 1]);
        } else {
            showAngerMessage("OKÉ OKÉ! IK GEEF TOE! 😭 Quin houdt WEL van je!");
        }
    } else {
        // After 4 clicks on initial "nee" button: AK47 sequence
        handleInitialAK47Sequence(noBtn);
    }
});

function moveButtonAway(button) {
    const container = button.parentElement;
    const containerRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    const containerCenterX = containerRect.width / 2;
    const containerCenterY = containerRect.height / 2;
    const yesCenterX = yesRect.left - containerRect.left + yesRect.width / 2;
    const yesCenterY = yesRect.top - containerRect.top + yesRect.height / 2;
    
    let attempts = 0;
    let newX, newY;
    
    // Try to find a position away from Yes button
    do {
        const maxX = containerRect.width - buttonRect.width - 20;
        const maxY = containerRect.height - buttonRect.height - 20;
        
        // Random position but try to be away from center
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        
        // Calculate distance from Yes button center
        const newCenterX = newX + buttonRect.width / 2;
        const newCenterY = newY + buttonRect.height / 2;
        const distanceFromYes = Math.sqrt(
            Math.pow(newCenterX - yesCenterX, 2) + 
            Math.pow(newCenterY - yesCenterY, 2)
        );
        
        // Minimum distance from Yes button (at least 150px)
        const minDistance = 150;
        
        if (distanceFromYes >= minDistance || attempts > 50) {
            break;
        }
        attempts++;
    } while (attempts < 100);
    
    button.style.position = 'absolute';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    button.style.transition = 'all 0.3s ease';
}

// Timer functionality
const startDate = new Date('2026-01-12T18:32:00');
const timerElement = document.getElementById('timer');

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24) % 7;
    const weeks = Math.floor(diff / 1000 / 60 / 60 / 24 / 7) % 4;
    const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30.44);
    
    timerElement.innerHTML = `
        <div class="timer-item">
            <span class="timer-number">${months}</span>
            <span class="timer-label-small">${months === 1 ? 'Maand' : 'Maanden'}</span>
        </div>
        <div class="timer-item">
            <span class="timer-number">${weeks}</span>
            <span class="timer-label-small">${weeks === 1 ? 'Week' : 'Weken'}</span>
        </div>
        <div class="timer-item">
            <span class="timer-number">${days}</span>
            <span class="timer-label-small">${days === 1 ? 'Dag' : 'Dagen'}</span>
        </div>
        <div class="timer-item">
            <span class="timer-number">${hours}</span>
            <span class="timer-label-small">${hours === 1 ? 'Uur' : 'Uren'}</span>
        </div>
        <div class="timer-item">
            <span class="timer-number">${minutes}</span>
            <span class="timer-label-small">${minutes === 1 ? 'Minuut' : 'Minuten'}</span>
        </div>
        <div class="timer-item">
            <span class="timer-number">${seconds}</span>
            <span class="timer-label-small">${seconds === 1 ? 'Seconde' : 'Seconden'}</span>
        </div>
    `;
}

// Update timer every second
setInterval(updateTimer, 1000);
updateTimer();

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
            { text: "Nee", path: "continue", action: "murderQuestion", isCorrect: false }
        ]
    },
    {
        question: "Heb je hem vermoord ofzo? 😰",
        answers: [
            { text: "Ja", path: "continue", action: "veryNegative", isCorrect: false },
            { text: "Nee zou ik nooit durven hou te veel van hem🥰 ", path: "continue", action: "negative", isCorrect: true }
        ],
        isConditional: true
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
        question: "Ben je een belg?",
        answers: [
            { text: "Ja", path: "continue", action: "softFail", isCorrect: false },
            { text: "Nee", path: "continue", action: "good", isCorrect: true }
        ]
    },
    {
        question: "Heb je een boy best friend?",
        answers: [
            { text: "Ja", path: "continue", action: "wrong", isCorrect: false },
            { text: "Nee", path: "continue", action: "good", isCorrect: true }
        ]
    },
    {
        question: "Ben je frans?",
        answers: [
            { text: "Ja", path: "continue", action: "softFail", isCorrect: false },
            { text: "Nee", path: "continue", action: "good", isCorrect: true }
        ]
    },
    {
        question: "Ben je duits?",
        answers: [
            { text: "Ja (heil hietler)", path: "continue", action: "softFail", isCorrect: false },
            { text: "Nee", path: "continue", action: "good", isCorrect: true }, // dit is de fout antwoord  dit moet het fout antwoord zijn
        ]
    },
    {
        question: "Is zij knap?",
        hasImage: true,
        imagePath: "IMG_4715.JPG",
        answers: [
            { text: "JAAAAAAAAA EXTREEM🥰😍", path: "continue", action: "good", isCorrect: true },
            { text: "Nee", path: "continue", action: "explode", isCorrect: true }, // dit is de fout antwoord
        ]
    }
];

let currentQuestionIndex = 0;
let askedMurderQuestion = false;
let noButtonClickCount = 0; // Track clicks on "nee" button for "Is zij knap?" question

function startQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    hasFailed = false;
    wrongAnswers = [];
    askedMurderQuestion = false;
    noButtonClickCount = 0; // Reset counter
    renderQuestion();
}

function renderQuestion() {
    const questionContainer = document.getElementById('question-container');
    const progressFill = document.getElementById('progress-fill');
    
    if (currentQuestionIndex >= quizQuestions.length || hasFailed) {
        showResult();
        return;
    }
    
    let question = quizQuestions[currentQuestionIndex];
    
    // Skip conditional murder question if "Nee" wasn't clicked on "Ademt Quin nog?"
    if (question.isConditional && !askedMurderQuestion) {
        // Skip the murder question if it shouldn't be asked
        currentQuestionIndex++;
        if (currentQuestionIndex >= quizQuestions.length) {
            showResult();
            return;
        }
        renderQuestion();
        return;
    }
    
    // Reset the flag after showing the murder question
    if (question.question === "Heb je hem vermoord ofzo? 😰") {
        askedMurderQuestion = false;
    }
    
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    
    progressFill.style.width = progress + '%';
    
    let imageHTML = '';
    if (question.hasImage) {
        imageHTML = `<div style="margin: 20px 0;"><img src="${question.imagePath}" alt="Liek" style="max-width: 100%; max-height: 400px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"></div>`;
    }
    
    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        ${imageHTML}
        <div class="answer-options" id="answer-options">
            ${question.answers.map((answer, index) => 
                `<button class="answer-btn" id="answer-btn-${index}" onclick="selectAnswer('${answer.action}', ${currentQuestionIndex}, ${answer.isCorrect})">${answer.text}</button>`
            ).join('')}
        </div>
    `;
    
    // Add aggressive movement to "nee" button for "Is zij knap?" question
    if (question.question === "Is zij knap?") {
        // Reset click count for this question
        noButtonClickCount = 0;
        setTimeout(() => {
            const noBtn = document.getElementById('answer-btn-1');
            if (noBtn) {
                // Reset any existing positioning
                noBtn.style.position = '';
                noBtn.style.left = '';
                noBtn.style.top = '';
                // Force reflow
                noBtn.offsetHeight;
                // Initial positioning - make sure it's not on top of Yes button
                positionButtonAwayFromYes(noBtn);
                // Make button move aggressively
                makeButtonMoveAggressively(noBtn);
            }
        }, 150);
    }
}

function positionButtonAwayFromYes(noBtn) {
    const container = noBtn.parentElement;
    const containerRect = container.getBoundingClientRect();
    const yesBtn = document.getElementById('answer-btn-0');
    
    if (!yesBtn) return;
    
    // Get button dimensions
    const buttonRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    
    // Calculate positions relative to container
    const yesLeft = yesRect.left - containerRect.left;
    const yesTop = yesRect.top - containerRect.top;
    const yesRight = yesLeft + yesRect.width;
    const yesBottom = yesTop + yesRect.height;
    const yesCenterX = yesLeft + yesRect.width / 2;
    const yesCenterY = yesTop + yesRect.height / 2;
    
    // Get question and image boundaries
    const questionElement = document.querySelector('.question');
    const imageElement = document.querySelector('.answer-options')?.previousElementSibling?.querySelector('img');
    
    let questionBottom = 0;
    if (questionElement) {
        const qRect = questionElement.getBoundingClientRect();
        questionBottom = qRect.bottom - containerRect.top + 20;
    }
    
    let imageBounds = null;
    if (imageElement) {
        const imgRect = imageElement.getBoundingClientRect();
        imageBounds = {
            left: imgRect.left - containerRect.left,
            right: imgRect.right - containerRect.left,
            top: imgRect.top - containerRect.top,
            bottom: imgRect.bottom - containerRect.top
        };
    }
    
    // Find a position away from Yes button and other elements
    let attempts = 0;
    let newX, newY;
    const minDistance = 200; // Minimum distance from Yes button
    
    do {
        const maxX = Math.max(0, containerRect.width - buttonRect.width - 20);
        const maxY = Math.max(0, containerRect.height - buttonRect.height - 20);
        
        newX = Math.max(0, Math.random() * maxX);
        newY = Math.max(questionBottom, Math.random() * maxY);
        
        // Check distance from Yes button
        const newCenterX = newX + buttonRect.width / 2;
        const newCenterY = newY + buttonRect.height / 2;
        const distance = Math.sqrt(
            Math.pow(newCenterX - yesCenterX, 2) + 
            Math.pow(newCenterY - yesCenterY, 2)
        );
        
        if (distance < minDistance) {
            attempts++;
            continue;
        }
        
        // Check collision with image
        if (imageBounds) {
            const newRight = newX + buttonRect.width;
            const newBottom = newY + buttonRect.height;
            
            if (!(newRight < imageBounds.left || newX > imageBounds.right || 
                  newBottom < imageBounds.top || newY > imageBounds.bottom)) {
                attempts++;
                continue;
            }
        }
        
        // Check if button overlaps with Yes button
        const newRight = newX + buttonRect.width;
        const newBottom = newY + buttonRect.height;
        
        if (!(newRight < yesLeft || newX > yesRight || newBottom < yesTop || newY > yesBottom)) {
            attempts++;
            continue;
        }
        
        // Valid position found
        break;
    } while (attempts < 200);
    
    // Apply positioning
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transition = 'none'; // No transition for initial positioning
}

function makeButtonMoveAggressively(button) {
    const container = button.parentElement;
    const containerRect = container.getBoundingClientRect();
    const yesBtn = document.getElementById('answer-btn-0');
    const buttonRect = button.getBoundingClientRect();
    
    // Get all other elements to avoid collision
    const questionElement = document.querySelector('.question');
    const imageElement = document.querySelector('.answer-options')?.previousElementSibling?.querySelector('img');
    
    let attempts = 0;
    let newX, newY;
    
    do {
        const maxX = Math.max(0, containerRect.width - buttonRect.width - 20);
        const maxY = Math.max(0, containerRect.height - buttonRect.height - 20);
        
        // More aggressive random movement
        newX = Math.max(0, Math.random() * maxX);
        newY = Math.max(0, Math.random() * maxY);
        
        // Check collision with Yes button - must be at least 180px away
        let collision = false;
        if (yesBtn) {
            const yesRect = yesBtn.getBoundingClientRect();
            const newCenterX = newX + buttonRect.width / 2;
            const newCenterY = newY + buttonRect.height / 2;
            const yesCenterX = yesRect.left - containerRect.left + yesRect.width / 2;
            const yesCenterY = yesRect.top - containerRect.top + yesRect.height / 2;
            const distance = Math.sqrt(
                Math.pow(newCenterX - yesCenterX, 2) + 
                Math.pow(newCenterY - yesCenterY, 2)
            );
            if (distance < 180) collision = true;
        }
        
        // Check collision with question text
        if (questionElement && !collision) {
            const questionRect = questionElement.getBoundingClientRect();
            const questionBottom = questionRect.bottom - containerRect.top;
            if (newY < questionBottom + 15) collision = true;
        }
        
        // Check collision with image
        if (imageElement && !collision) {
            const imageRect = imageElement.getBoundingClientRect();
            const imgLeft = imageRect.left - containerRect.left;
            const imgRight = imageRect.right - containerRect.left;
            const imgTop = imageRect.top - containerRect.top;
            const imgBottom = imageRect.bottom - containerRect.top;
            const newRight = newX + buttonRect.width;
            const newBottom = newY + buttonRect.height;
            
            if (!(newRight < imgLeft || newX > imgRight || newBottom < imgTop || newY > imgBottom)) {
                collision = true;
            }
        }
        
        // Ensure button stays within container bounds
        if (newX < 0 || newY < 0 || newX + buttonRect.width > containerRect.width || newY + buttonRect.height > containerRect.height) {
            collision = true;
        }
        
        if (!collision || attempts > 100) break;
        attempts++;
    } while (attempts < 200);
    
    button.style.position = 'absolute';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    button.style.transition = 'all 0.12s ease-out'; // Faster, more aggressive movement
    
    // Store onclick handler before cloning
    const onclickAttr = button.getAttribute('onclick');
    
    // Remove old event listeners by cloning the button (clean way to remove all listeners)
    const newButton = button.cloneNode(true);
    if (onclickAttr) {
        newButton.setAttribute('onclick', onclickAttr);
    }
    button.parentNode.replaceChild(newButton, button);
    
    // Add continuous movement on hover/touch
    const moveHandler = () => {
        setTimeout(() => makeButtonMoveAggressively(newButton), 30);
    };
    
    newButton.addEventListener('mouseenter', moveHandler);
    newButton.addEventListener('touchstart', moveHandler);
    newButton.addEventListener('touchmove', moveHandler);
    
    // Also move on click attempt
    newButton.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            setTimeout(() => moveHandler(), 5);
        }
    });
}

function selectAnswer(action, questionIndex, isCorrect) {
    // Track wrong answers (but NEVER for explode action, regardless of isCorrect value)
    if (!isCorrect && action !== "explode" && questionIndex < quizQuestions.length) {
        const question = quizQuestions[questionIndex];
        wrongAnswers.push(question.question);
    }
    // For explode action, never track as wrong answer
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
        case "murderQuestion":
            quizScore -= 2;
            askedMurderQuestion = true;
            // Go to murder question (it's the next one)
            currentQuestionIndex++;
            renderQuestion();
            break;
        case "veryNegative":
            quizScore -= 5;
            currentQuestionIndex++;
            renderQuestion();
            break;
        case "softFail":
            quizScore -= 1;
            currentQuestionIndex++;
            renderQuestion();
            break;
        case "wrong":
            quizScore -= 1;
            currentQuestionIndex++;
            renderQuestion();
            break;
        case "explode":
            // NEVER track as wrong answer for explode action
            noButtonClickCount++;
            const noBtn = document.getElementById('answer-btn-1');
            if (noBtn) {
                // Prevent further clicks immediately
                noBtn.style.pointerEvents = 'none';
                
                if (noButtonClickCount < 4) {
                    // Explosion animation with pieces breaking and raining for first 3 clicks
                    explodeButtonSimple(noBtn);
                    // Re-enable after animation
                    setTimeout(() => {
                        noBtn.style.pointerEvents = 'auto';
                        // Re-attach click handler
                        noBtn.setAttribute('onclick', `selectAnswer('explode', ${questionIndex}, true)`);
                        makeButtonMoveAggressively(noBtn);
                    }, 1300);
                } else {
                    // After 4 clicks: full sequence with AK47
                    handleAK47Sequence(noBtn);
                }
            }
            // Don't track as wrong answer and don't go to next question
            return; // Use return instead of break to ensure no further processing
        default:
            currentQuestionIndex++;
            renderQuestion();
    }
}

function explodeButtonSimple(button) {
    const questionContainer = document.getElementById('question-container');
    const rect = button.getBoundingClientRect();
    const containerRect = questionContainer.getBoundingClientRect();
    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;
    
    // Break button into pieces that explode and rain down
    const numPieces = 15;
    const pieces = [];
    
    for (let i = 0; i < numPieces; i++) {
        const piece = document.createElement('div');
        const pieceWidth = rect.width / 5;
        const pieceHeight = rect.height / 3;
        const pieceX = (i % 5) * pieceWidth;
        const pieceY = Math.floor(i / 5) * pieceHeight;
        
        // Get button's computed style to preserve appearance
        const computedStyle = window.getComputedStyle(button);
        
        piece.style.position = 'absolute';
        piece.style.left = (x + pieceX) + 'px';
        piece.style.top = (y + pieceY) + 'px';
        piece.style.width = pieceWidth + 'px';
        piece.style.height = pieceHeight + 'px';
        piece.style.backgroundColor = computedStyle.backgroundColor;
        piece.style.border = computedStyle.border;
        piece.style.borderRadius = '5px';
        piece.style.zIndex = '1600';
        piece.style.opacity = '0.9';
        piece.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        piece.style.overflow = 'hidden';
        piece.style.pointerEvents = 'none';
        
        questionContainer.style.position = 'relative';
        questionContainer.appendChild(piece);
        pieces.push(piece);
        
        // Animate piece flying out and raining down
        const angle = (Math.random() - 0.5) * Math.PI * 0.6; // Less horizontal spread
        const horizontalDistance = (Math.random() - 0.5) * 200;
        const verticalDistance = window.innerHeight + 400; // Fall down further
        const rotation = (Math.random() - 0.5) * 720;
        
        setTimeout(() => {
            piece.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.6, 1)';
            piece.style.transform = `translate(${horizontalDistance}px, ${verticalDistance}px) rotate(${rotation}deg)`;
            piece.style.opacity = '0';
        }, 10);
    }
    
    // Hide original button temporarily
    button.style.opacity = '0';
    button.style.pointerEvents = 'none';
    
    // Remove pieces after animation and restore button
    setTimeout(() => {
        pieces.forEach(piece => piece.remove());
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
    }, 1600);
}

function handleAK47Sequence(noBtn) {
    const questionContainer = document.getElementById('question-container');
    const container = noBtn.parentElement;
    const containerRect = container.getBoundingClientRect();
    const rect = noBtn.getBoundingClientRect();
    
    // Step 1: Show text "Okay dan dan doen we het maar zo"
    const textElement = document.createElement('div');
    textElement.textContent = 'Okay dan dan doen we het maar zo';
    textElement.style.position = 'absolute';
    textElement.style.left = '20px';
    textElement.style.top = '50%';
    textElement.style.transform = 'translateY(-50%)';
    textElement.style.fontSize = window.innerWidth > 600 ? '1.8rem' : '1.3rem';
    textElement.style.color = '#1a237e';
    textElement.style.fontWeight = '600';
    textElement.style.zIndex = '2000';
    textElement.style.opacity = '0';
    textElement.style.transition = 'opacity 0.5s ease-in';
    textElement.style.maxWidth = window.innerWidth > 600 ? 'none' : 'calc(50% - 20px)';
    questionContainer.style.position = 'relative';
    questionContainer.appendChild(textElement);
    
    setTimeout(() => {
        textElement.style.opacity = '1';
    }, 100);
    
        // Step 2: Show AK47 image after text appears
    setTimeout(() => {
        const ak47Img = document.createElement('img');
        ak47Img.src = 'ak47.png';
        ak47Img.style.position = 'absolute';
        ak47Img.style.left = window.innerWidth > 600 ? '50px' : '20px';
        ak47Img.style.top = '50%';
        ak47Img.style.transform = 'translateY(-50%)';
        ak47Img.style.width = window.innerWidth > 600 ? '300px' : '150px';
        ak47Img.style.height = 'auto';
        ak47Img.style.zIndex = '2000';
        ak47Img.style.opacity = '0';
        ak47Img.style.transition = 'opacity 0.5s ease-in';
        ak47Img.style.maxWidth = '100%';
        questionContainer.appendChild(ak47Img);
        
        setTimeout(() => {
            ak47Img.style.opacity = '1';
        }, 100);
        
        // Step 3: Shoot 4 bullets
        setTimeout(() => {
            shootBullets(ak47Img, noBtn, () => {
                // Step 4: After all bullets, add bleeding effect
                setTimeout(() => {
                    addBleedingEffect(noBtn, () => {
                        // Step 5: Break button into pieces and make it fall
                        breakButtonIntoPieces(noBtn, () => {
                            // Step 6: Remove text and AK47 after button falls
                            setTimeout(() => {
                                textElement.remove();
                                ak47Img.remove();
                            }, 500);
                        });
                    });
                }, 500);
            });
        }, 1000);
    }, 500);
}

function shootBullets(ak47Img, targetBtn, callback) {
    const questionContainer = document.getElementById('question-container');
    const ak47Rect = ak47Img.getBoundingClientRect();
    const targetRect = targetBtn.getBoundingClientRect();
    const containerRect = questionContainer.getBoundingClientRect();
    
    // Calculate positions relative to question container
    const ak47X = ak47Rect.left - containerRect.left + ak47Rect.width * 0.7;
    const ak47Y = ak47Rect.top - containerRect.top + ak47Rect.height * 0.5;
    const targetX = targetRect.left - containerRect.left + targetRect.width / 2;
    const targetY = targetRect.top - containerRect.top + targetRect.height / 2;
    
    let bulletsShot = 0;
    const totalBullets = 4;
    
    // Create bullet holes container
    const bulletHolesContainer = document.createElement('div');
    bulletHolesContainer.style.position = 'absolute';
    bulletHolesContainer.style.left = (targetRect.left - containerRect.left) + 'px';
    bulletHolesContainer.style.top = (targetRect.top - containerRect.top) + 'px';
    bulletHolesContainer.style.width = targetRect.width + 'px';
    bulletHolesContainer.style.height = targetRect.height + 'px';
    bulletHolesContainer.style.pointerEvents = 'none';
    bulletHolesContainer.style.zIndex = '1500';
    questionContainer.style.position = 'relative';
    questionContainer.appendChild(bulletHolesContainer);
    
    function shootSingleBullet() {
        if (bulletsShot >= totalBullets) {
            if (callback) callback();
            return;
        }
        
        // Create bullet
        const bullet = document.createElement('div');
        bullet.style.position = 'absolute';
        bullet.style.left = ak47X + 'px';
        bullet.style.top = ak47Y + 'px';
        bullet.style.width = '8px';
        bullet.style.height = '8px';
        bullet.style.backgroundColor = '#333';
        bullet.style.borderRadius = '50%';
        bullet.style.zIndex = '2000';
        bullet.style.pointerEvents = 'none';
        questionContainer.appendChild(bullet);
        
        // Animate bullet to target
        setTimeout(() => {
            const dx = targetX - ak47X;
            const dy = targetY - ak47Y;
            bullet.style.transition = 'all 0.2s linear';
            bullet.style.transform = `translate(${dx}px, ${dy}px)`;
        }, 10);
        
        // Create bullet hole when bullet reaches target
        setTimeout(() => {
            bullet.remove();
            
            // Create bullet hole
            const hole = document.createElement('div');
            const holeX = Math.random() * targetRect.width * 0.6 + targetRect.width * 0.2;
            const holeY = Math.random() * targetRect.height * 0.6 + targetRect.height * 0.2;
            hole.style.position = 'absolute';
            hole.style.left = holeX + 'px';
            hole.style.top = holeY + 'px';
            hole.style.width = '12px';
            hole.style.height = '12px';
            hole.style.backgroundColor = '#000';
            hole.style.borderRadius = '50%';
            hole.style.zIndex = '1501';
            bulletHolesContainer.appendChild(hole);
            
            bulletsShot++;
            
            // Shoot next bullet
            setTimeout(() => {
                shootSingleBullet();
            }, 300);
        }, 220);
    }
    
    shootSingleBullet();
}

function addBleedingEffect(button, callback) {
    // Create bleeding overlay
    const questionContainer = document.getElementById('question-container');
    const bleedingOverlay = document.createElement('div');
    bleedingOverlay.style.position = 'absolute';
    const rect = button.getBoundingClientRect();
    const containerRect = questionContainer.getBoundingClientRect();
    bleedingOverlay.style.left = (rect.left - containerRect.left) + 'px';
    bleedingOverlay.style.top = (rect.top - containerRect.top) + 'px';
    bleedingOverlay.style.width = rect.width + 'px';
    bleedingOverlay.style.height = '0px';
    bleedingOverlay.style.backgroundColor = '#8B0000';
    bleedingOverlay.style.zIndex = '1500';
    bleedingOverlay.style.opacity = '0.8';
    bleedingOverlay.style.overflow = 'hidden';
    bleedingOverlay.style.borderRadius = '10px';
    questionContainer.style.position = 'relative';
    questionContainer.appendChild(bleedingOverlay);
    
    // Animate blood flowing down
    setTimeout(() => {
        bleedingOverlay.style.transition = 'height 1.5s ease-out';
        bleedingOverlay.style.height = rect.height + 'px';
        
        // Add dripping effect
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.style.position = 'absolute';
                drop.style.left = (Math.random() * rect.width) + 'px';
                drop.style.top = rect.height + 'px';
                drop.style.width = '4px';
                drop.style.height = '20px';
                drop.style.backgroundColor = '#8B0000';
                drop.style.zIndex = '1501';
                bleedingOverlay.appendChild(drop);
                
                setTimeout(() => {
                    drop.style.transition = 'all 0.5s ease-out';
                    drop.style.transform = 'translateY(30px)';
                    drop.style.opacity = '0';
                }, 10);
            }, i * 200);
        }
        
        setTimeout(() => {
            if (callback) callback();
        }, 2000);
    }, 100);
}

function breakButtonIntoPieces(button, callback) {
    const questionContainer = document.getElementById('question-container');
    const rect = button.getBoundingClientRect();
    const containerRect = questionContainer.getBoundingClientRect();
    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;
    
    // Create pieces
    const numPieces = 12;
    const pieces = [];
    
    for (let i = 0; i < numPieces; i++) {
        const piece = document.createElement('div');
        const pieceWidth = rect.width / 4;
        const pieceHeight = rect.height / 3;
        const pieceX = (i % 4) * pieceWidth;
        const pieceY = Math.floor(i / 4) * pieceHeight;
        
        piece.style.position = 'absolute';
        piece.style.left = (x + pieceX) + 'px';
        piece.style.top = (y + pieceY) + 'px';
        piece.style.width = pieceWidth + 'px';
        piece.style.height = pieceHeight + 'px';
        piece.style.backgroundColor = '#8B0000';
        piece.style.borderRadius = '5px';
        piece.style.zIndex = '1600';
        piece.style.opacity = '0.9';
        piece.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        
        questionContainer.style.position = 'relative';
        questionContainer.appendChild(piece);
        pieces.push(piece);
        
        // Animate piece flying out
        const angle = (Math.random() - 0.5) * Math.PI * 0.8;
        const distance = 200 + Math.random() * 300;
        const rotation = (Math.random() - 0.5) * 720;
        const fallDistance = window.innerHeight + 200;
        
        setTimeout(() => {
            piece.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            piece.style.transform = `translate(${Math.cos(angle) * distance}px, ${fallDistance}px) rotate(${rotation}deg)`;
            piece.style.opacity = '0';
        }, 10);
    }
    
    // Hide original button
    button.style.opacity = '0';
    button.style.pointerEvents = 'none';
    
    // Remove pieces after animation
    setTimeout(() => {
        pieces.forEach(piece => piece.remove());
        button.remove();
        if (callback) callback();
    }, 1600);
}

// Functions for initial section AK47 sequence
function handleInitialAK47Sequence(noBtn) {
    const initialSection = document.getElementById('initial-section');
    const content = initialSection.querySelector('.content');
    
    // Prevent further clicks
    noBtn.style.pointerEvents = 'none';
    
    // Step 1: Show text "Okay dan dan doen we het maar zo"
    const textElement = document.createElement('div');
    textElement.textContent = 'Okay dan dan doen we het maar zo';
    textElement.style.position = 'absolute';
    textElement.style.left = '20px';
    textElement.style.top = '50%';
    textElement.style.transform = 'translateY(-50%)';
    textElement.style.fontSize = window.innerWidth > 600 ? '1.8rem' : '1.3rem';
    textElement.style.color = '#1a237e';
    textElement.style.fontWeight = '600';
    textElement.style.zIndex = '2000';
    textElement.style.opacity = '0';
    textElement.style.transition = 'opacity 0.5s ease-in';
    textElement.style.maxWidth = window.innerWidth > 600 ? 'none' : 'calc(50% - 20px)';
    content.style.position = 'relative';
    content.appendChild(textElement);
    
    setTimeout(() => {
        textElement.style.opacity = '1';
    }, 100);
    
    // Step 2: Show AK47 image after text appears
    setTimeout(() => {
        const ak47Img = document.createElement('img');
        ak47Img.src = 'ak47.png';
        ak47Img.style.position = 'absolute';
        ak47Img.style.left = window.innerWidth > 600 ? '50px' : '20px';
        ak47Img.style.top = '50%';
        ak47Img.style.transform = 'translateY(-50%)';
        ak47Img.style.width = window.innerWidth > 600 ? '300px' : '150px';
        ak47Img.style.height = 'auto';
        ak47Img.style.zIndex = '2000';
        ak47Img.style.opacity = '0';
        ak47Img.style.transition = 'opacity 0.5s ease-in';
        ak47Img.style.maxWidth = '100%';
        content.appendChild(ak47Img);
        
        setTimeout(() => {
            ak47Img.style.opacity = '1';
        }, 100);
        
        // Step 3: Shoot 4 bullets
        setTimeout(() => {
            shootBulletsInitial(ak47Img, noBtn, content, () => {
                // Step 4: After all bullets, add bleeding effect
                setTimeout(() => {
                    addBleedingEffectInitial(noBtn, content, () => {
                        // Step 5: Break button into pieces and make it fall
                        breakButtonIntoPiecesInitial(noBtn, content, () => {
                            // Step 6: Remove text and AK47 after button falls
                            setTimeout(() => {
                                textElement.remove();
                                ak47Img.remove();
                            }, 500);
                        });
                    });
                }, 500);
            });
        }, 1000);
    }, 500);
}

function shootBulletsInitial(ak47Img, targetBtn, container, callback) {
    const ak47Rect = ak47Img.getBoundingClientRect();
    const targetRect = targetBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const ak47X = ak47Rect.left - containerRect.left + ak47Rect.width * 0.7;
    const ak47Y = ak47Rect.top - containerRect.top + ak47Rect.height * 0.5;
    const targetX = targetRect.left - containerRect.left + targetRect.width / 2;
    const targetY = targetRect.top - containerRect.top + targetRect.height / 2;
    
    let bulletsShot = 0;
    const totalBullets = 4;
    
    const bulletHolesContainer = document.createElement('div');
    bulletHolesContainer.style.position = 'absolute';
    bulletHolesContainer.style.left = (targetRect.left - containerRect.left) + 'px';
    bulletHolesContainer.style.top = (targetRect.top - containerRect.top) + 'px';
    bulletHolesContainer.style.width = targetRect.width + 'px';
    bulletHolesContainer.style.height = targetRect.height + 'px';
    bulletHolesContainer.style.pointerEvents = 'none';
    bulletHolesContainer.style.zIndex = '1500';
    container.style.position = 'relative';
    container.appendChild(bulletHolesContainer);
    
    function shootSingleBullet() {
        if (bulletsShot >= totalBullets) {
            if (callback) callback();
            return;
        }
        
        const bullet = document.createElement('div');
        bullet.style.position = 'absolute';
        bullet.style.left = ak47X + 'px';
        bullet.style.top = ak47Y + 'px';
        bullet.style.width = '8px';
        bullet.style.height = '8px';
        bullet.style.backgroundColor = '#333';
        bullet.style.borderRadius = '50%';
        bullet.style.zIndex = '2000';
        bullet.style.pointerEvents = 'none';
        container.appendChild(bullet);
        
        setTimeout(() => {
            const dx = targetX - ak47X;
            const dy = targetY - ak47Y;
            bullet.style.transition = 'all 0.2s linear';
            bullet.style.transform = `translate(${dx}px, ${dy}px)`;
        }, 10);
        
        setTimeout(() => {
            bullet.remove();
            
            const hole = document.createElement('div');
            const holeX = Math.random() * targetRect.width * 0.6 + targetRect.width * 0.2;
            const holeY = Math.random() * targetRect.height * 0.6 + targetRect.height * 0.2;
            hole.style.position = 'absolute';
            hole.style.left = holeX + 'px';
            hole.style.top = holeY + 'px';
            hole.style.width = '12px';
            hole.style.height = '12px';
            hole.style.backgroundColor = '#000';
            hole.style.borderRadius = '50%';
            hole.style.zIndex = '1501';
            bulletHolesContainer.appendChild(hole);
            
            bulletsShot++;
            
            setTimeout(() => {
                shootSingleBullet();
            }, 300);
        }, 220);
    }
    
    shootSingleBullet();
}

function addBleedingEffectInitial(button, container, callback) {
    const bleedingOverlay = document.createElement('div');
    bleedingOverlay.style.position = 'absolute';
    const rect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    bleedingOverlay.style.left = (rect.left - containerRect.left) + 'px';
    bleedingOverlay.style.top = (rect.top - containerRect.top) + 'px';
    bleedingOverlay.style.width = rect.width + 'px';
    bleedingOverlay.style.height = '0px';
    bleedingOverlay.style.backgroundColor = '#8B0000';
    bleedingOverlay.style.zIndex = '1500';
    bleedingOverlay.style.opacity = '0.8';
    bleedingOverlay.style.overflow = 'hidden';
    bleedingOverlay.style.borderRadius = '10px';
    container.style.position = 'relative';
    container.appendChild(bleedingOverlay);
    
    setTimeout(() => {
        bleedingOverlay.style.transition = 'height 1.5s ease-out';
        bleedingOverlay.style.height = rect.height + 'px';
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.style.position = 'absolute';
                drop.style.left = (Math.random() * rect.width) + 'px';
                drop.style.top = rect.height + 'px';
                drop.style.width = '4px';
                drop.style.height = '20px';
                drop.style.backgroundColor = '#8B0000';
                drop.style.zIndex = '1501';
                bleedingOverlay.appendChild(drop);
                
                setTimeout(() => {
                    drop.style.transition = 'all 0.5s ease-out';
                    drop.style.transform = 'translateY(30px)';
                    drop.style.opacity = '0';
                }, 10);
            }, i * 200);
        }
        
        setTimeout(() => {
            if (callback) callback();
        }, 2000);
    }, 100);
}

function breakButtonIntoPiecesInitial(button, container, callback) {
    const rect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;
    
    const numPieces = 12;
    const pieces = [];
    
    for (let i = 0; i < numPieces; i++) {
        const piece = document.createElement('div');
        const pieceWidth = rect.width / 4;
        const pieceHeight = rect.height / 3;
        const pieceX = (i % 4) * pieceWidth;
        const pieceY = Math.floor(i / 4) * pieceHeight;
        
        piece.style.position = 'absolute';
        piece.style.left = (x + pieceX) + 'px';
        piece.style.top = (y + pieceY) + 'px';
        piece.style.width = pieceWidth + 'px';
        piece.style.height = pieceHeight + 'px';
        piece.style.backgroundColor = '#8B0000';
        piece.style.borderRadius = '5px';
        piece.style.zIndex = '1600';
        piece.style.opacity = '0.9';
        piece.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        
        container.style.position = 'relative';
        container.appendChild(piece);
        pieces.push(piece);
        
        const angle = (Math.random() - 0.5) * Math.PI * 0.8;
        const distance = 200 + Math.random() * 300;
        const rotation = (Math.random() - 0.5) * 720;
        const fallDistance = window.innerHeight + 200;
        
        setTimeout(() => {
            piece.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            piece.style.transform = `translate(${Math.cos(angle) * distance}px, ${fallDistance}px) rotate(${rotation}deg)`;
            piece.style.opacity = '0';
        }, 10);
    }
    
    button.style.opacity = '0';
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
        pieces.forEach(piece => piece.remove());
        button.remove();
        if (callback) callback();
    }, 1600);
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
    } else if (wrongAnswers.length === 1) {
        result = {
            title: "Ja maar dit ziet er niet goed naar uit 😟",
            message: "Quin houdt nog van je, maar je moet voorzichtiger zijn!",
            emoji: "😔"
        };
    } else if (wrongAnswers.length >= 2) {
        result = {
            title: "PARDON??? 😡",
            message: "Wat is dit?! Quin houdt nog van je, maar dit is niet oké!",
            emoji: "😠"
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
        <button onclick="restartQuiz()" class="btn btn-yes" style="margin-top: 30px;">
            Opnieuw proberen 🔄
        </button>
        <p style="font-size: 1.5rem; color: #1a237e; margin-top: 30px;">
            Met heel veel liefde,<br>
            Quin 💕
        </p>
    `;
    
    resultContainer.classList.remove('hidden');
}

// Make restartQuiz globally accessible
window.restartQuiz = function() {
    quizSection.classList.remove('active');
    quizSection.classList.add('hidden');
    initialSection.classList.remove('hidden');
    initialSection.classList.add('active');
    noClickCount = 0;
    noButtonClickCount = 0;
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    startQuiz();
};

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
        <button onclick="restartQuiz()" class="btn btn-yes" style="margin-top: 30px;">
            Opnieuw proberen 🔄
        </button>
        <p style="font-size: 1.5rem; color: #1a237e; margin-top: 30px;">
            Met heel veel liefde,<br>
            Quin 💕
        </p>
    `;
    
    resultContainer.classList.remove('hidden');
}
