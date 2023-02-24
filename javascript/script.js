// const name = prompt(`What is your name?`)

// alert(`Hello ${name.slice(0,1).toUpperCase() + name.slice(1,name.length).toLowerCase()}`);

// const dogAge = prompt(`What is your dog's age?`);

// humanAge = (dogAge - 2) * 4 + 21;

// alert(`Your dog's age if it was a human is ${humanAge}.`);

// function getMilk(money) {   
//   console.log("leaveHouse");
//   console.log("moveRight");
//   console.log("moveRight");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveRight");
//   console.log("moveRight");

//     console.log(`The robot was able to buy ${Math.trunc(money / 1.5)} bottles of milk.`)
    
//   console.log("moveLeft");
//   console.log("moveLeft");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveLeft");
//   console.log("moveLeft");
//   console.log("enterHouse");

//     console.log(`The robot returned home with USD ${money % 1.5} of spare change.`)
// }

// getMilk(10);

// function lifeInWeeks(age){
//   const yearsRemaining = 90 - age;
//   const monthsRemaining = yearsRemaining * 12;
//   const weeksRemaining = yearsRemaining * 52;
//   const daysRemaining = yearsRemaining * 365;

//   console.log(`I have ${yearsRemaining} years, ${monthsRemaining} months, ${weeksRemaining} weeks, and ${daysRemaining} days remaining.`)
// }

// lifeInWeeks(22);

// function bmiCalculator(weight,height){
//   var bmi = weight / (height ** 2);
      
//   return bmi
// }

// var bmi = bmiCalculator(65, 1.8); 

// console.log(bmi)

// const nameOne = prompt(`Tell me your name...`);

// const nameTwo = prompt(`Tell me the name of your lover...`);

// const lovePercentage = Math.floor((Math.random() * 100) + 1);

// alert(`The love percentage between ${nameOne} and ${nameTwo} is ${lovePercentage}% ❤`);

// function bmiCalculator (weight, height) {
//     const bmi = weight / (height * height)
//     let ending = ``;
//     if(bmi < 18.5){
//         ending = `are underweight`
//     } else if (bmi > 18.5 && bmi < 24.9){
//         ending = `have a normal weight`
//     } else {
//         ending = `are overweight`
//     }
//     const interpretation = `Your BMI is ${bmi}, so you ${ending}.`
//     return interpretation;
// }

// function isLeap(year) {
  
//     let leap;
  
//     if(year % 4 === 0){
//         if (year % 100 === 0){
//           leap = false;
//           if(year % 400 === 0){
//             leap = true;
//           }
//         } 
//     } else leap = false
//     let message;
//     if(leap == true){
//         message = `Leap year.`
//     } else if (leap == false){
//         message = `Not leap year.`
//     }
//     return message
// }

// console.log(isLeap(1998));

// console.log(isLeap(2000));

// const guestList = ['Angela','Jack','Pam','James','Lara','Jason']

// let guest = prompt(`What's your name?`);

// guest = guest.slice(0, 1).toUpperCase() + guest.slice(1, guest.length).toLowerCase();

// if(true === guestList.includes(guest)){
//   alert(`Welcome to the party ${guest}`)
// } else alert(`Fuck off, you're not invited ${guest}`);

// function fizzBuzz(){

// var arr = [];

// for(let i = 1; i <= 100; i++){
//   arr.push(i);
// }

// for(let i = 0; i < arr.length; i++){
//   const curNum = arr[i];
//   if(curNum % 3 === 0 && curNum % 5 === 0){
//     console.log(`FizzBuzz`)
//   } else if (curNum % 3 === 0){
//     console.log(`Fizz`)
//   } else if (curNum % 5 === 0){
//     console.log(`Buzz`)
//   } else console.log(curNum)
// }

// }