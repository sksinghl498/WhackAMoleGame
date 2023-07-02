let scoreH2=document.getElementById('score');
let timeLeftH2= document.getElementById('timeLeft');
let startNewGameButton= document.getElementById('startNewGame');
let pauseGameButton= document.getElementById('pauseGame');
let gameMusic= new Audio('./assets/gameMusic.mp3');
let hitMusic= new Audio('./assets/hitMusic.mp3');


let score=0;
let timeLeft=0;

let squares= document.querySelectorAll('.square');
let hitPosition=null;
let timerId= null;
let randomMoleId= null;


// randomly place mole

function randomMole(){
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random()*squares.length)];

    randomSquare.classList.add('mole');
    hitPosition= randomSquare.id;
}


function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML= `Time Left: ${timeLeft}`;
    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
    }
}


randomMole();


function startGame(){
    score=0;
    timeLeft=10;
    gameMusic.play();
    //callback function 
    timerId = setInterval(randomMole,3000);
    randomMoleId = setInterval(countDown,1000);
}

function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId=null;
        randomMoleId=null;
        pauseGameButton.textContent= 'Resume'
    }else{
        gameMusic.play();
        timerId = setInterval(randomMole,1000);
        randomMoleId = setInterval(countDown,1000);
        pauseGameButton.textContent= 'Pause';
    }
}

squares.forEach(square=>{
    square.addEventListener('mousedown',()=>{
        if(timerId !== null){
            if(square.id === hitPosition){
                hitMusic.play();
                score++;
                scoreH2.innerHTML= `Your score: ${score}`
                hitPosition=null;
            }
        }
    })
})

startNewGameButton.addEventListener('click',startGame);
pauseGameButton.addEventListener('click',pauseResumeGame);
