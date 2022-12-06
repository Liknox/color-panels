const cols = document.querySelectorAll(".col")

function generateRandomColor() {
	const hexCodes = "0123456789ABCDEF"

	let color = ""
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}
	return "#" + color
}

function setRandomColors() {
	cols.forEach(e => {
		const isLocked = e.querySelector("i").classList.contains("fa-lock")
		const text = e.querySelector("h2")
		const button = e.querySelector("button")
		const color = chroma.random()

		if (isLocked) return

		text.textContent = color
		e.style.background = color

		setTextColor(text, color)
		setTextColor(button, color)
	})
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.5 ? "black" : "white"
}

setRandomColors()

document.addEventListener("keydown", e => {
	e.preventDefault()
	if (e.code.toLowerCase() === "space") setRandomColors()
})
document.addEventListener("click", e => {
	if (e.target.closest("button")) {
		// e.target.closest("button").classList.add("fa-lock")
		e.target.closest("button").children[0].classList.toggle("fa-lock")
		e.target.closest("button").children[0].classList.toggle("fa-lock-open")
	}
})
