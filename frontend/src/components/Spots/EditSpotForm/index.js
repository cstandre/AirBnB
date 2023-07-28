import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpotForm } from "../../../store/spots";
import { spotDetails } from "../../../store/spots";

import './EditSpotForm.css';

export default function EditSpotFrom() {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const spot = useSelector(state=>state.spots[spotId]);
    // console.log(spotId, spot)

    useEffect(() => {
        dispatch(spotDetails(spotId));
    }, [dispatch, spotId])



    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat] = useState(spot.lat);
    const [lng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const editSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        };

        const updatedSpot = await dispatch(editSpotForm(editSpot, spotId))
        .catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "Spot description must be at least 30 charactors";
                setErrors([errorMsg])
            }
        })

        if (updatedSpot) {
            await dispatch(spotDetails(spot.id))
            history.push(`/spots/${spot.id}`)
        }
    }

    return (
        <>
        <div className="page-wrapper">
            <div>
                <h1 className="editSpot-header">Update your Spot</h1>
                <div className="category-header">
                <h2 className="editSpot-subHeader">Where is your place located?</h2>
                <p className="description">Guest will only get your address once they book a reservation.</p>
                </div>
            </div>
            <form className="spotForm" onSubmit={handleSubmit}>
                Country
                <input
                    type='text'
                    onChange={e => setCountry(e.target.value)}
                    value={country}
                    required
                    placeholder='Country'
                    className="input"
                />
                Street Address
                <input
                    type='text'
                    onChange={e => setAddress(e.target.value)}
                    value={address}
                    required
                    placeholder="Address"
                    className="input"
                />
                City
                <input
                    type='text'
                    onChange={e => setCity(e.target.value)}
                    value={city}
                    required
                    placeholder="City"
                    className="input"
                />
                State
                <input
                    type='text'
                    onChange={e => setState(e.target.value)}
                    value={state}
                    required
                    placeholder="State"
                    className="input"
                />
                <div>
                    <h2 className="editSpot-subHeader">Describe your place to guest</h2>
                    <p className="description">Mention the best features of your space, any special amentities like fast Wi-Fi or parking, and what you love about the neighborhood.</p>
                </div>
                <input
                    type='text'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    placeholder='Please write at least 30 characters'
                    className="input"
                />
                <div>
                    <h2 className="editSpot-subHeader">Create a title for your spot.</h2>
                    <p className="description">Catch guests' attention with a spot title that highlights what makes your place special.</p>
                </div>
                <input
                    type='text'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder='Name of your spot'
                    className="input"
                />
                <div>
                    <h2 className="editSpot-subHeader">Set a base price for your spot.</h2>
                    <p className="description">Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <div className="price">
                </div>
                $
                <input
                    type='number'
                    min='1'
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                    placeholder='Price per night (USD)'
                />
                </div>
                <div className="errors">
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
                <button className="update-button">Update your Spot</button>
            </form>
        </div>
        </>
    )
}
