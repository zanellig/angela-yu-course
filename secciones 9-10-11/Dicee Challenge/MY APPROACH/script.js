'use strict';

const header = document.querySelector('.roll');
const dice1 = document.querySelector('.dice1');
const dice2 = document.querySelector('.dice2');
const winner = document.querySelector('.winner');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

header.addEventListener('click',(e)=>{
    e.preventDefault();
    let randomNumber1 = Math.trunc(Math.random() * 6) + 1;
    let randomNumber2 = Math.trunc(Math.random() * 6) + 1;

    if(randomNumber1 === 1){
        dice1.src = './images/dice1.png'
    } else if(randomNumber1 === 2){
        dice1.src = './images/dice2.png'
    } else if(randomNumber1 === 3){
        dice1.src = './images/dice3.png'
    } else if(randomNumber1 === 4){
        dice1.src = './images/dice4.png'
    } else if(randomNumber1 === 5){
        dice1.src = './images/dice5.png'
    } else if(randomNumber1 === 6){
        dice1.src = './images/dice6.png'
    }

    if(randomNumber2 === 1){
        dice2.src = './images/dice1.png'
    } else if(randomNumber2 === 2){
        dice2.src = './images/dice2.png'
    } else if(randomNumber2 === 3){
        dice2.src = './images/dice3.png'
    } else if(randomNumber2 === 4){
        dice2.src = './images/dice4.png'
    } else if(randomNumber2 === 5){
        dice2.src = './images/dice5.png'
    } else if(randomNumber2 === 6){
        dice2.src = './images/dice6.png'
    }

    if(randomNumber1 == randomNumber2){
        winner.textContent = `It's a draw!`
        player1.style.color = '#ece75f'
        player2.style.color = '#ece75f'
    } else if (randomNumber1 > randomNumber2){
        winner.textContent = `Player one wins!`
        player1.style.color = '#c1ff72'
        player2.style.color = '#ff0000'
    } else if (randomNumber1 < randomNumber2){
        winner.textContent = `Player two wins!`
        player2.style.color = '#c1ff72'
        player1.style.color = '#ff0000'
    }

})