import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createReviewFetch, getSpotReviews } from "../../../store/reviews";
import { spotDetails } from "../../../store/spots";

import './CreateReviewModal.css'

export default function CreateReviewModal({userId, spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled]= useState(true);
    const [errors, setErrors] = useState([]);
    const spot = Number(spotId);

    useEffect(() => {
        if (review.length < 10 || stars === 0) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newReview = {
            userId,
            spot,
            review,
            stars
        }

        const createdReview = await dispatch(createReviewFetch(newReview))
        .catch(async (res) => {
            if(res.status === 403) {
                const errorMsg = "User already has a review for this spot"
                setErrors([errorMsg])
            } else if (res.status === 400) {
                const errorMsg = "Review should be between 10 and 255 characters"
                setErrors([errorMsg])
            }
        })

        if (createdReview) {
            await dispatch(getSpotReviews(spot))
            await dispatch(spotDetails(spot))
            closeModal()
        }
    }

    return (
        <>
            <h1 className="review-header">How was your stay?</h1>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="review-container">
                <input
                    type='text'
                    onChange={e => setReview(e.target.value)}
                    value={review}
                    required
                    className="review-input"
                    placeholder="Leave your review here..."
                />
                <div className="stars">
                <i id={1} className="fa-solid fa-star" onClick={e => setStars(1)}></i>
                <i id={2} className="fa-solid fa-star" onClick={e => setStars(2)}></i>
                <i id={3} className="fa-solid fa-star" onClick={e => setStars(3)}></i>
                <i id={4} className="fa-solid fa-star" onClick={e => setStars(4)}></i>
                <i id={5} className="fa-solid fa-star" onClick={e => setStars(5)}></i>
                Stars
                </div>
                <button className="review-submit" disabled={isButtonDisabled} type="submit">Submit Your Review</button>
                </div>
            </form>
        </>
    )
}
