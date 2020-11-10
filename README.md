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
In many genres of music, a variation is usually defined as an elaboration or expansion of on a simple musical template. This template could be an entire melody, a larger hamonic structure, or even a simple motive like the one the computer provides in this game. 

The piano keys are connected to Javascript event listeners that detect which key is being played, as well as the attack and release of each computer key. To properly judge both the player's input and the computer's output, I had to define "right" and "wrong" pitches.

For the computer, this meant randomly generating major chords, limiting the choices to what could fit on the keyboard, and mixing up the order of the 3 pitches when they're played back. This involved a lot of boolean logic. For the player, "right" and "wrong" meant defining chord tones (the 3 given by the computer) and non-chord tones (the remaining 9 pitches on the keyboard). This process ended up being very similar to collision detection.

## Technologies: Tone.js and VexFlow

I used the tone.js audio API for basic playback. Unfortunately I ran into problems when trying to create more elaborate and interesting sounds, so this version of the game only uses a simple sine tone. Tone.js also made it impossible to reset the game without refreshing the page, so the "play again" button won't reset the audio.   

I attempted to use VexFlow, a music notation API, to display the computer's output for the player. Unfortunately I couldn't solve any of the issues with that, so I had to use the DOM to display the pitch names instead.

## Other unsolved problems:

The game obviously needs quite a bit more work on styling. The piano keyboard presented quite a few layout issues that I wasn't able to style around, so I simply went for basic text displays. The page also occasionally loads with a tone playing; refreshing it resolves the problem.
​
## some win-lose examples in music notation:

See `examples.png` in this repo for some winning and losing examples written in music notation.








