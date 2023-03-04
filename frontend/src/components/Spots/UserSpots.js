import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { deleteSpot, getCurrentSpots } from "../../store/spots";

import './SpotsList.css';

const UserSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state=>state.spots);

    useEffect(() => {
        dispatch(getCurrentSpots());
    }, [dispatch]);


    return (
        <>
            <ul>
                {Object.values(spots).map(({id, city, state, previewImage, avgRating, price}) => (
                    <li key={id}>
                        <NavLink to={`/spots/${id}`} className='spot'>
                            <img className="preview" src={previewImage} alt="" />
                            <p>
                            {city}, {state} <br/>
                            {avgRating || 'New'} <br/>
                            ${price} /Night
                            </p>
                        </NavLink>
                        <button onClick={() => history.push(`/spots/${id}/edit`)}>Edit Spot</button>
                        <button onClick={() => dispatch(deleteSpot(id))}>Delete Spot</button>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default UserSpots;
