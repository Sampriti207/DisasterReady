const questions = {

    earthquake: [

        {
            question:
                "An earthquake starts while you are inside a classroom. What should you do?",

            options: [
                "Run immediately outside",
                "Drop, Cover and Hold On",
                "Use the elevator"
            ],

            answer: 1,

            explanation:
                "Drop, Cover and Hold On is a recommended protective action during an earthquake."
        },

        {
            question:
                "Which location should generally be avoided during earthquake shaking?",

            options: [
                "Under a sturdy desk",
                "Near windows or glass",
                "An interior area away from hazards"
            ],

            answer: 1,

            explanation:
                "Windows and glass can break and create hazards."
        }

    ],


    flood: [

        {
            question:
                "During flooding, which situation should you avoid?",

            options: [
                "Moving through floodwater",
                "Following official instructions",
                "Moving to a safer location"
            ],

            answer: 0,

            explanation:
                "Floodwater can hide hazards and may be moving quickly."
        },

        {
            question:
                "What should you do when authorities issue an evacuation order?",

            options: [
                "Ignore it",
                "Follow the official evacuation instructions",
                "Wait until conditions become worse"
            ],

            answer: 1,

            explanation:
                "Follow official emergency instructions and evacuation guidance."
        }

    ],


    fire: [

        {
            question:
                "What should you do if there is a fire in a building?",

            options: [
                "Use the elevator",
                "Follow the building's fire evacuation route",
                "Hide in a room"
            ],

            answer: 1,

            explanation:
                "Follow the designated evacuation route and emergency instructions."
        }

    ],


    cyclone: [

        {
            question:
                "What is important before a cyclone?",

            options: [
                "Ignore official warnings",
                "Monitor official weather and emergency information",
                "Go outside to observe the storm"
            ],

            answer: 1,

            explanation:
                "Monitoring official warnings helps people prepare and respond appropriately."
        }

    ]

};



let currentDisaster = "";
let currentQuestion = 0;
let score = 0;
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startSimulator); 


function selectDisaster(disaster) {

    currentDisaster = disaster;

    currentQuestion = 0;

    score = 0;

    document
        .getElementById("simulator")
        .scrollIntoView();

    showQuestion();
}


function showQuestion() {

    const questionData =
        questions[currentDisaster][currentQuestion];

    document.getElementById("question-number")
        .textContent =
        `Question ${currentQuestion + 1} / 
        ${questions[currentDisaster].length}`;

    document.getElementById("question")
        .textContent =
        questionData.question;

    const optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";

    document.getElementById("feedback")
        .innerHTML = "";

    document.getElementById("next-btn")
        .style.display = "none";


    questionData.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.className = "option";

            button.textContent = option;

            button.onclick = () =>
                checkAnswer(index);

            optionsContainer.appendChild(button);
        }
    );
}


function checkAnswer(selected) {

    const questionData =
        questions[currentDisaster][currentQuestion];

    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(button => {
        button.disabled = true;
    });


    if (selected === questionData.answer) {

        score++;

        buttons[selected]
            .classList.add("correct");

        document.getElementById("feedback")
            .innerHTML =
            `<strong>✓ Correct!</strong><br>
            ${questionData.explanation}`;

    }

    else {

        buttons[selected]
            .classList.add("wrong");

        buttons[questionData.answer]
            .classList.add("correct");

        document.getElementById("feedback")
            .innerHTML =
            `<strong>Not quite.</strong><br>
            ${questionData.explanation}`;
    }


    document.getElementById("next-btn")
        .style.display = "block";
}



function nextQuestion() {

    currentQuestion++;

    if (
        currentQuestion >=
        questions[currentDisaster].length
    ) {

        finishSimulator();

    }

    else {

        showQuestion();

    }
}




function finishSimulator() {

    const total =
        questions[currentDisaster].length;

    const percentage =
        Math.round((score / total) * 100);


    document.getElementById("question")
        .textContent =
        "Simulation Complete 🎉";


    document.getElementById("options")
        .innerHTML = `
            <h2>Your Score: ${score}/${total}</h2>

            <p>
                Awareness Score: ${percentage}%
            </p>
        `;


    document.getElementById("feedback")
        .innerHTML =
        "Review the learning section to improve your emergency awareness.";


    document.getElementById("next-btn")
        .style.display = "none";


    // updateProgress(percentage);
}





function startSimulator() {
    document.getElementById("simulator")
        .scrollIntoView({
            behavior: "smooth"
        });
}