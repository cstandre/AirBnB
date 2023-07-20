import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchSpots } from "../../../store/spots";

import './SpotsList.css'

const SpotList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state=>state?.spots);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    const spotPage = (id) => {
        history.push(`/spots/${id}`)
    }

    return (
        <div className="spots-wrapper">
            <div className="spots-list">
            {Object?.values(spots)?.map((spot) => (
                <div key={spot?.id} className="spot-container">
                    <img className="preview-img" src={spot?.previewImage} alt="" onClick={() => spotPage(spot?.id)} />
                    <div className="spot-detail-container">
                    <div className="spot-location" onClick={() => spotPage(spot?.id)}>{spot?.city}, {spot?.state}</div>
                    <div className="spot-rating-container">
                        <i className="fa-solid fa-star"></i>
                        <span className="spot-rating">{spot?.avgRating || 'New'}</span>
                    </div>
                    <div className="spot-price-container">
                        <span className="spot-price">
                            ${spot?.price}
                        </span>
                        <span>
                            night
                        </span>
                    </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
};

export default SpotList;
