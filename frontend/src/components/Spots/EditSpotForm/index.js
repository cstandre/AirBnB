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
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
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

        await dispatch(editSpotForm(editSpot, spot.id))
        .catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "Spot description must be at least 30 charactors";
                setErrors([errorMsg])
            }
        })
        if (spot) {
            await dispatch(spotDetails(spot.id))
            history.push(`/spots/${spot.id}`)
        }
    }

    return (
        <>
        <div className="page-wrapper">
            <h1 className="editSpot-header">Update your Spot</h1>
            <h2 className="editSpot-subHeader">Where is your place located?</h2>
            <p className="description">Guest will only get your address once they book a reservation.</p>
        </div>
        <form className="spotForm" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
                Country
                <input
                type='text'
                onChange={e => setCountry(e.target.value)}
                value={country}
                required
                placeholder='Country'
                />
                Street Address
                <input
                type='text'
                onChange={e => setAddress(e.target.value)}
                value={address}
                required
                placeholder="Address"
                />
                City
                <input
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city}
                required
                placeholder="City"
                />
                State
                <input
                type='text'
                onChange={e => setState(e.target.value)}
                value={state}
                required
                placeholder="State"
                />
                Latitude
                <input
                type='text'
                onChange={e => setLat(e.target.value)}
                value={lat}
                required
                placeholder="Latitude"
                />
                Longitude
                <input
                type='text'
                onChange={e => setLng(e.target.value)}
                value={lng}
                required
                placeholder="Longitude"
                />
                <h2 className="newSpot-subHeader">Describe your place to guest</h2>
                <p className="description">Mention the best features of your space, any special amentities like fast Wi-Fi or parking, and what you love about the neighborhood.</p>
                <input
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                placeholder='Please write at least 30 characters'
                />
                <h2>Create a title for your spot.</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                type='text'
                onChange={e => setName(e.target.value)}
                value={name}
                placeholder='Name of your spot'
                />
                <h2>Set a base price for your spot.</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                $
                <input
                type='number'
                onChange={e => setPrice(e.target.value)}
                value={price}
                placeholder='Price per night (USD)'
                />
            <button>Update your Spot</button>
        </form>
        </>
    )
}
