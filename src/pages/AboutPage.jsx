import React from "react"
import { Link } from "react-router-dom"
import Card from "../components/shared/Card"

function AboutPage() {
	return (
		<Card>
			<div className="about">
				<h1>About the Project</h1>
				<p>This is a React app for leaving feedback</p>
				<p>Version: 1.0.0</p>
				<p>
					<Link to="/">Return Home</Link>
				</p>
			</div>
		</Card>
	)
}

export default AboutPage
