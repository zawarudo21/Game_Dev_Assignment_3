This game essentially tries to defeat a very simple version of general grievous (GG) . A few features of the game are as follows:

1) Fixed time step update, variable rendering
2) heirachical modelling for GG
3) input handling using mouse clicks and keyboard button presses
4) collision detection for mouse click and various parts of general grievous
5) point (4) is implemented using web workers for a more optimized setting
6) game state save, load and reset on appropriate conditions
7) game logic including player health, a damage phase, collision handling, and different health values for subcomponents of GG
8) Interpolated rendering for smoother visual effects even at lower fps

The main aim of the game is to defeat GG. To do so, we must damage him, but since he is pretty good with lightsabers, we can't directly damage him. Instead, we must first take down his forearms (gray shaded part of the character) so he can't use his lightsabers. To do so we need to click on the forearms. A forearm protected by a lightsaber, or an incorrect click gives GG a chance to hit back, dealing damage to the player. Once all his forearms are weakened, GG is stunned for a few seconds where the user has time to attack him. This "attack" is done by pressing the correct keyboard input as displayed on the screen, once he is damageable. After a few seconds, GG regains composure and the player must repeat the process till one of them is defeated.

The above is implemented using various techniques and data structures like stacks, character arrays, keeping track of various rotation and translation matrices for each subcomponent, correct input handling, correct state transitions. For a harder challenge, many of the variables which govern GG's movement can be tweaked (by directly tweaking the code). The default settings are just about right for using a touchpad so that is not too frustrating but not a cakewalk either (at least in the first few tries).

No additional assets or libraries were used in this project.
