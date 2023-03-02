import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { fetchSpots } from "../../store/spots";

import './SpotsList.css';

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state=>state.spots);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <>
            <ul>
                {Object.values(spots).map(({id, city, state, previewImage, avgRating, price}) => (
                    <li key={id}>
                        <NavLink to={`spots/${id}`} className='spot'>
                            <img className="preview" src={previewImage} alt="" />
                            {city}, {state}
                            {avgRating || 'New'}
                            Price:{price} /Night
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default SpotList;
