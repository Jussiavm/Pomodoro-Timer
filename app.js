const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const pauseBtn = document.querySelector('.btn-pause');
const session = document.querySelector('.minutes');
const pause = 5;
let myInterval;
let state = 1;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state === 1) {
        state = 0;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

        
            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = "0" + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft == 0) {
                bells.play();
                clearInterval(myInterval);
                state = 2;
                appTimer();
            }

            resetBtn.addEventListener('click', () => {
                clearInterval(myInterval);
                state = 1;
                session.textContent = sessionAmount;
                secondDiv.textContent = "00";
            }); 

            pauseBtn.addEventListener('click', () => {
                clearInterval(myInterval);
                bells.play();
                state = 2;
                session.textContent = "5";
                secondDiv.textContent = "00";
                appTimer();
            });

            
        }
        myInterval = setInterval(updateSeconds, 1000);
    } else if (state === 2) {
        state = 0;
        let totalSeconds = pause * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = "0" + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft == 0) {
                bells.play();
                state = 1;
                session.textContent = "25";
                secondDiv.textContent = "00";
                clearInterval(myInterval);
                appTimer();
            }

            resetBtn.addEventListener('click', () => {
                clearInterval(myInterval);
                state = 1;
                session.textContent = "25";
                secondDiv.textContent = "00";
            }); 

            pauseBtn.addEventListener('click', () => {
                clearInterval(myInterval);
                bells.play();
                state = 1;
                session.textContent = "25";
                secondDiv.textContent = "00";
                appTimer();
            });
            
        }
        myInterval = setInterval(updateSeconds, 1000);      

    } else {
        alert('Session has already started!');
    }
}
startBtn.addEventListener('click', appTimer);

