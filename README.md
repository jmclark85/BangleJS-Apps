# BangleJS-Apps

This is a repository for applications and scripts for the BangleJS smartwatch.

I rarely use JS, so the code here is likely not to represent best-practices. Also, files in here are probably works in progress and may not be finished applications.

## BangleJS

The BangleJS is an opensource smartwatch running Espruino.

Website: https://banglejs.com/
Web-IDE and emulator: https://www.espruino.com/ide/

## Music Player (WIP)

Button 1 starts.
Button 3 stops.

Little script to play music. The piezo in the watch works better at higher frequencies (as one would expect). It's also not particularly loud.

The default score is a short snippet from a familiar song. You can replace it with something by passing the play function an array of objects in the format:
{ pitch:"noteName", time:"noteValue", octave:"numOctavesAboveBase", isDotted:"t/f" }

Note that the octave displacement only works upwards. Don't pass it a number less than 0 (use 0 for the base octave). I haven't tested it... it might phase-invert, it might silently fail, it might ignore the sign, it might crash... there's also no try-catch for it. Using lower octaves than the base makes the sound even quieter than it already is.

You can leave off the octave and isDotted keys from the object if they are the default values (0 and false). The play() function calls getFormattedNote() which checks for the key and assigns the correct value if it's not there.

I frequently get it working, then try to do something that breaks it while refactoring the code and adding new features.
