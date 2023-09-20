import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewFetch } from "../../../store/reviews";

import './DeleteReview.css'


export default function DeleteReviewButton({id, spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = () => {
        dispatch(deleteReviewFetch(id,spotId)).then(closeModal())
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
