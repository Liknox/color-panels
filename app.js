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
      const text = e.querySelector("h2")
      const color = generateRandomColor()
      
      text.textContent = color
		e.style.background = color
	})
}
setRandomColors()
