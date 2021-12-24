import { createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([
		{
			id: "1dys67fgd",
			rating: 3,
			text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		},
		{
			id: "eefsde2fi8",
			rating: 5,
			text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature",
		},
	])

	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4()
		setFeedback([newFeedback, ...feedback])
	}

	const deleteFeedback = (id) => {
		if (window.confirm("Confirm Delete?")) {
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback: feedback,
				deleteFeedback: deleteFeedback,
				addFeedback: addFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext
