# freeCodeCamp: Calculator

This is a calculator developed for the freeCodeCamp Front End Certificate. Allows multiple arithmetic operations and calculates result with recursive algorithm.

## Getting started

This is a stand alone single page app, all external libraries needed are either included as files on the repo or via CDN

## Requirements

* Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/rLJZrA/)
* **User Story:** I can add, subtract, multiply and divide two numbers
* **User Story:** I can clear the input field with a clear button.
* **User Story:** I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.

## Features

*Code:*
* uses **module pattern**  to make the calculator reusable
* uses **recursive algorithm** to evaluate expression

*Fulfillment of Requirements:*
* allows + - * / operations
* "CE" button: clears current input (main screen only)
* "AC" button: resets calculator (main and sub screen)
* allows chaining of multiple operations together
* *"main screen":* current operand or operator
* *"sub screen":* current set of operations being inputted

*Extra features:*
* allows chaining of result. i.e. result of operation can be reused as operand for the next
* allows operations with floats

## Known issues:

* can provide a negative result but, if the result is reused in a subsequent operation the output is 'NaN'

## Screenshots

![###](/###.png "###")

## APIs / Libraries used

* jQuery 3.2.1
* Bootstrap 3.3.7 CSS

## Licence 

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Creative Commons License")

