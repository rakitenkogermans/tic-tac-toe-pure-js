'use strict'
// Pick elements
const selectBox = document.querySelector('.select-box');
const selectXButton = document.querySelector('.playerX');
const selectOButton = document.querySelector('.playerO');
const playingBoard = document.querySelector('.play-board');
const allBoxes = document.querySelectorAll('section span');
const players = document.querySelector('.players');
const resultBox = document.querySelector('.result-box');
const winnerTemplate = document.querySelector('.won-text');
const replayBtn = document.querySelector('.btn button');

// Add event listeners
window.document.addEventListener('DOMContentLoaded', () => {
    allBoxes.forEach((currentElement) => {
        currentElement.addEventListener('click', clickedBox);
    })

    selectXButton.addEventListener('click', () => {
        selectBox.classList.add('hide');
        playingBoard.classList.add('show');
    });
    selectOButton.addEventListener('click', () => {
        selectBox.classList.add('hide');
        playingBoard.classList.add('show');
        players.classList.add('active', 'player');
    });
});
replayBtn.addEventListener('click', () => {
    window.location.reload();
})

let XPlayer = 'fas fa-times';
let OPlayer = 'far fa-circle';
let playerSign = 'X';
let botIsRunning = true;

// Functions

function clickedBox(event) {
    if (players.classList.contains('player')) {
        event.target.innerHTML = `<i class="${OPlayer}"></i>`;
        playerSign = 'O';
        players.classList.remove('active');
        event.target.setAttribute('id', playerSign);
    } else {
        event.target.innerHTML = `<i class="${XPlayer}"></i>`;
        players.classList.add('active');
        event.target.setAttribute('id', playerSign);
    }
    getWinner();
    playingBoard.style.pointerEvents = 'none';
    event.target.style.pointerEvents = 'none';
    let delayTimeForBot = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        botClickedBox();
    }, +delayTimeForBot);
}

function botClickedBox() {
    if (botIsRunning) {
        playerSign = 'O';
        let array = [];
        allBoxes.forEach((elem, index) => {
            if (elem.childElementCount === 0) {
                array.push(index);
            }
        })
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains('player')) {
                allBoxes[randomBox].innerHTML = `<i class="${XPlayer}"></i>`;
                playerSign = 'X';
                players.classList.add('active');
                allBoxes[randomBox].setAttribute('id', playerSign);
            } else {
                allBoxes[randomBox].innerHTML = `<i class="${OPlayer}"></i>`;
                players.classList.remove('active');
                allBoxes[randomBox].setAttribute('id', playerSign);
            }
            getWinner();
        }
        playingBoard.style.pointerEvents = 'auto';
        allBoxes[randomBox].style.pointerEvents = 'none';
        playerSign = 'X';
    }

}

function getIdName (idName) {
    return document.querySelector('.box' + idName).id;
}

function checkThreeId (value1, value2, value3, sign) {
    if (getIdName(value1) === sign && getIdName(value2) === sign && getIdName(value3) === sign) {
        return true;
    }
}

function getWinner() {
    if (
        checkThreeId(1, 2, 3, playerSign) ||
        checkThreeId(4, 5, 6, playerSign) ||
        checkThreeId(7, 8, 9, playerSign) ||
        checkThreeId(1, 4, 7, playerSign) ||
        checkThreeId(2, 5, 8, playerSign) ||
        checkThreeId(3, 6, 9, playerSign) ||
        checkThreeId(1, 5, 9, playerSign) ||
        checkThreeId(3, 5, 7, playerSign)
    ) {
        console.log(playerSign + ' is the winner');
        botIsRunning = false;
        botClickedBox();
        setTimeout(() => {
            playingBoard.classList.remove('show');
            resultBox.classList.add('show');
        }, 500);
        winnerTemplate.innerHTML = `Player ${playerSign} won the game!`;
    } else {
        if (
            getIdName(1) !== '' &&
            getIdName(2) !== '' &&
            getIdName(3) !== '' &&
            getIdName(4) !== '' &&
            getIdName(5) !== '' &&
            getIdName(6) !== '' &&
            getIdName(7) !== '' &&
            getIdName(8) !== '' &&
            getIdName(9) !== ''
        ) {
            botIsRunning = false;
            botClickedBox();
            setTimeout(() => {
                playingBoard.classList.remove('show');
                resultBox.classList.add('show');
            }, 500);
            winnerTemplate.textContent = `DRAW! No winner.`;
        }
    }
}
