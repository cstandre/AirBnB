import { useDispatch } from "react-redux";
// import { useHistory, Link } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import { useModal } from '../../context/Modal';


export default function DeleteSpotButton({id}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = () => {
        return dispatch(dispatch(deleteSpot(id))).then(closeModal)
    }

    return (
        <div>
            <p>Are you sure you want to delete your spot?</p>
            <button onClick={handleClick}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
}
