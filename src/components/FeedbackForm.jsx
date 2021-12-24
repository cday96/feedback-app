import React from "react"
import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
	const [text, setText] = useState("")
	const [rating, setRating] = useState(5)
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [message, setMessage] = useState("")

	const { feedbackEdit, addFeedback, updateFeedback } =
		useContext(FeedbackContext)

	//trigger a fuction to run when feedbackItem state changes - when edit btn clicked
	useEffect(() => {
		if (feedbackEdit.edit === true) {
			//console.log("Hello")
			setBtnDisabled(false)
			setText(feedbackEdit.item.text)
			setRating(feedbackEdit.item.rating)
		}
	}, [feedbackEdit])

	const handleTextChange = (e) => {
		if (text === "") {
			setMessage(null)
			setBtnDisabled(true)
		} else if (text !== "" && text.trim().length <= 10) {
			setMessage("Text must be atleast 10 characters")
			setBtnDisabled(true)
		} else {
			setMessage(null)
			setBtnDisabled(false)
		}

		setText(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (text.trim().length > 10) {
			const newFeedback = {
				text: text,
				rating: rating,
			}

			if (feedbackEdit.edit === true) {
				//send updatedFeedback to the feedBack edit item.id as newFeedback
				//console.log(feedbackEdit.item.id)
				updateFeedback(feedbackEdit.item.id, newFeedback)
			} else {
				addFeedback(newFeedback)
			}

			setText("")
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate this chat?</h2>
				<RatingSelect select={(rating) => setRating(rating)} />
				<div className="input-group">
					<input
						onChange={handleTextChange}
						type="text"
						placeholder="Please leave us some feedback..."
						value={text}
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	)
}

export default FeedbackForm
