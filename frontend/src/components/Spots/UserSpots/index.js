import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getCurrentSpots } from "../../../store/spots";
import OpenModalButton from "../../OpenModalButton";
import DeleteSpotButton from "../DeleteSpotsModal/index";
// deleteSpot

import './UserSpots.css';

const UserSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const divRef = useRef();
    const spots = useSelector(state=>state.spots);

    // const openModal = () => {
    //     if (showModal) return;
    //     setShowModal(true);
    // }

    useEffect(() => {
        if (!showModal) return;

        const closeModal = (e) => {
            if (!divRef.current.contains(e.target)) {
                setShowModal(false)
            }
        };

        document.addEventListener('click', closeModal);
        return () => document.removeEventListener("click", closeModal);
    }, [showModal]);

    const closeModal = () => setShowModal(false);

    useEffect(() => {
        dispatch(getCurrentSpots());
    }, [dispatch]);

    let hasSpots = false;
    if (Object.keys(spots).length > 0) {
        hasSpots = true
    }

    return (
        <>
            <h1 className="userSpot-header">Manage your Spots</h1>
            {hasSpots ? (
                <ul className="spotList">
                    {Object.values(spots).map(({id, city, state, previewImage, avgRating, price}) => (
                        <li key={id} className="spot">
                            <NavLink to={`/spots/${id}`} className='spot'>
                                <img className="preview" src={previewImage} alt="" />
                                <p>
                                {city}, {state} <br/>
                                {avgRating || 'New'} <br/>
                                ${price} /Night
                                </p>
                            </NavLink>
                            <button onClick={() => history.push(`/spots/${id}/edit`)}>Edit Spot</button>
                            <OpenModalButton
                                buttonText="Delete"
                                onButtonClick={closeModal}
                                modalComponent={<DeleteSpotButton id={id} />}
                            />
                        </li>
                    ))}
                </ul>
            ): (
                <h1>You don't have any spots to manage, click the link above to get started</h1>

            )}
        </>
    )
};

export default UserSpots;

// () => dispatch(deleteSpot(id))
