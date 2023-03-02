import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";


export default function CreateSpotFrom() {
    const dispatch = useDispatch();
    const [owner, setOwner] = useState('')
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([])

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

        dispatch(createSpot(newSpot))

    }

    return (
        <>
        <h1>Create a New Spot!</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Where is your place located?
                <input
                type='text'
                onChange={e => setAddress(e.target.value)}
                value={address}
                required
                />
            </label>
            <label>
                City:
                <input
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city}
                />
            </label>
            <label>
                State:
                <input
                type='text'
                onChange={e => setState(e.target.value)}
                value={state}
                />
            </label>
            <label>
                Country:
                <input
                type='text'
                onChange={e => setCountry(e.target.value)}
                value={country}
                />
            </label>
            <label>
                Latitude:
                <input
                type='number'
                onChange={e => setLat(e.target.value)}
                value={lat}
                />
            </label>
            <label>
            Longitude:
                <input
                type='number'
                onChange={e => setLng(e.target.value)}
                value={lng}
                />
            </label>
            <label>
                Create a title for your spot.
                <input
                type='text'
                onChange={e => setName(e.target.value)}
                value={name}
                />
            </label>
            <label>
                Describe your place to guests.
                <input
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                />
            </label>
            <label>
                Set a base price for your spot.
                <input
                type='number'
                onChange={e => setPrice(e.target.value)}
                value={price}
                />
            </label>
            <label>
                Liven up your spot with photos.
            </label>
            <button>Create Spot</button>
        </form>
        </>
    )
}
