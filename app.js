// const { toNamespacedPath } = require("path");

const keyboard = { // unicode numbers for a one-octave scale
    65: "C4",    // a
    87: "C#4",   // w
    83: "D4",    // s
    69: "D#4",   // e
    68: "E4",    // d
    70: "F4",    // f
    84: "F#4",   // t
    71: "G4",    // g
    89: "G#4",   // y
    72: "A4",    // h
    85: "A#4",   // u
    74: "B4"     // j
    // the numbers from this object need to be played AND notated by the computer (?)
    // The computer "plays each unicode key", while the player uses event listeners
    // What does the event listener refer to, and what does the output have to be??
};

function playKeyboard(){

	let pressColor = '#1BC0EA'; //color when key is pressed

	var __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.5);
	var __octave = 4; //sets position of middle C, normally the 4th octave
	
	
	var reverseLookupText = {};
	var reverseLookup = {};

	// Create a reverse lookup table.
	for(var i in keyboard) {
	
		var val;

		switch(i|0) { //some characters don't display like they are supposed to, so need correct values
		
			case 187: //equal sign
				val = 61; //???
				break;
			
			case 219: //open bracket
				val = 91; //left window key
				break;
			
			case 221: //close bracket
				val = 93; //select key
				break;
			
			case 188://comma
				val = 44; //print screen
				break;
			//the fraction 3/4 is displayed for some reason if 190 wasn't replaced by 46; it's still the period key either way
			case 190: //period
				val = 46; //delete
				break;
			
			default:
				val = i;
				break;
			
		}
	
		reverseLookupText[keyboard[i]] = val;
		reverseLookup[keyboard[i]] = i;
	
	}

	// Keys you have pressed down.
	var keysPressed = [];

	// Generate keyboard
	let visualKeyboard = document.getElementById('keyboard');
	let selectSound = {
		value: "0" //piano
	};

	var iKeys = 0;
	var iWhite = 0;
	var notes = __audioSynth._notes; //C, C#, D....A#, B

	for(var i=-2;i<=1;i++) {
		for(var n in notes) {
			if(n[2]!='b') {
				var thisKey = document.createElement('div');
				if(n.length>1) { //adding sharp sign makes 2 characters
					thisKey.className = 'black key'; //2 classes
					thisKey.style.width = '30px';
					thisKey.style.height = '120px';
					thisKey.style.left = (40 * (iWhite - 1)) + 25 + 'px';
				} else {
					thisKey.className = 'white key';
					thisKey.style.width = '40px';
					thisKey.style.height = '200px';
					thisKey.style.left = 40 * iWhite + 'px';
					iWhite++;
				}

				var label = document.createElement('div');
				label.className = 'label';

				let s = getDispStr(n,i,reverseLookupText);

				label.innerHTML = '<b class="keyLabel">' + s + '</b>' + '<br /><br />' + n.substr(0,1) +
					'<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)) + '</span>' + (n.substr(1,1)?n.substr(1,1):'');
				thisKey.appendChild(label);
				thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
				thisKey.addEventListener(evtListener[0], (function(_temp) { return function() { fnPlayKeyboard({keyCode:_temp}); } })(reverseLookup[n + ',' + i]));
				visualKeyboard[n + ',' + i] = thisKey;
				visualKeyboard.appendChild(thisKey);
				
				iKeys++;
			}
		}
	}

	visualKeyboard.style.width = iWhite * 40 + 'px';

	window.addEventListener(evtListener[1], function() { n = keysPressed.length; while(n--) { fnRemoveKeyBinding({keyCode:keysPressed[n]}); } });
	
// Detect keypresses, play notes.

	var fnPlayKeyboard = function(e) {
	
		var i = keysPressed.length;
		while(i--) {
			if(keysPressed[i]==e.keyCode) {
				return false;	
			}
		}
		keysPressed.push(e.keyCode);

		if(keyboard[e.keyCode]) {
			if(visualKeyboard[keyboard[e.keyCode]]) {
				visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = pressColor;
				//visualKeyboard[keyboard[e.keyCode]].classList.add('playing'); //adding class only affects keypress and not mouse click
				visualKeyboard[keyboard[e.keyCode]].style.marginTop = '5px';
				visualKeyboard[keyboard[e.keyCode]].style.boxShadow = 'none';
			}
			var arrPlayNote = keyboard[e.keyCode].split(',');
			var note = arrPlayNote[0];
			var octaveModifier = arrPlayNote[1]|0;
			fnPlayNote(note, __octave + octaveModifier);
		} else {
			return false;	
		}
	
	}
	// Remove key bindings once note is done.
	var fnRemoveKeyBinding = function(e) {
	
		var i = keysPressed.length;
		while(i--) {
			if(keysPressed[i]==e.keyCode) {
				if(visualKeyboard[keyboard[e.keyCode]]) {
					//visualKeyboard[keyboard[e.keyCode]].classList.remove('playing');
					visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = '';
					visualKeyboard[keyboard[e.keyCode]].style.marginTop = '';
					visualKeyboard[keyboard[e.keyCode]].style.boxShadow = '';
				}
				keysPressed.splice(i, 1);
			}
		}
	
	}
	// Generates audio for pressed note and returns that to be played
	var fnPlayNote = function(note, octave) {

		src = __audioSynth.generate(selectSound.value, note, octave, 2);
		container = new Audio(src);
		container.addEventListener('ended', function() { container = null; });
		container.addEventListener('loadeddata', function(e) { e.target.play(); });
		container.autoplay = false;
		container.setAttribute('type', 'audio/wav');
		container.load();
		return container;
	
	};

	//returns correct string for display
	function getDispStr(n,i,lookup) {

		if(n=='C' && i==-2){
			return "~";
		}else if(n=='B' && i==-2){
			return "-";
		}else if(n=='A#' && i==0){
			return ";";
		}else if(n=='B' && i==0){
			return "\"";
		}else if(n=='A' && i==1){
			return "/";
		}else if(n=='A#' && i==1){
			return "<-";
		}else if(n=='B' && i==1){
			return "->";
		}else{
			return String.fromCharCode(lookup[n + ',' + i]);
		}

	}
	window.addEventListener('keydown', fnPlayKeyboard);
	window.addEventListener('keyup', fnRemoveKeyBinding);
}




// document.getElementById("C").addEventListener('click', async () => {
//     await Tone.start();
// });
// document.getElementById("Csharp").addEventListener();
// document.getElementById("D").addEventListener();
// document.getElementById("Dsharp").addEventListener();
// document.getElementById("E").addEventListener();
// document.getElementById("F").addEventListener();
// document.getElementById("Fsharp").addEventListener();
// document.getElementById("G").addEventListener();
// document.getElementById("Gsharp").addEventListener();
// document.getElementById("A").addEventListener();
// document.getElementById("Asharp").addEventListener();
// document.getElementById("B").addEventListener();

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

////////////// convert to pitches for computer to play back
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

//create a synth and connect it to the main output (your speakers)

function go (array) {
    let seq = new Tone.Sequence(function(time, idx)) {

    }, array, "4n";
    Tone.Transport(start('+0.2'));
    seq.start();
};

go(finalSelection);


/////convert finalSelection to pitches, then play them using tone.js

////////////////////////////////////////// PLAYER RESPONSES GO HERE ////////////////////////////////////////
    ///// transcribe the pitches of each response
    ///// check that they contain finalSelection - otherwise X
    ///// if so, load triggered pitches loaded into an array
    ///// Make rhythm flexible - but you have a time limit!


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






