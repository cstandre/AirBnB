import { useDispatch } from "react-redux";
// import { useHistory, Link } from "react-router-dom";
import { deleteSpot } from "../../../store/spots";
import { useModal } from '../../../context/Modal';

import './DeleteSpotModal.css';

export default function DeleteSpotButton({id}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = () => {
        return dispatch(deleteSpot(id)).then(closeModal)
    }

    return (
        <div className="delete-container">
            <h1 className="confirmation">Confirm Delete</h1>
            <p className="message">Are you sure you want to remove this from your listings?</p>
            <button className="yes" onClick={handleClick}>Yes (Delete Spot)</button>
            <button className="no" onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
}
