const { toNamespacedPath } = require("path");

const keyboard = { // unicode numbers for a one-octave scale
    C: 65,    // a
    Csharp: 87,   // w
    D: 83,    // s
    Dsharp: 69,   // e
    E: 68,    // d
    F: 70,    // f
    Fsharp: 84,   // t
    G: 71,    // g
    Gsharp: 89,   // y
    A: 72,    // h
    Asharp: 85,   // u
    B: 74 // j
    // the numbers from this object need to be played AND notated by the computer (?)
    // The computer "plays each unicode key", while the player uses event listeners
    // each attached to a div??
};

// console.log(keyboard.C);
// function playKeys (key) {
// }
// const synth = new Tone.Synth().toDestination();
// const now = Tone.now()
// // trigger the attack immediately
// synth.triggerAttack("C4", now)
// // wait one second before triggering the release
// synth.triggerRelease(now + 1)

// document.getElementById('C').addEventListener('click', playKeys(keyboard.C));
// tone.js here: see video
// var p1 = new Tone.players({
//     // key value assignments go here... attach "C" to a link, each key after that?
// }, function() {

// });

// function go() {
//     // p1.get('hihat').start;
//     Tone.Transport.bpm.value = 120;
//     var seq = new Tone.Sequence(function(time, idx)
// {
//     eval.(editor.getValue());

// }, [], "4n");
// }

// final Selection: connect to event listeners

//////////////////// PITCHES: ///////////////////////

 // generate a major chord: 

function makeArray() {
    let root = Math.floor(Math.random() * Math.floor(5)) + 1;
    // console.log(root);
    const array1 = [root, root + 4, root + 7];
    const array2 = [root, root + 3, root + 8];
    const array3 = [root, root + 5, root + 9];
    let inversion = Math.floor(Math.random() * Math.floor(3)) + 1; // adding 1 apparently works...
        if (inversion = 1) {
            let choice = array1;
            return choice;
        } else if (inversion = 2) {
            let choice = array2;
            return choice;
        } else if (inversion = 3) {
            let choice = array3;
            return choice;
        }
}

let choice = makeArray();
// keep the chord above within the 12 keys on the keyboard 
function keepInOctave () {
    if (choice[2] <= 12) {
        return choice;
    } else {
        console.log('Run again'); //
    }
}

var selection = keepInOctave();

function order (array) {
    let order = Math.floor(Math.random * Math.floor(5));
    const pitchA = array[0];
    const pitchB = array[1];
    const pitchC = array[2];
    if (order = 0) {
        let final1 = [pitchA, pitchB, pitchC];
        return final1;
    } else if (order = 1) {
        let final2 = [pitchA, pitchC, pitchB];
        return final2;
    } else if (order = 2) {
        let final3 = [pitchB, pitchA, pitchC];
        return final3;
    } else if (order = 3) {
        let final4 = [pitchB, pitchC, pitchA];
        return final4;
    } else if (order = 4) {
        let final5 = [pitchC, pitchA, pitchB];
        return final5;
    } else if (order = 5) {
        let final6 = [pitchC, pitchB, pitchA];
        return final6;
    }
}
var finalSelection = order(selection);
console.log(finalSelection);

// define the array of non-chord tones that the player can use:

function defineNCTs (array) {
    let chromScale = [];
    let pitchA = array[0];
    let pitchB = array[1];
    let pitchC = array[2];
    for (let i = 1; i < 13; i++) {
        if (i !== pitchA && i !== pitchB && i !== pitchC) {
            chromScale.push(i);
        }
    };
    return chromScale;
}

var chromNCTs = defineNCTs(finalSelection);
// console.log(chromNCTs);

////////////// COMPUTER PLAYBACK GOES HERE ///////////////////
////////////// notation display? ///////////////////////

// var volume = new Tone.Volume(-12).toMaster();

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
const now = Tone.now();
synth.triggerAttackRelease("C4", "8n", now); // insert finalSelection[0], finalSelection[1], finalSelection[2]
synth.triggerAttackRelease("E4", "8n", now + 0.5);
synth.triggerAttackRelease("G4", "8n", now + 1);

/////convert finalSelection to pitches, then play them using tone.js

////////////// PLAYER RESPONSES GO HERE ////////////////////
    ///// transcribe the pitches of each response
    ///// check that they contain finalSelection - otherwise X
    ///// if so, load triggered pitches loaded into an array
    ///// Make rhythm flexible - but you have a time limit!


////////////// COMPARE PITCHES ///////////////////
var computerChoices = assemble(finalSelection, chromNCTs);
var playerChoices = assemble(finalSelection, allNCTs);

//   const computer = new Variation(finalSelection, chromNCTs);
//   const player = new Variation(finalSelection, "allNCTs"); // selections from their 5 turns?
//  if finalSelection isn't contained within each playerChoice - lose points
function compareNumberOfPitches() {
    let duplicates = [];  
    if (computerChoices.length > playerChoices.length) {
          console.log('you lose!');
          return duplicates;
          // use DOM to place messages on the screen
      } else if (computerChoices.length < playerChoices.length) {
            for (let i = 0; i < playerChoices.length; i++) {
              let value = playerChoices[i];
              if (playerChoices.indexOf(value) !== -1) {
                duplicates.push(playerChoices[i]);
              }
              return duplicates;
            }
          }
      }
var duplicates = compareNumberOfPitches(); // do something, connect it to DOM
      
      // a way to keep track of a player score (From drum machine)
updatePlayerScore = (score, difficulty, remainingTime) => { // replace "difficulty" with a different parameter
    const roundScore = (score * difficulty);
    const timeBonus = Math.round(remainingTime * 10);
    playerScore = playerScore + (roundScore + timeBonus);
    showScoreBoard(roundScore, timeBonus, playerScore, remainingTime); 
    document.getElementById('score-span').innerText = `Score: ${playerScore}`;
      }
      
showScoreBoard = (roundSc, timeBo, playerSc, remainingTime) => {
    let scoreBoard = document.getElementById('score-board');
    let boardTitle = document.getElementById('board-title');
    let boardRoundScore = document.getElementById('board-round-score');
    let boardTimeBonus = document.getElementById('board-time-bonus');
    let boardTotalScore = document.getElementById('board-total-score');
    const titleText = (remainingTime) ? "Round Passed!" : "Time's up!";
    boardTitle.innerText = titleText;
    boardRoundScore.innerText = roundSc;
    boardTimeBonus.innerText = timeBo;
    boardTotalScore.innerText = playerSc;
    scoreBoard.style.display = 'flex';
    setTimeout(() => {
      scoreBoard.style.display = 'none';
        }, 4000);
      }


// function adjustScore() {
//     var score;
//     if (duplicates = 0) {
//         return score;
//     } else {
//         for (i = 0; i < duplicates.length; i++) {
//             var score = score - 1;
//             return score;
//         }
//     }
// }



// Tone.js abstracts away the AudioContext time. 
// Instead of defining all values in seconds, any method which takes time as an argument can accept a number or a string. 
// For example "4n" is a quarter-note, "8t" is an eighth-note triplet, and "1m" is one measure.

// document.querySelector('button')?.addEventListener(KEY, async () => {
// 	await Tone.start()
// 	console.log('audio is ready')
// })


// 3 note events separated by an even tempo (setInterval?)

// next step: play selection

///////////////////// HOW TO COMPARE EACH LISTENER VARIATION TO MAKE SURE THAT THEY'RE DIFFERENT /////////////////
// Since each variation should be different, the player should limit the overlap of the 9 NCTs among variations
// subtract the number of *repeated* NCTs from the total






