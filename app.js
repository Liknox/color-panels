const cols = document.querySelectorAll(".col")
const reg = document.querySelector(".regenerator")
const spaceButton = document.querySelector(".tip")

function generateRandomColor() {
	const hexCodes = "0123456789ABCDEF"

	let color = ""
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}
	return "#" + color
}

function setRandomColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : []

	cols.forEach((e, index) => {
		const isLocked = e.querySelector("i").classList.contains("fa-lock")
		const text = e.querySelector("h2")
		const button = e.querySelector("button")
		const tip = document.querySelector(".tip")

		if (isLocked) {
			colors.push(text.textContent)
			return
		}

		const color = isInitial ? (colors[index] ? colors[index] : chroma.random()) : chroma.random()

		if (!isInitial) {
			colors.push(color)
		}

		text.textContent = color
		e.style.background = color

		setTextColor(text, color)
		setTextColor(button, color)
		if (index === 2) {
			setTextColor(tip, color)
		}
		if (index === 4) {
			setTextColor(reg, color, true)
		}
	})

	updateColorHash(colors)
}

function copyToClipboard(text) {
	return navigator.clipboard.writeText(text)
}

function setTextColor(text, color, bcg = false) {
	const whiteColor = "#EBEBEB"
	const blackColor = "#141414"
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.5 ? blackColor : whiteColor
	if (bcg) {
		text.style.color = luminance > 0.5 ? whiteColor : blackColor
		text.style.backgroundColor = luminance > 0.5 ? blackColor : whiteColor
	}
}

function updateColorHash(colors = []) {
	document.location.hash = colors
		.map(e => {
			return e.toString().substring(1)
		})
		.join("-")
}

function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split("-")
			.map(e => "#" + e)
	}
	return []
}

setRandomColors(true)

reg.addEventListener("click", () => {
	setRandomColors()
	spaceButton.style.display = "none"
})

document.addEventListener("keydown", e => {
	if (e.code.toLowerCase() === "space") {
		e.preventDefault()
		spaceButton.style.display = "none"
		setRandomColors()
	}
})
document.addEventListener("click", e => {
	if (e.target.closest("button")) {
		// e.target.closest("button").classList.add("fa-lock")
		e.target.closest("button").children[0].classList.toggle("fa-lock")
		e.target.closest("button").children[0].classList.toggle("fa-lock-open")
	} else if (e.target.dataset.type === "copy") {
		const copyBlock = document.querySelector(".copied")
		copyBlock.style.transform = "translate(-50%, 120%)"
		setTimeout(() => {
			copyBlock.style.transform = "translate(-50%, 0%)"
		}, 1500)
		copyToClipboard(e.target.textContent)
	}
})
