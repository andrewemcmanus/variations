

// Tone.Synth is a basic synthesizer with a single oscillator
const synth = new Tone.Synth();
// Set the tone to sine
synth.oscillator.type = "sine";
// connect it to the master output (your speakers)
synth.toMaster();

const piano = document.getElementById("piano");

piano.addEventListener("mousedown", e => {
  // fires off a note continously until trigger is released
  synth.triggerAttack(e.target.dataset.note);
});

piano.addEventListener("mouseup", e => {
  // stops the trigger
  synth.triggerRelease();
});

// handles keyboard events
document.addEventListener("keydown", e => {
  // e object has the key property to tell which key was pressed
  switch (e.key) {
    case "d":
      return synth.triggerAttack("C4");
    case "r":
      return synth.triggerAttack("C#4");
    case "f":
      return synth.triggerAttack("D4");
    case "t":
      return synth.triggerAttack("D#4");
    case "g":
      return synth.triggerAttack("E4");
    case "h":
      return synth.triggerAttack("F4");
    case "u":
      return synth.triggerAttack("F#4");
    case "j":
      return synth.triggerAttack("G4");
    case "i":
      return synth.triggerAttack("G#4");
    case "k":
      return synth.triggerAttack("A4");
    case "o":
      return synth.triggerAttack("A#4");
    case "l":
      return synth.triggerAttack("B4");
    default:
      return;
  }
});
// when the key is released, audio is released as well
document.addEventListener("keyup", e => {
  switch (e.key) {
    case "d":
    case "r":
    case "f":
    case "t":
    case "g":
    case "h":
    case "u":
    case "j":
    case "i":
    case "k":
    case "o":
    case "l":
       synth.triggerRelease(); 
  }
});
// Existing code unchanged.
window.onload = function() {
    var context = new AudioContext();
    // Setup all nodes
  };
  
  // One-liner to resume playback when user interacted with the page.
  document.querySelector('button').addEventListener('click', function() {
    context.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });


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

////////////// convert to pitches for computer to play back ////////////////////
function toNoteNames (array) { 
    let playbackNames = [];
    for (i = 0; i < 3; i++) {
        if (array[i] == 1) {
            playbackNames.push("C4");
        } else if (array[i] == 2) {
            playbackNames.push("C#4");
        } else if (array[i] == 3) {
            playbackNames.push("D");
        } else if (array[i] == 4) {
            playbackNames.push("D#4");
        } else if (array[i] == 5) {
            playbackNames.push("E4");
        } else if (array[i] == 6) {
            playbackNames.push("F4");
        } else if (array[i] == 7) {
            playbackNames.push("F#4");
        } else if (array[i] == 8) {
            playbackNames.push("G4");
        } else if (array[i] == 9) {
            playbackNames.push("G#4");
        } else if (array[i] == 10) {
            playbackNames.push("A4");
        } else if (array[i] == 11) {
            playbackNames.push("A#4");
        } else if (array[i] == 12) {
            playbackNames.push("B4");
        } 
    }
    return playbackNames;
}

var chordNoteNames = toNoteNames(finalSelection);
console.log(chordNoteNames);
// console.log(chromNCTs);

//////////////////////////////////// COMPUTER PLAYBACK GOES HERE ////////////////////////////////

// var volume = new Tone.Volume(-12).toMaster();

//create a synth and connect it to the main output (your speakers) - or just use the synth above?

// function go (array) {
//     let seq = new Tone.Sequence(function(time, idx)) {

//     }, array, "4n";
//     Tone.Transport(start('+0.2'));
//     seq.start();
// };

// go(finalSelection);


/////convert finalSelection to pitches, then play them using tone.js

////////////////////////////////////////// PLAYER RESPONSES GO HERE ////////////////////////////////////////
    ///// transcribe the pitches of each response
    ///// check that they contain all 3 pitches of finalSelection - otherwise X
    ///// if so, load triggered pitches loaded into an array
	///// Make rhythm flexible - but you have a very short time limit!
	
	// eventlisteners for each pitch (querySelector for each note) transcribe a number? Load this into playerChoices array?


/////////////////////////////////////////////// COMPARE PITCHES ///////////////////////////////////////////
// var computerChoices = assemble(finalSelection, chromNCTs);
// var playerChoices = assemble(finalSelection, allNCTs);

//   const computer = new Variation(finalSelection, chromNCTs);
//   const player = new Variation(finalSelection, "allNCTs"); // selections from their 5 turns?
//  if finalSelection isn't contained within each playerChoice - lose points

// function compareNumberOfPitches() {
//     let duplicates = [];  
//     if (computerChoices.length > playerChoices.length) {
//           console.log('you lose!');
//           return duplicates;
//           // use DOM to place messages on the screen
//       } else if (computerChoices.length < playerChoices.length) {
//             for (let i = 0; i < playerChoices.length; i++) {
//               let value = playerChoices[i];
//               if (playerChoices.indexOf(value) !== -1) {
//                 duplicates.push(playerChoices[i]);
//               }
//               return duplicates;
//             }
//           }
//       }
// var duplicates = compareNumberOfPitches(); // do something, connect it to DOM
      
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






