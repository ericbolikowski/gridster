# React/Redux test

## Instructions
The test is in two parts, described below. Your solution should be developed in some flavour of JavaScript (es5/es6/esWhatever/Typescript/Flow) **using React and Redux** - please no CoffeeScript though. CoffeeScript is the root of all evil that isn't caused by premature optimisation.
Build tool (webpack/browserify etc) is also up to you. Feel free to use a react app seed like create-react-app to save yourself some time.

## Part 1
Part one is intended as a simple test of your understanding of react/redux and your ability to lay out a UI according to a supplied design.
An image of the UI along with the required logo have been supplied with this test.

Please create a UI consisting of
+ An input labeled 'Rows' which only allows integers and has a max value of 20.
+ An input labeled 'Columns' which only allows integers and has a max value of 20.
+ A button labeled ‘Generate’.
+ A [Rows] by [Columns] grid of squares each of which is large enough to be clicked with the mouse.
+ The look of the UI should match the one supplied to you in the zip file attached.
+ The initial dimensions of the grid should be 10 by 10. This should be reflected in the state of the Rows and Columns inputs.
+ When the grid is first initialised or resized exactly one square in the leftmost column is chosen at random and marked as a 'start' square and coloured appropriately.
+ When the grid is first initialised or resized exactly one square in the rightmost column is chosen at random and marked as an 'end' square and coloured appropriately.
+ The initial state of each square in the grid except the 'start' and 'end' squares is 'filled' and it should be coloured appropriately.
+ Clicking on any 'filled' square which is not the 'start' or 'end' square changes its state to 'clear', and it should be re-coloured appropriately.
+ Clicking on any 'clear' square which is not the 'start' or 'end' square changes its state to 'filled'.
+ If the value of either input is changed and the generate button is clicked, the grid should be resized appropriately, the 'start' and 'end' squares
should be re-set as described above and all other squares should be re-set to ‘filled'.

## Part 2
Part 2 relies upon Part 1 so please implement it first. Part 2 is intended as a test of your ability to analyse a difficult problem and research and implement an appropriate solution.

**Tip**: Do not try to invent your own algorithm to solve this part.


+ In the UI described above, if at any point there is a connected path of 'clear' squares all the way from the 'start' square to the 'end' square then the path should be coloured appropriately, as indicated on the design image.
+ ‘Clear' squares are only connected by their sides (up/down/left/right). They do not connect diagonally.
+ If there is more than one path from the 'start' square to the 'end' square then only the shortest path should be shown.

You are expected to implement the algorithm for this part yourself. However, depending on your approach, you may find that you need a min or max priority queue. Please feel free to use one of the priority queue libraries on NPM.
