# Chinmay's Logistic Growth Based Game of Life

This Game is a **modified version of the famous "Conway's Game of Life"**, originally introduced by John Conway in 1970. The Rules of this game are adjusted so as to simulate Logistic Growth based on the equation,<br>
![Logistic Growth Latex](https://user-images.githubusercontent.com/30256734/63094773-e4ffc100-bf86-11e9-81c0-8ffa2e7490a3.png)<br>
Or more specifically,<br>
![Logistic Growth Rate Latex](https://user-images.githubusercontent.com/30256734/63094254-7706ca00-bf85-11e9-853c-23bbb4b52bda.png)<br>
Note it can be modified for other equations also, but for now this equation is selected.
[Play the Game!](https://logistic-game-of-life.herokuapp.com/)

The modification on the rules of this game are my ideas, so please give credit if you are sharing :-)

### Rules

Rules of the game at each step are -
1. Any live cell with fewer than 2 live neighbours dies, as if by underpopulation.
2. Any live cell with 2 or 3 live neighbours lives on to the next generation **BUT may randomly die if net-growth < 0, as if by accidents/natural disasters**.
3. Any live cell with more than 4, as if by overpopulation.
4. Any dead/unborn cell with 3 live neighbours becomes a live cell, as if by reproduction.
5. Any dead/unborn cell with 2 live neighbours and netgrowth > 0 **may randomly become alive, as if by reproduction**.

The count of the number of cells follow the growth equation.
'net-growth' is referred to as 'boost' in the program.
It is the "drop in no. of cells based on Conway's Orignal rules added with the expected growth from the growth equation".


### Setup

To setup, first make sure you have yarn (or npm, npx..) installed!
1. Download the zip or clone the repo, `git clone https://github.com/cheese-cracker/logistic-game-of-life.git && cd logistic-game-of-life`
2. Run `yarn start` in the root directory.
3. Game should be opened on your browser!

### Screenshots and Overview
![gameoflif](https://user-images.githubusercontent.com/30256734/66912123-9a0a3480-f02f-11e9-9d53-d5e19f531c74.png)
This Game contains - 
- Input any github user's contribution matrix into the game to play with!
- Simulate logistic growth to the carrying capacity K. The number of cells will grow towards K with the growth rate r.
- The 'generation' and 'count' at the bottom of the grid denote the number of iterations and the count of the active cells.
- There are play, pause and clear buttons, along with the seed button which generates a random pattern.
- Custom patterns can also be made by clicking the cells.

Cheers, CH
