import React from "react"
import spinner from "../assets/spinner.gif"

function Spinner() {
	return (
		<img
			src={spinner}
			alt="Loading..."
			style={{
				width: "110px",
				margin: "auto",
				display: "block",
			}}
		/>
	)
}

export default Spinner
