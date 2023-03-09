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

    dice1.src = `./images/dice${randomNumber1}.png`;
    dice2.src = `./images/dice${randomNumber2}.png`;

    if(randomNumber1 == randomNumber2){
        winner.textContent = `It's a draw! 🙅‍♂️`
        player1.style.color = '#ece75f'
        player2.style.color = '#ece75f'
    } else if (randomNumber1 > randomNumber2){
        winner.textContent = `🏆 Player one wins!`
        player1.style.color = '#c1ff72'
        player2.style.color = '#ff0000'
    } else if (randomNumber1 < randomNumber2){
        winner.textContent = `Player two wins! 🏆`
        player2.style.color = '#c1ff72'
        player1.style.color = '#ff0000'
    }

})