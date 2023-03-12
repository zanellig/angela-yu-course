'use strict';

// import { constants } from 'node:buffer';
// import * as fs from 'node:fs';

// fs.copyFileSync('text1.txt','text2.txt',constants.COPYFILE_EXCL);
// console.log('text1.txt was copied to text2.txt');

const superheroes = require('superheroes');
const supervillains = require('supervillains');

const mySuperhero = superheroes.random();
const mySupervillain = supervillains.random();

console.log(`Your super hero name is: ${mySuperhero}`);
console.log(`Your super villain name is: ${mySupervillain}`);