let userScore = 0;
let compScore = 0;
let rounds = 0;
let maxRounds = 5;
let gameOver = false;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");

//  Computer choice
const genCompChoice = () => {
    let arr = ["rock", "paper", "scissor"];
    let idx = Math.floor(Math.random() * 3);
    return arr[idx];
};

//  Animate message
const animateMsg = () => {
    msg.classList.remove("animate");
    void msg.offsetWidth;
    msg.classList.add("animate");
};

//  Show winner
const showWinner = (userWins, computerChoice, userChoice) => {
    if (userWins === true) {
        let userPoint = document.querySelector("#user");
        msg.innerText = `You Win! 🎉 ${userChoice} beats ${computerChoice}`;
        msg.style.backgroundColor = "#65c55d";
        userScore++;
        userPoint.innerText = userScore;
    } else {
        let computerPoint = document.querySelector("#computer");
        msg.innerText = `Opps! You Lost! ${computerChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "#ef4a4a";
        compScore++;
        computerPoint.innerText = compScore;
    }

    animateMsg();
};

//  End Game
const endGame = () => {
    gameOver = true;

    if (userScore > compScore) {
        msg.innerText = "🏆 You Won the Game!";
        msg.style.backgroundColor = "#4caf50";
        launchConfetti();
    }
    else if (compScore > userScore) {
        msg.innerText = "💻 Computer Won the Game!";
        msg.style.backgroundColor = "#ef4a4a";
    }
    else {
        msg.innerText = "It's a Draw!";
        msg.style.backgroundColor = "#999";
    }

    animateMsg();
};

// Confetti
const launchConfetti = () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
};

// Game 
const playGame = (userChoice) => {
    if (gameOver || rounds >= maxRounds) return;

    console.log("User choice: " + userChoice);

    let computerChoice = genCompChoice();
    console.log("Computer choice: " + computerChoice);
    if (userChoice === computerChoice) {
        msg.innerText = `It's a Draw! Play Again!`;
        msg.style.backgroundColor = "#f5a0e4";

        rounds++; // 

        if (rounds >= maxRounds) {
            endGame();
        }

        animateMsg();
        return;
    }

    let userWins = true;

    if (userChoice === "rock") {
        userWins = computerChoice === "paper" ? false : true;
    }
    else if (userChoice === "paper") {
        userWins = computerChoice === "scissor" ? false : true;
    }
    else {
        userWins = computerChoice === "rock" ? false : true;
    }

    showWinner(userWins, computerChoice, userChoice);

    rounds++; // 

    if (rounds >= maxRounds) {
        endGame();
    }
};


// getting user choice 
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (gameOver) return;

        let userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

//  Reset button
document.querySelector("#reset").addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    rounds = 0;
    gameOver = false;

    document.querySelector("#user").innerText = 0;
    document.querySelector("#computer").innerText = 0;

    msg.innerText = "Let's Start";
    msg.style.backgroundColor = "black";


    msg.classList.remove("animate");
});