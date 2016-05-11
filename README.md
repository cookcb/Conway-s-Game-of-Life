# Conway-s-Game-of-Life
Implementation of Conway's Game of life with added features. 

SETUP AND OVERVIEW:
To load the application, use a2.html where the main code for the game is located. To create a grid, enter a width and height value and press the create grid button.

COLOR CODE:
Red indicates a square that was always dead.
Gray indicates a square that is alive.
Black indicates a square that was alive but is now dead. 

FEATURES AND SETTINGS:

1) Left clicking the cell will change 

2) Shift left clicking on a cell will force the cell to be alive if it isnt.

3) Ctrl left clicking a cell will force a cell to be dead if it isnt.

4) A speed meter is included to indicate how fast the game should operate from 0 to 1000 milliseconds.

5) The user can advance the operation by one step when the game is halted using the next button.

6) The random button will fill the grid randomly with alive cells.

7) A setting for the border that allows for neighbors outside of the grid to be evaluated as always dead, always alive or
toroidal(Wraps around to the other side vertically or horizontally).

8) The radius dial determines which cells are considered neighbors. 

9) The death by lonliness, death by overpopulation and generation min and max thresholds are all adjustable (By default the death by lonliness threshold = 2, the death by overpopulation threshold = 3 and the generation min and max are 3).

