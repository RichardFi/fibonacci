const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.setPrompt('Please input the amount of time in seconds between emitting numbers and their frequency> ');
readline.prompt();

let time;
let timer;
let halted;
const numbers = [];

// check if n is perfect square
const isPerfectSquare = (n) => {
	return Number.isInteger(Math.sqrt(n));
};

// check if n is a fibonacci number
const isFibonacciNumber = (n) => {
	return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
};

// count times of element and return a string sorted by frequency
const count = (array) => {
	const count = {};

	for (const element of array) {
		if (count[element]) {
			count[element] += 1;
		} else {
			count[element] = 1;
		}
	}

	const sorted = [];
	for (let number in count) {
		sorted.push([ number, count[number] ]);
	}

	sorted.sort(function(a, b) {
		return b[1] - a[1];
	});

	let res = '';
	sorted.forEach((element) => {
		res += `${element[0]}:${element[1]}, `;
	});

	return res;
};

readline
	.on('line', function(line) {
		// check if the input is a command
		switch (line) {
			// quit the program
			case 'quit':
				console.log(numbers);
				readline.close();
				break;
			// halt the timer if it is running
			case 'halt':
				if (timer) {
					console.log('timer halted');
					halted = true;
					clearInterval(timer);
					return;
				}
				break;
			// start the timer if it is not running
			case 'resume':
				if (timer && halted) {
					halted = false;
					timer = setInterval(() => {
						console.log(count(numbers));
					}, time * 1000);
					return;
				}
				break;
			default:
				break;
		}

		// check if the input is a positive integer, if not, prompt the user to input again
		if (!/^[0-9]+$/.test(line)) {
			readline.setPrompt('Please input a positive integer> ');
			readline.prompt();
			return;
		} else if (!time) {
			// if the time is not set, set the timer
			time = Number(line);
			// print frequency of numbers
			timer = setInterval(() => {
				console.log(count(numbers));
			}, time * 1000);
			readline.setPrompt('Please enter the first number> ');
			readline.prompt();
		} else {
			// if the input number is a positive number and the time is set, collect the number
			numbers.push(Number(line));

			// if the number is a Fibonacci number, print 'FIB'
			if (isFibonacciNumber(Number(line))) {
				console.log('FIB');
			}

			readline.setPrompt('Please enter the next number> ');
			readline.prompt();
		}
	})
	.on('close', () => {
		console.log('Thanks for playing, have a great day!');
		process.exit(0);
	});
