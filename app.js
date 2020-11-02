
 // generate 3 pitches 

function makeArray () {
    let root = Math.floor(Math.random() * Math.floor(4)) + 1;
    // console.log(root);
    const array1 = [root, root + 4, root + 7];
    const array2 = [root, root + 3, root + 8];
    const array3 = [root, root + 5, root + 9];
    let inversion = Math.floor(Math.random() * Math.floor(2));
        if (inversion = 0) {
            let choice = array1;
            return choice;
        } else if (inversion = 1) {
            let choice = array2;
            return choice;
        } else if (inversion = 2) {
            let choice = array3;
            return choice;
        }
}

let choice = makeArray();
function keepInOctave () {
    if (choice[2] <= 12) {
        console.log(choice);
        return choice;
    } else {
        console.log('Run again');
        makeArray();
    }
}

const selection = keepInOctave();

// event listeners




