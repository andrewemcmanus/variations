var vol = new Tone.volume(-12).toMaster();
var polySynth = new Tone.polySynth(3, Tone.FMSynth);
polySynth.connect(vol);
Tone.context.resume();
document.getElementById('go').addEventListener('click', go());

function go(){
    polySynth.triggerAttackRelease('C4', '16n'); 
};