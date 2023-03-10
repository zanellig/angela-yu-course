const numberOfDrumButtons = document.querySelectorAll('.drum');
const drums = document.querySelectorAll('.drum');

const kickBass = new Audio('./sounds/kick-bass.mp3');
const crash = new Audio('./sounds/crash.mp3');
const snare = new Audio('./sounds/snare.mp3');
const tom1 = new Audio('./sounds/tom-1.mp3');
const tom2 = new Audio('./sounds/tom-2.mp3');
const tom3 = new Audio('./sounds/tom-3.mp3');
const tom4 = new Audio('./sounds/tom-4.mp3');

const soundsArray = [kickBass,crash,snare,tom1,tom2,tom3,tom4];

let keyDown = false;

for (let i = 0; i < numberOfDrumButtons.length; i++) {
    drums[i].addEventListener('click',(e)=>{
        e.preventDefault();
        soundsArray[i].play();
        drums[i].style.color = '#c1ff72'
        setTimeout(()=>{drums[i].style.color = '#1b1b1b'},250)
        drums[i].classList.add('pressed');
        setTimeout(()=>{drums[i].classList.remove('pressed')},250);
        })
        
    }

const keyboardArray = ['w','a','s','d','j','k','l']

for (let i = 0; i < keyboardArray.length; i++) {
    document.body.addEventListener('keydown',(e)=>{
        const activationKey = keyboardArray[i];
        const keyPressed = e.key;
        if(e.key == activationKey){
            buttonAnimation(keyPressed, keyDown);
            keyDown = true;
            soundsArray[i].play();
            drums[i].style.color = '#c1ff72';
            setTimeout(()=>{drums[i].style.color = '#1b1b1b'},250);
            drums[i].classList.add('pressed');
            setTimeout(()=>{drums[i].classList.remove('pressed')},250);
            
        }     
    })

}

function buttonAnimation(keyPressed, pressed){
    if(pressed === false){
        console.log(document.querySelector(`.${keyPressed}`).classList[0]);
    }
    
}