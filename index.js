document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open the clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // Practice Quiz Questions
    const practiceQuestions = [
        {
            question: "__________ do you like best?",
            answer: "who",
            options: ["who", "what", "where", "when"]
        },
        {
            question: "__________ does Manolo get up in the morning?",
            answer: "when",
            options: ["where", "why", "when", "how"]
        },
        {
            question: "__________ don't you go by bus, Cristina?",
            answer: "why",
            options: ["what", "why", "when", "how"]
        },
        {
            question: "__________ hobbies does Carlos like?",
            answer: "what",
            options: ["what", "which", "whose", "where"]
        },
        {
            question: "__________ do they go to every week?",
            answer: "where",
            options: ["when", "what", "who", "where"]
        },
        {
            question: "__________ old are you Silvia?",
            answer: "how",
            options: ["what", "when", "how", "why"]
        },
        {
            question: "__________ is Maria's birthday?",
            answer: "when",
            options: ["when", "where", "who", "whose"]
        },
        {
            question: "__________ are my exercise books?",
            answer: "where",
            options: ["what", "which", "where", "whose"]
        },
        {
            question: "__________ are you doing at the moment, Harry?",
            answer: "what",
            options: ["why", "what", "how", "when"]
        },
        {
            question: "__________ do the Petersons live?",
            answer: "where",
            options: ["where", "when", "how", "who"]
        }
    ];

    // Challenge Quiz Questions
    const challengeQuestions = [
        {
            question: "__________ sits next to Dries?",
            answer: "who",
            options: ["who", "what", "whom", "whose"]
        },
        {
            question: "__________ does the boy come from?",
            answer: "where",
            options: ["when", "where", "why", "how"]
        },
        {
            question: "__________ much are the patotoes?",
            answer: "how",
            options: ["what", "how", "where", "which"]
        },
        {
            question: "__________ can I do for you?",
            answer: "what",
            options: ["who", "what", "where", "when"]
        },
        {
            question: "__________ colour is your new car?",
            answer: "what",
            options: ["what", "which", "whose", "how"]
        },
        {
            question: "Choose between What, Which and Whose: __________ time is it?",
            answer: "what",
            options: ["what", "which", "whose"]
        },
        {
            question: "Choose between What, Which and Whose: __________ doll is your favourite?",
            answer: "which",
            options: ["what", "which", "whose"]
        },
        {
            question: "Choose between What, Which and Whose: __________ baby is this?",
            answer: "whose",
            options: ["what", "which", "whose"]
        },
        {
            question: "__________ kind of animal is that?",
            answer: "what",
            options: ["what", "which", "whose", "where"]
        },
        {
            question: "__________ is your favourite singer?",
            answer: "who",
            options: ["when", "where", "who", "what"]
        },
        {
            question: "__________ are you, Mr Gordon?",
            answer: "how",
            options: ["how", "what", "where", "when"]
        },
        {
            question: "__________ are you going. I am going to the park.",
            answer: "where",
            options: ["how", "what", "where", "when"]
        },
        {
            question: "__________ many cars does your family have?",
            answer: "how",
            options: ["how", "what", "where", "when"]
        },
        {
            question: "__________ do you like better, cakes or chocolates?",
            answer: "what",
            options: ["who", "what", "where", "when"]
        },
        {
            question: "__________ often do you go to the movies?",
            answer: "how",
            options: ["how", "what", "where", "when"]
        }
    ];

    // Display practice quiz questions
    const practiceQuestionsContainer = document.getElementById('practice-questions');
    
    practiceQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="options">
                ${q.options.map(option => `
                    <label class="option">
                        <input type="radio" name="practice-q${index}" value="${option}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        practiceQuestionsContainer.appendChild(questionElement);
    });

    // Display challenge quiz questions
    const challengeQuestionsContainer = document.getElementById('challenge-questions');
    
    challengeQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="options">
                ${q.options.map(option => `
                    <label class="option">
                        <input type="radio" name="challenge-q${index}" value="${option}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        challengeQuestionsContainer.appendChild(questionElement);
    });

    // Submit practice quiz
    document.getElementById('submit-practice').addEventListener('click', () => {
        evaluateQuiz('practice', practiceQuestions);
    });

    // Submit challenge quiz
    document.getElementById('submit-challenge').addEventListener('click', () => {
        evaluateQuiz('challenge', challengeQuestions);
    });

    // Retry practice quiz
    document.getElementById('retry-practice').addEventListener('click', () => {
        resetQuiz('practice');
    });

    // Retry challenge quiz
    document.getElementById('retry-challenge').addEventListener('click', () => {
        resetQuiz('challenge');
    });

    // Function to evaluate quiz
    function evaluateQuiz(quizType, questions) {
        let score = 0;
        const feedback = [];

        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="${quizType}-q${index}"]:checked`);
            
            if (selectedOption) {
                const userAnswer = selectedOption.value;
                const isCorrect = userAnswer.toLowerCase() === q.answer.toLowerCase();
                
                if (isCorrect) {
                    score++;
                }
                
                feedback.push({
                    question: q.question,
                    userAnswer: userAnswer,
                    correctAnswer: q.answer,
                    isCorrect: isCorrect
                });
            } else {
                feedback.push({
                    question: q.question,
                    userAnswer: "No answer",
                    correctAnswer: q.answer,
                    isCorrect: false
                });
            }
        });

        // Display results
        const scorePercentage = Math.round((score / questions.length) * 100);
        document.getElementById(`${quizType}-score`).textContent = `You scored ${score} out of ${questions.length} (${scorePercentage}%)`;
        
        const feedbackContainer = document.getElementById(`${quizType}-feedback`);
        feedbackContainer.innerHTML = "";
        
        feedback.forEach((item, index) => {
            const feedbackItem = document.createElement('div');
            feedbackItem.className = `feedback-item ${item.isCorrect ? 'correct' : 'incorrect'}`;
            
            const questionParts = item.question.split('__________');
            const formattedQuestion = questionParts.length > 1 
                ? `${questionParts[0]}<strong>${item.correctAnswer}</strong>${questionParts[1]}`
                : item.question;
                
            feedbackItem.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> ${formattedQuestion}</p>
                <p><strong>Your answer:</strong> ${item.userAnswer}</p>
                ${!item.isCorrect ? `<p><strong>Correct answer:</strong> ${item.correctAnswer}</p>` : ''}
            `;
            
            feedbackContainer.appendChild(feedbackItem);
        });
        
        // Hide quiz form and show results
        document.getElementById('quiz-form').style.display = 'none';
        document.getElementById(`${quizType}-results`).style.display = 'block';
    }

    // Function to reset quiz
    function resetQuiz(quizType) {
        // Reset all radio buttons
        const radioButtons = document.querySelectorAll(`input[name^="${quizType}-q"]`);
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
        
        // Hide results and show quiz form
        document.getElementById(`${quizType}-results`).style.display = 'none';
        document.getElementById('quiz-form').style.display = 'block';
    }

    // Open the first accordion item by default
    if (document.querySelector('.accordion-item')) {
        document.querySelector('.accordion-item').classList.add('active');
    }
});