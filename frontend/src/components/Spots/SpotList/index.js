import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { fetchSpots } from "../../../store/spots";

import './SpotsList.css'

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state=>state.spots);


    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <>
            <ul className="spotsList">
                {Object.values(spots).map(({id, city, state, previewImage, avgRating, price}) => (
                    <li key={id} className="spot">
                        <NavLink key={id} to={`/spots/${id}`} className='spot'>
                            <img className="preview" src={previewImage} alt="" />
                            <p className="detail-container">
                            <div>{city}, {state}</div>
                            <div className="rating-container">
                                <i className="fa-solid fa-star"></i>{avgRating || 'New'}
                            </div>
                            <div>
                                ${price} night
                            </div>
                            </p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default SpotList;
