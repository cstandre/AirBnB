import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getCurrentSpots } from "../../store/spots";
import EditSpotFrom from "./EditSpotForm";


import './SpotsList.css';

const UserSpots = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const spots = useSelector(state=>state.spots);

    useEffect(() => {
        dispatch(getCurrentSpots());
    }, [dispatch]);

    const handleClick = () => {
        <EditSpotFrom />
    }


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
                            <button onClick={handleClick}>Edit Spot</button>
                            <button>Delete Spot</button>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default UserSpots;
