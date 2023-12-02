const generate = document.querySelector(".generate");
const text = document.querySelector(".rgb-value");
const scoreText = document.querySelector(".score-text");
const bestText = document.querySelector(".score-best");
const body = document.querySelector("body");
const difficulty = document.querySelector(".difficulty");
const bgcolor1 = document.querySelector(".bgcolor");
const colorList = [];
const modeElement = document.querySelector(".mode");
let score = 0;
let best = 0;
let goal;
let hex_goal;
let difficultyValue = difficulty.value;
let mode = "rgb";

modeElement.addEventListener("change", () => {
	mode = modeElement.value;
});

const check_box = (e) => {
	const elementColor = e.target.style.backgroundColor.replace(/[^\d,]/g, "").split(","); //zamienia wartość rgb(123,123,123) na [ "123", "123", "123"]

	if (elementColor[0] == goal[0] && elementColor[1] == goal[1] && elementColor[2] == goal[2]) {
		score++;
		if (bgcolor1.value == "changebg") {
			body.style.backgroundColor = e.target.style.backgroundColor;
		}

		generate_new_game();
	} else {
		e.target.style.opacity = "0";
		e.target.style.pointerEvents = "none";
		score = 0;
	}
	scoreText.innerHTML = `${score}`;
	if (best < score) {
		best = score;
		bestText.innerHTML = `${best}`;
	}
};

const generate_new_game = () => {
	colorList.splice(0, colorList.length);
	const box = document.querySelectorAll(".box");
	const randVal = Math.floor(Math.random() * 3);
	const randVal255 = Math.floor(Math.random() * 255);
	box.forEach((el) => {
		el.style.opacity = "1";
		el.style.pointerEvents = "auto";
		let rgb = [0, 0, 0];
		let color;
		switch (difficultyValue) {
			case "easy":
				for (let i = 0; i < rgb.length; i++) {
					color = Math.floor(Math.random() * 255);
					rgb[i] = color;
				}
				break;
			case "medium":
				rgb[randVal] = 255;
				for (let i = 0; i < rgb.length; i++) {
					color = Math.floor(Math.random() * 255);
					if (rgb[i] == 0) {
						rgb[i] = color;
					}
				}
				break;
			case "hard":
				rgb[randVal] = Math.floor(Math.random() * 255);
				for (let i = 0; i < rgb.length; i++) {
					if (rgb[i] == 0) {
						rgb[i] = 255;
					}
				}
				break;
			case "very-hard":
				rgb[randVal] = Math.floor(Math.random() * (255 + 1 - 75) + 75);
				for (let i = 0; i < rgb.length; i++) {
					if (rgb[i] == 0) {
						rgb[i] = randVal255;
					}
				}
				break;
		}

		const rgb_value = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

		el.style.backgroundColor = rgb_value;

		colorList.push(rgb);

		el.addEventListener("click", check_box);
	});

	goal = colorList[Math.floor(Math.random() * colorList.length)];
	hex_goal = `#${goal[0].toString(16)}${goal[1].toString(16)}${goal[2].toString(16)}`;

	if (mode == "rgb") {
		text.innerHTML = `RGB: ${goal}`;
	} else {
		text.innerHTML = `HEX: ${hex_goal}`;
	}
};

// generate.addEventListener("click", () => {
// 	if (score > 0) {
// 		score--;
// 		scoreText.innerHTML = score;
// 	}
// });

generate.addEventListener("click", generate_new_game);

difficulty.addEventListener("change", (e) => {
	difficultyValue = e.target.value;
});
