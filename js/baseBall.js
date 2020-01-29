'use strict';
const progressBar = document.getElementById('progress');
const resultContainer = document.getElementById('result');
const inputContainer = document.getElementById('inputBox');
const button = document.getElementById('button');

let hit;
const checkArr = [];

function validateCanHit(tempHit, difficulty) {
    let stringHit = tempHit.toString();
    for (let i = 0; i < difficulty; i++) {
        if (checkArr[i] !== undefined || stringHit[i] === '0') {
            return false;
        }
        checkArr[parseInt(stringHit[i])] = i;
    }
    return true;
}

function calHit(difficulty) {
    let tempValue;
    do {
        tempValue = Math.floor(Math.random() * 10 ** difficulty);
        if (tempValue < 10 ** (difficulty - 1)) continue;
    } while (!validateCanHit(tempValue, difficulty));

    hit = tempValue;
}

function checkHit(mayHit, difficulty) {
    let strike = 0, ball = 0;
    const stringMayHit = mayHit.toString();
    for (let i = 0; i < difficulty; i++) {
        if (checkArr[parseInt(stringMayHit[i])] === i) {
            strike++;
        } else if (checkArr[parseInt(stringMayHit[i])] !== undefined) {
            ball++;
        }
    }
    const li = document.createElement('li');
    li.innerText = `Guess ${stringMayHit} : strike = ${strike} , ball = ${ball}`;
    resultContainer.appendChild(li);

    if (strike === difficulty) {
        return true;
    }

    return false;
}

function youCanHit(difficulty) {
    progressBar.innerText = 'GoGo';

    button.addEventListener('click', function () {
        if (checkHit(inputContainer.value, difficulty)) {
            progressBar.innerText = 'Good Man';
        }
        inputContainer.value = '';
    });

    //checkHit(mayHit, difficulty));

    //
    // if (confirm('Do you want reGame?')) {
    //     initGame();
    // } else {
    //     alert('ByBy');
    // }
}

function prepareGame(difficulty) {
    if (difficulty === '3') {
        calHit(3);
        youCanHit(3);
    } else if (difficulty === '4') {
        calHit(4);
        youCanHit(4);
    } else {
        alert('Dont access restart Game');
        initGame();
    }
}

function initGame() {
    const difficulty = prompt("what is difficulty?");
    progressBar.innerText = 'init...';
    prepareGame(difficulty);
}

initGame();