import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
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
    };

    const spotClick = (e, id) => {
        e.preventDefault();
        history.push(`/spots/${id}`);
    };

    return (
        <div className="user-spot-container">
            <h1 className="userSpot-header">Manage your Spots</h1>
            <button className='user-newSpot-button' onClick={() => history.push(`/spots/new`)}>Create a New Spot</button>
            {hasSpots ? (
                <div className="user-spot-container-deets">
                    {Object.values(spots).map(({id, city, state, previewImage, avgRating, price}) => (
                        <div key={id} className="spot-container">
                            <div onClick={(e) => spotClick(e, id)} className='spot-deets'>
                                <img className="preview" src={previewImage} alt="" />
                                <div className="detail-container">
                                <div className="location-rating">
                                    <span className="city-state">
                                    {city}, {state}
                                    </span>
                                    <span className="rating-container">
                                    <i className="fa-solid fa-star"></i>{avgRating || 'New'}
                                    </span>
                                </div>
                                <div className="user-spot-price">
                                ${price} night
                                </div>
                                </div>
                            </div>
                            <div className="user-spot-buttons">
                            <button className="update-button" onClick={() => history.push(`/spots/${id}/edit`)}>Update</button>
                            <div className="delete-button-currentSpot">
                            <OpenModalButton
                                buttonText="Delete"
                                onButtonClick={closeModal}
                                modalComponent={<DeleteSpotButton id={id} />}
                            />
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
            ): (
                <div>
                    <h2>You don't have any spots to manage</h2>
                </div>

            )}
        </div>
    )
};

export default UserSpots;

// () => dispatch(deleteSpot(id))
