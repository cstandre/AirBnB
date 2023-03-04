import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getCurrentSpots } from "../../store/spots";

import './SpotsList.css';

const UserSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state=>state.spots);

    useEffect(() => {
        dispatch(getCurrentSpots());
    }, [dispatch]);

    return (
        <>
            <ul>
                {Object.values(spots).map(({id, city, state, previewImage, avgRating, price}) => (
                    <li key={id}>
                        <NavLink to={`spots/${id}`} className='spot'>
                            <img className="preview" src={previewImage} alt="" />
                            <p>
                            {city}, {state} <br/>
                            {avgRating || 'New'} <br/>
                            ${price} /Night
                            </p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default UserSpots;
