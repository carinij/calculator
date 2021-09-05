# Calculator

![Calculator, full field, clear mode](/readme_assets/calculator_image_1.png)

## Overview

### Background
A straightforward calculator. Supports +, -, \*, /, and (). To create an expression for evaluation, please press the calculator buttons or click in the text box labeled "Expression" and start typing. Click on "=" to see the result.

For your convenience, the calculator saves a list of your recent results. It also has three selectable modes for when you click on "=" and it successfully evaluates your expression:
* In "Clear" mode, the calculator will delete the contents of the input text box.
* In "Keep" mode, the calculator will keep your expression (useful if you want to test many small variations on a given expression, especially if it's a long or complicated one).
* In "Replace" mode, the calculator will show the answer in both the list at the top and the input text box (useful if you want to do further calculations with the result of a calculation).

The calculations are done on the server and sent back to the client in your browser. An API is available (see information below).

### Technologies

* React
* Node.js
* Express
* Nginx
* AWS EC2
* Jest

### Highlights

* Handles deeply nested ()
* Is more precise than Javascript's default for arithmetic with floating points (e.g. this calculator evaluates 0.2 + 0.1 as "0.3" rather than "0.30000000000000004")
* Arguably at least somewhat stylish

## Installation and Start

1. Clone down
2. From root directory: `npm install`.
3. Build the client with `npm run build-prod` (or `npm run build-dev` for watch mode, source mapping, and various development features).
4. Start the server with `npm run serve-prod` (or `npm run serve-dev` for watch mode via nodemon).
5. Navigate to localhost:3000
6. To install non-locally, before building change the host and port number constants to match your setup in these files: `./client/app.jsx`, `./server/server.js`, `./server/server-start.js`

## API

The API just has one route: `/calc`, which takes a query: `/calc?expression=` and then a string representing the expression to evaluate.

This string must be encoded for urls--see https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding

Responses are in JSON format as follows: `{"answer": result}`

So `http://localhost:3000/calc?expression=2*2` will return: `{"answer":"4"}`

And `http://localhost:3000/calc?expression=7%2B9` (addition) will return: `{"answer":"16"}`


