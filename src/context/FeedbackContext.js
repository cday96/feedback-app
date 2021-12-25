import { createContext, useState, useEffect } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [feedback, setFeedback] = useState([])
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	useEffect(() => {
		fetchFeedback()
	}, [])

	//fetch feedback from server
	const fetchFeedback = async () => {
		const res = await fetch(
			"http://localhost:5000/feedback?_sort=id&_order=desc"
		)
		const data = await res.json()
		setFeedback(data)
		setIsLoading(false)
	}

	//add feedback item
	const addFeedback = async (newFeedback) => {
		const res = await fetch("http://localhost:5000/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newFeedback),
		})
		const data = await res.json()

		setFeedback([data, ...feedback])
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
	const updateFeedback = async (id, updatedItem) => {
		const res = await fetch(`http://localhost:5000/feedback/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedItem),
		})

		const data = await res.json()

		//console.log(id, updatedItem)
		setFeedback(
			feedback.map((item) =>
				item.id === id ? { ...item, ...data } : item
			)
		)
	}

	//delete feedback item
	const deleteFeedback = async (id) => {
		if (window.confirm("Confirm Delete?")) {
			await fetch(`http://localhost:5000/feedback/${id}`, {
				method: "DELETE",
			})

			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback: feedback,
				feedbackEdit: feedbackEdit,
				isLoading: isLoading,
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
