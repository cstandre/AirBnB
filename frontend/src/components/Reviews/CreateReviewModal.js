import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createReviewFetch, getSpotReviews } from "../../store/reviews";
// import { spotDetails } from "../../store/spots";



export default function CreateReviewModal({userId, spotId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const spot = Number(spotId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newReview = {
            userId,
            spot,
            review,
            stars
        }

        await dispatch(createReviewFetch(newReview))
        .then(dispatch(getSpotReviews(spot)))
        .then(history.push('/spots/${spot}'))
        .then(closeModal)
        .catch(async (res) => {
            if(res.status === 403) {
                const errorMsg = "User already has a review for this spot"
                setErrors([errorMsg])
            }
            // const data = await res.json();
            // if (data && data.errors) setErrors(data.errors)
        })
    }

    return (
        <>
            <h1>How way your stay?</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <input
                    type='text'
                    onChange={e => setReview(e.target.value)}
                    value={review}
                    required
                    placeholder="Just a quick review"
                />
                <i id={1} className="fa-solid fa-star" onClick={e => setStars(1)}></i>
                <i id={2} className="fa-solid fa-star" onClick={e => setStars(2)}></i>
                <i id={3} className="fa-solid fa-star" onClick={e => setStars(3)}></i>
                <i id={4} className="fa-solid fa-star" onClick={e => setStars(4)}></i>
                <i id={5} className="fa-solid fa-star" onClick={e => setStars(5)}></i>
                <p>Stars</p>
                <button type="submit">Submit Your Review</button>
            </form>
        </>
    )
}
