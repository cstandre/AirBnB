import React, { useState } from "react";


export default function CreateSpotFrom() {
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

    return (
        <>
        <h1>Add a spot!</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Address:
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
                Name:
                <input
                type='text'
                onChange={e => setName(e.target.value)}
                value={name}
                />
            </label>
            <label>
                Description:
                <input
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                />
            </label>
            <label>
                Price
                <input
                type='number'
                onChange={e => setPrice(e.target.value)}
                value={price}
                />
            </label>
        </form>
        </>
    )
}
