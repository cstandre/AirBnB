import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteReviewFetch, getSpotReviews } from "../../../store/reviews";

import './DeleteReview.css'


export default function DeleteReviewButton({id}) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const spotId = useParams()
    const { closeModal } = useModal();

    const handleClick = () => {
        dispatch(deleteReviewFetch(id,spotId)).then(closeModal())
        dispatch(getSpotReviews(spotId))
    }

    return (
        <div className="delete-container">
            <h1 className="confirmation">Confirm Delete</h1>
            <p>Are you sure you want to delete your review?</p>
            <button className="yes" onClick={handleClick}>Yes (Delete review)</button>
            <button className="no" onClick={closeModal}>No (Keep review)</button>
        </div>
    )
}
