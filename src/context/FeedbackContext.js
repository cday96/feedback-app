import { createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([
		{
			id: "1dys67fgd",
			rating: 3,
			text: "Lorem Ipsum is simply dummy text ",
		},
		{
			id: "eefsde2fi8",
			rating: 5,
			text: "Lorem Ipsum is not simply random text.",
		},
	])

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	//add feedback item
	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4()
		setFeedback([newFeedback, ...feedback])
	}

	// set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item: item,
			edit: true,
		})
		//console.log(feedbackEdit)
	}

	//update feedback item
	const updateFeedback = (id, updatedItem) => {
		//console.log(id, updatedItem)
		setFeedback(
			feedback.map((item) =>
				item.id === id ? { ...item, ...updatedItem } : item
			)
		)
	}

	//delete feedback item
	const deleteFeedback = (id) => {
		if (window.confirm("Confirm Delete?")) {
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback: feedback,
				feedbackEdit: feedbackEdit,
				addFeedback: addFeedback,
				editFeedback: editFeedback,
				updateFeedback: updateFeedback,
				deleteFeedback: deleteFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext
