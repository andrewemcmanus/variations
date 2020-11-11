let playerScore = 0;
//attach a click listener to a play button

// Tone.Synth is a basic synthesizer with a single oscillator
let context = new AudioContext();
let synth = new Tone.Synth();
let now = Tone.now();
// Set the tone to sine
synth.oscillator.type = "sine";
// connect it to the master output (your speakers)
synth.toDestination();

const piano = document.getElementById("piano");

piano.addEventListener("mousedown", e => {
  // fires off a note continously until trigger is released
  synth.triggerAttack(e.target.dataset.note);
});
piano.addEventListener("mouseup", e => {
  // stops the trigger
  synth.triggerRelease();
});

var playerChoices = [];
document.addEventListener("keydown", e => {
  // e object has the key property to tell which key was pressed
  switch (e.key) {
    case "d":
    playerChoices.push("C4");
    document.getElementById("C").style.background = "red";
		// console.log(playerChoices);
	  	return synth.triggerAttack("C4");
    case "r":
    playerChoices.push("C#4");
    document.getElementById("Csharp").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("C#4");
    case "f":
    playerChoices.push("D4");
    document.getElementById("D").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("D4");
    case "t":
    playerChoices.push("D#4");
    document.getElementById("Dsharp").style.background = "red";
		// console.log(playerChoices);
     	return synth.triggerAttack("D#4");
    case "g":
    playerChoices.push("E4");
    document.getElementById("E").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("E4");
    case "h":
    playerChoices.push("F4");
    document.getElementById("F").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("F4");
    case "u":
    playerChoices.push("F#4");
    document.getElementById("Fsharp").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("F#4");
    case "j":
    playerChoices.push("G4");
    document.getElementById("G").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("G4");
    case "i":
    playerChoices.push("G#4");
    document.getElementById("Gsharp").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("G#4");
    case "k":
    playerChoices.push("A4");
    document.getElementById("A").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("A4");
    case "o":
    playerChoices.push("A#4");
    document.getElementById("Asharp").style.background = "red";
		// console.log(playerChoices);
      	return synth.triggerAttack("A#4");
    case "l":
    playerChoices.push("B4");
    document.getElementById("B").style.background = "red";
		// console.log(playerChoices);
        return synth.triggerAttack("B4");
    default:
      return;
  }
});
// when the key is released, audio is released as well
document.addEventListener("keyup", e => {
  switch (e.key) {
    case "d":
      document.getElementById("C").style.background = "#fffff0";
      synth.triggerRelease();
    case "r":
      document.getElementById("Csharp").style.background = "black";
      synth.triggerRelease();
    case "f":
      document.getElementById("D").style.background = "#fffff0";
      synth.triggerRelease();
    case "t":
      document.getElementById("Dsharp").style.background = "black";
      synth.triggerRelease();
    case "g":
      document.getElementById("E").style.background = "#fffff0";
      synth.triggerRelease();
    case "h":
      document.getElementById("F").style.background = "#fffff0";
      synth.triggerRelease();
    case "u":
      document.getElementById("Fsharp").style.background = "black";
      synth.triggerRelease();
    case "j":
      document.getElementById("G").style.background = "#fffff0";
      synth.triggerRelease();
    case "i":
      document.getElementById("Gsharp").style.background = "black";
      synth.triggerRelease();
    case "k":
      document.getElementById("A").style.background = "#fffff0";
      synth.triggerRelease();
    case "o":
      document.getElementById("Asharp").style.background = "black";
      synth.triggerRelease();
    case "l":
      document.getElementById("B").style.background = "#fffff0";
      synth.triggerRelease();
    default:
      return; 
  }
});


//////////////////// PITCHES: ///////////////////////

 // generate a major chord: 

function makeArray() { 
    let root = Math.floor(Math.random() * Math.floor(5)) + 1;
    // console.log(root);
    const array1 = [root, root + 4, root + 7];
    const array2 = [root, root + 3, root + 8];
    const array3 = [root, root + 5, root + 9];
    let inversion = Math.floor(Math.random() * Math.floor(3)) + 1; // adding 1 apparently works...
        if (inversion == 1) {
            let choice = array1;
            return choice;
        } else if (inversion == 2) {
            let choice = array2;
            return choice;
        } else if (inversion == 3) {
            let choice = array3;
            return choice;
        }
}

var choice = makeArray();

// keep the chord above within the 12 keys on the keyboard 
function keepInOctave () {
    if (choice[2] <= 12) {
        return choice;
    } else if (choice[2] > 12) {
      let newchoice = choice[2] - 12;
      choice.pop();
      choice.push(newchoice);
      return choice;
    } 
}
var selection = keepInOctave();

// mix up the order of the 3 pitches
function pitchOrder () {
    let order = Math.floor(Math.random * Math.floor(5));
    const pitchA = selection[0];
    const pitchB = selection[1];
    const pitchC = selection[2];
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
var finalSelection = pitchOrder();

// define the non-chord tones that the player must use:

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
    for (i = 0; i < array.length; i++) {
        if (array[i] == 1) {
            playbackNames.push("C4");
        } else if (array[i] == 2) {
            playbackNames.push("C#4");
        } else if (array[i] == 3) {
            playbackNames.push("D4");
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
var nonChordTones = toNoteNames(chromNCTs);
console.log(chordNoteNames);
console.log(nonChordTones);

//////////////////////////////////// COMPUTER PLAYBACK GOES HERE ////////////////////////////////

function playComputer () {
  let first = chordNoteNames[0];
  let second = chordNoteNames[1];
  let third = chordNoteNames[2];
  document.querySelector("#go").innerText = "Listen...";
  document.querySelector("#pitches").innerText = first + "    " + second + "    " + third;
  synth.triggerAttackRelease(first, "4n", now);
  synth.triggerAttackRelease(second, "4n", now + 1);
  synth.triggerAttackRelease(third, "4n", now + 2);
};

/////////////////////////////////////////////// COMPARE PITCHES ///////////////////////////////////////////
function playerGo () {
  let playerChoices = [];
  document.querySelector("#go").innerText = "Go!";
  document.getElementById("player-score").innerText = "Score: " + playerScore;
  return playerChoices;
};

const TIME_LIMIT = 4; // 4 seconds
let timePassed = 0;
let timeLeft = TIME_LIMIT;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${formatTimeLeft(timeLeft)}
  </span>
</div>
`;

function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);
  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;
  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    
    // The amount of time passed increments by one
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    
    // The time left label is updated
    document.getElementById("base-timer-label").innerHTML = formatTimeLeft(timeLeft);
  }, 1000);
};

function comparePitches() {
  clearInterval(timerInterval);
  let first = chordNoteNames[0];
  let second = chordNoteNames[1];
  let third = chordNoteNames[2];
  let pitches = [];  
  if (playerChoices.includes(first) && playerChoices.includes(second) && playerChoices.includes(third)) {
      // console.log("You're ok!");
      for (let i = 0; i < nonChordTones.length; i++) {
        let pitch = nonChordTones[i];
        if (playerChoices.includes(pitch)) {
          pitches.push(pitch);
        }
      }
      let points = pitches.length;
      document.getElementById("player-score").innerText = "Score: " + points;
      Tone.context.close();
      return points;
        } else {
          document.querySelector('#go').innerText = "Try again!";
          Tone.context.close();
          return points;
        }
      };
      
////////////////// ORGANIZE FUNCTIONS TIMING ///////////////////
async function delay(ms) {
        return await new Promise(resolve => setTimeout(resolve, ms));
      };
      
let play = async ()=>{
        await delay(0);
        playComputer(); 
        await delay(5000);
        startTimer();
        playerGo();
        await delay(4000);
        let playerScore = comparePitches();
        if (playerScore < 5) {
          document.querySelector("#go").innerText = "Try again!";
        } else if (playerScore >= 5) {
          document.querySelector("#go").innerText = "You win!";
        }
      };

////// CLEAR PLAYERCHOICES AT THE END OF EACH TURN? ////////////////

function playAgain () {
  let playerChoices = [];
  let finalSelection = [];
  let playerScore = 0;
  document.getElementById("player-score").innerText = "0";
  return playerChoices, finalSelection, playerScore;
}
