# Variations Improv Battle!
​
## Overview
​
Variations is a game that tests your ability to briefly improvise around a major chord!
https://andrewemcmanus.github.io/

​
## Rules
​
When you click `Play`, the computer will play you three pitches from a major chord. Your job is to play a melodic variation on that major chord before the clock runs out. You win if your variation does the following two things:
​
* **uses all three pitches the computer gives you**
* **uses at least 5 non-chord tones**
​

The piano keyboard is labeled with the computer keyboard keys that you need to use.

## Approaches: random input and pitch collision detections
​
In many genres of music, a variation is usually defined as an elaboration or expansion of on a simple musical template. This template could be an entire melody, a larger harmonic structure, or even a simple motive like the one the computer provides in this game.

The piano keys are connected to Javascript event listeners that detect which key is being played, as well as the attack and release of each computer key. To properly judge both the player's input and the computer's output, I had to define "right" and "wrong" pitches.

For the computer, this meant randomly generating major chords, limiting the choices to what could fit on the keyboard, and mixing up the order of the 3 pitches when they're played back. This involved a lot of boolean logic. For the player, "right" and "wrong" meant defining chord tones (the 3 given by the computer) and non-chord tones (the remaining 9 pitches on the keyboard). This process ended up being very similar to collision detection.

## Technologies: Tone.js and VexFlow

In addition to HTML, CSS and Javascript, I used the tone.js audio API for basic playback. Unfortunately I ran into problems when trying to create more elaborate and interesting sounds, so this version of the game only uses a simple sine tone. Tone.js also made it impossible to reset the game without refreshing the page, so the "play again" button won't reset the audio.   

I attempted to use VexFlow, a music notation API, to display the computer's output for the player. Unfortunately I couldn't solve any of the issues with that, so I had to use the DOM to display the pitch names instead.

## Other unsolved problems:

The game obviously needs quite a bit more work on styling. The piano keyboard presented quite a few layout issues that I wasn't able to style around, so I simply went for basic text displays. The page also occasionally loads with a tone playing; refreshing it resolves the problem.
​
## some win-lose examples in music notation:

See `examples.png` in this repo for some winning and losing examples written in music notation.

## Code examples:

Chord and non-chord tones, as well as the order in which the computer plays them, are generated using arrays:

```
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

var chromNCTs = defineNCTs(finalSelection);`

```

This function stops the timer and evaluates the player's input:

```
function comparePitches() {
  clearInterval(timerInterval);
  let first = chordNoteNames[0];
  let second = chordNoteNames[1];
  let third = chordNoteNames[2];
  let pitches = [];  
  if (playerChoices.includes(first) && playerChoices.includes(second) && playerChoices.includes(third)) {
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
```
