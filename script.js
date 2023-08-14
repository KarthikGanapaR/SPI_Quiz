const questions =[
    {
        question:"What is the Serial Peripheral Interface (SPI)?",
        answers:[
            {text: "A type of memory", correct: false},
            {text: "An interface bus commonly used to send data between microcontrollers", correct: true},
            {text: "A type of battery", correct: false},
            {text: "A wireless communication protocol", correct: false},
        ]
    },
    {
        question:"How many wires does the original SPI specification use for full-duplex communication?",
        answers:[
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "4", correct: true},
            {text: "5", correct: false},
        ]  
    },
    {
        question:"What is the maximum number of devices that can be connected to an SPI bus?",
        answers:[
            {text: "1", correct: false},
            {text: "2", correct: false},
            {text: "Multidrop limited by chip selects", correct: true},
            {text: "Unlimited", correct: false},
        ]  
    },
    {
        question:"What are the four logic signals used in SPI?",
        answers:[
            {text: "SCLK, MOSI, MISO, CS", correct: true},
            {text: "RX, TX, RTS, CTS", correct: false},
            {text: "SDA, SCL, GND, VCC", correct: false},
            {text: "DIN, DOUT, CLK, LOAD", correct: false},
        ]  
    },
    {
        question:"What is the primary use of SPI?",
        answers:[
            {text: "Long-distance wired communication between integrated circuits", correct: false},
            {text: "Wireless communication between integrated circuits", correct: false},
            {text: "Short-distance wired communication between integrated circuits", correct: true},
            {text: "Communication between humans and computers", correct: false},
        ]  
    }
];

const questionElement = document.getElementById("qs");
const answerButtons = document.getElementById("ans");
const nextButton = document.getElementById("nxt");

let currentQsIndex = 0;
let score = 0;

function startQuiz(){
    
    currentQsIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQues();
}

function showQues(){
    resetState();
    let currentQs = questions[currentQsIndex];
    let qsNo = currentQsIndex + 1;
    questionElement.innerHTML = qsNo + ". " + currentQs.question;


    currentQs.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });

}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild); 
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNxtBtn(){
    currentQsIndex++;
    if(currentQsIndex < questions.length){
        showQues();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQsIndex < questions.length){
        handleNxtBtn();
    }else{
        startQuiz();
    }
});



startQuiz();
