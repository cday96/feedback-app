import React from "react"
import { Link } from "react-router-dom"

function Header({ title, bgColor, textColor, textDecoration }) {
	const headerStyles = {
		backgroundColor: bgColor,
		color: textColor,
		textDecoration: textDecoration,
	}

	return (
		<header style={headerStyles}>
			<div className="container">
				<Link to="/" style={headerStyles}>
					<h2>{title}</h2>
				</Link>
			</div>
		</header>
	)
}

Header.defaultProps = {
	title: "Feedback UI",
	bgColor: "rgba(0,0,0,0.4)",
	textColor: "#FF6A95",
	textDecoration: "none",
}

export default Header
