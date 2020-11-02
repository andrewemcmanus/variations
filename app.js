
const keyboard = { // unicode numbers for a one-octave scale
    65: 'C',    // a
    87: 'C#',   // w
    83: 'D',    // s
    69: 'D#',   // e
    68: 'E',    // d
    70: 'F',    // f
    84: 'F#',   // t
    71: 'G',    // g
    89: 'G#',   // y
    72: 'A',    // h
    85: 'A#',   // u
    74: 'B',    // j
    // the numbers from this object need to be played AND notated by the computer (?)
    // The computer "plays each unicode key", while the player uses event listeners
    // each attached to a div
};

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

const selection = keepInOctave();

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
const finalSelection = order(selection);
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

const chromNCTs = defineNCTs(finalSelection);
console.log(chromNCTs);



////////////////// GENERATE (computer) RHYTHM: /////////////////////

// 3 note events separated by an even tempo (setInterval?)

// next step: play selection



///////////////////// HOW TO COMPARE EACH LISTENER VARIATION TO MAKE SURE THAT THEY'RE DIFFERENT /////////////////
// Since each variation should be different, the player should limit the overlap of the 9 NCTs among variations!
// "grade" the variations based on how many NCTs are repeated?
// load the NCTs used by the player into an array and check for repetitions








