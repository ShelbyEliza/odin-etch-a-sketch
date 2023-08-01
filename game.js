const boardEl = document.querySelector(".board");
const sizeInput = document.querySelector(".sizeInput");
const formEl = document.querySelector("#gameForm");
const currentSizeEl = document.querySelector(".currentSize");
const currentStyleEl = document.querySelector(".currentStyle");
const resetBtn = document.querySelector(".reset");

let boardProps = {
	side: 16,
	style: "default",
	lightness: 100,
	toggle: "down",
};

formEl.addEventListener("submit", handleSubmit);
resetBtn.addEventListener("click", handleReset);

function handleReset() {
	boardProps = {
		side: 16,
		style: "default",
		lightness: 100,
		toggle: "down",
	};

	boardEl.textContent = "";
	currentSizeEl.textContent = boardProps.side;
	currentStyleEl.textContent = boardProps.style;
	sizeInput.autofocus;
}

function handleSubmit(e) {
	e.preventDefault();

	// do not change HTML structure !
	// this is the only way I could access input value
	boardProps.side = parseInt(e.explicitOriginalTarget[0].value);
	boardProps.style = e.explicitOriginalTarget[1].value;

	buildBoard(boardProps.side, boardProps.style);
}

function buildBoard(size, style) {
	let rowEl;
	boardEl.textContent = "";

	for (let i = 0; i < size; i++) {
		rowEl = document.createElement("div");
		rowEl.classList.add("row");

		for (let j = 0; j < size; j++) {
			let squareEl = document.createElement("div");
			squareEl.classList.add("square");
			squareEl.style.cssText = `width: ${1000 / size}px; height: ${
				1000 / size
			}px;`;
			rowEl.appendChild(squareEl);

			setStyle(squareEl, style);
		}
		boardEl.appendChild(rowEl);
		currentSizeEl.textContent = size;
		currentStyleEl.textContent = style;
	}
}

function setStyle(squareEl, style) {
	switch (style) {
		case "random":
			squareEl.addEventListener("mouseover", () => {
				let randomColor = getRandomColor();
				squareEl.style.backgroundColor = "#" + randomColor;
			});
			break;
		case "darkening":
			squareEl.addEventListener("mouseover", (e) => {
				setLightness(e.target);
			});
			break;
		default:
			squareEl.addEventListener("mouseover", (e) => {
				e.target.classList.add("active");
			});
	}
}

function getRandomColor() {
	return Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, 0);
}

function setLightness(currentSquare) {
	let boardLightness = boardProps.lightness;
	let currentColor;

	// first hover incident:
	if (boardLightness === 100 || boardLightness === 0) {
		if (boardLightness === 100) {
			boardProps.toggle = "down";
			currentColor = 90;
		}
		if (boardLightness === 0) {
			boardProps.toggle = "up";
			currentColor = 10;
		}
	} else {
		if (boardProps.toggle === "down") {
			currentColor = boardLightness - 10;
		} else {
			currentColor = boardLightness + 10;
		}
	}

	currentSquare.style.backgroundColor = `hsl(280deg 50% ${currentColor}%)`;
	boardProps.lightness = currentColor;
}
