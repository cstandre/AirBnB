import { useDispatch } from "react-redux";
// import { useHistory, Link } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { deleteReviewFetch } from "../../../store/reviews";


export default function DeleteReviewButton({id}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = () => {
        return dispatch(deleteReviewFetch(id)).then(closeModal)
    }

    return (
        <div>
            <p>Are you sure you want to delete your review?</p>
            <button onClick={handleClick}>Yes (Delete review)</button>
            <button onClick={closeModal}>No (Keep review)</button>
        </div>
    )
}
