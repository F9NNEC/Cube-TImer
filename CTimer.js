let startTime, endTime, running = false;
let timerInterval;

function generateScramble(){
    const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
    const atributs = ["", "'", "2"];
    let scramble = [];
    let lastMove = '';

    for (let i=0; i<20; i++){
        let move;
        do {
            move = moves[Math.floor(Math.random()*moves.length)];
        } while(move === lastMove);
        lastMove = move;
        let atribut = atributs[Math.floor(Math.random()*atributs.length)];
        scramble.push(move+atribut)
    };
    return scramble.join(' ');
}

document.getElementById('scramble').innerText = '3x3 Scramble: \n' + generateScramble();

function startTimer(){
    if(!running){
        startTime = performance.now();
        running = true;
        timerInterval = requestAnimationFrame(updateTimer);
    }
}

function stopTimer(){
    if(running){
        endTime = performance.now();
        running = false;
        let time = (endTime - startTime)/1000;
        displayTime(time);
    }
}

function updateTimer(){
    if(running){
        let currentTime = (performance.now() - startTime)/1000;
        document.getElementById('timer').innerText = currentTime.toFixed(2)+'s';
        timerInterval = requestAnimationFrame(updateTimer);
    }
}

function displayTime(time){
    document.getElementById('timer').innerText = time.toFixed(2)+'s';
}

document.getElementById('start').addEventListener('click', function(){
    if(running){
        stopTimer();
        this.blur();

    } else {
        startTimer();
        this.blur();

    }
})

document.addEventListener('keydown', (event) =>{
    const timer = document.getElementById('timer');
    if(event.keyCode==32){
        if(!running){
            document.getElementById('timer').innerText = '0.00s';
            timer.style.color = 'gold';
        }
    }
})

document.addEventListener('keyup', (event) =>{
    if(event.keyCode==32){
        if(running){
            document.getElementById('scramble').innerText = '3x3 Scramble: \n' + generateScramble();
            stopTimer();
        } else{
            document.getElementById('timer').innerText = '0.00s'
            timer.style.color = '';
            startTimer();
        }
    }
})


function newScramble(){
    running = false;
    cancelAnimationFrame(timerInterval);
    document.getElementById('scramble').innerText = '3x3 Scramble: \n' + generateScramble();
    this.blur();
}

document.getElementById('nextScramble').addEventListener('click', newScramble);