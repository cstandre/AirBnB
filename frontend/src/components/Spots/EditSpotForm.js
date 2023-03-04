import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpotForm } from "../../store/spots";
import { spotDetails } from "../../store/spots";


export default function EditSpotFrom() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state=>state.session.user);
    const history = useHistory();
    const spot = useSelector(state=>state.spot[spotId])
    console.log(spot)
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    // const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const prevImage = {
            preview: true,
            url: previewImage
        }

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
            prevImage
        };

        await dispatch(editSpotForm(editSpot))
        // if (spot) {
        //     await dispatch(spotDetails(spot.id))
        //     history.push(`/spots/${spot.id}`)
        // }
    }

    return (
        <>
        <h1>Need to make a change?</h1>
        <h2>Where is your place located?</h2>
        <p>Guest will only get your address once they book a reservation.</p>
        <form onSubmit={handleSubmit}>
            <label>
                Country
                <input
                type='text'
                onChange={e => setCountry(e.target.value)}
                value={country}
                required
                placeholder='Country'
                />
            </label>
            <label>
                Street Address
                <input
                type='text'
                onChange={e => setAddress(e.target.value)}
                value={address}
                required
                placeholder="Address"
                />
            </label>
            <label>
                City
                <input
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city}
                required
                placeholder="City"
                />
            </label>
            <label>
                State
                <input
                type='text'
                onChange={e => setState(e.target.value)}
                value={state}
                required
                placeholder="State"
                />
            </label>
            <label>
                Latitude
                <input
                type='text'
                onChange={e => setLat(e.target.value)}
                value={lat}
                required
                placeholder="Latitude"
                />
            </label>
            <label>
                Longitude
                <input
                type='text'
                onChange={e => setLng(e.target.value)}
                value={lng}
                required
                placeholder="Longitude"
                />
            </label>
            <h2>Describe your place to guest</h2>
            <p>Mention the best features of your space, any special amentities like fast Wi-Fi or parking, and what you love about the neighborhood.</p>
            <label>
                <input
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                placeholder='Please write at least 30 characters'
                />
            </label>
            <label>
                <h2>Create a title for your spot.</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                type='text'
                onChange={e => setName(e.target.value)}
                value={name}
                placeholder='Name of your spot'
                />
            </label>
            <label>
                <h2>Set a base price for your spot.</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                $
                <input
                type='number'
                onChange={e => setPrice(e.target.value)}
                value={price}
                placeholder='Price per night (USD)'
                />
            </label>
            <label>
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                type='url'
                placeholder="Preview Image Url"
                onChange={e => setPreviewImage(e.target.value)}
                value={previewImage}
                />
                <input type='url' placeholder="Image Url"/>
                <input type='url' placeholder="Image Url"/>
                <input type='url' placeholder="Image Url"/>
                <input type='url' placeholder="Image Url"/>
            </label>
            <br/>
            <button>Edit Spot</button>
        </form>
        </>
    )
}
