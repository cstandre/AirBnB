import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../../store/spots";
// import { spotDetails } from "../../../store/spots";

import './CreateSpot.css'

export default function CreateSpotFrom() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat] = useState(20.20);
    const [lng] = useState(20.20);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const prevImage = {
            preview: true,
            url: previewImage
        }

        const addImage1 = {
            preview: false,
            url: image1
        }

        const addImage2 = {
            preview: false,
            url: image2
        }

        const addImage3 = {
            preview: false,
            url: image3
        }

        const addImage4 = {
            preview: false,
            url: image4
        }

        const handelImages = [prevImage, addImage1, addImage2, addImage3, addImage4]
  
        const newSpot = {
            owner: sessionUser,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            handelImages
        };

        const spot = await dispatch(createSpot(newSpot))
        .catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "Spot description must be at least 30 charactors";
                setErrors([errorMsg])
            }
        })
        if (spot) {
            // await dispatch(spotDetails(spot.id))
            history.push(`/spots/${spot.id}`)
        };

    }


    return (
        <>
            <div className="page-wrapper">
                <h1 className="newSpot-header">Create a New Spot!</h1>
                <div className="category-header">
                <h2 className="newSpot-subHeader">Where is your place located?</h2>
                <p className="description">Guest will only get your address once they book a reservation.</p>
                </div>
            <form className="spotForm" onSubmit={handleSubmit}>
                <ul className="errors">
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
                placeholder="Street Address"
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
                <h2 className="newSpot-subHeader">Describe your place to guest</h2>
                <p className="description" >Mention the best features of your space, any special amentities like fast Wi-Fi or parking, and what you love about the neighborhood.</p>
                <input
                className="input-description"
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                placeholder='Please write at least 30 characters'
                />
                <h2 className="newSpot-subHeader" >Create a title for your spot.</h2>
                <p className="description"
                >Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                type='text'
                onChange={e => setName(e.target.value)}
                value={name}
                placeholder='Name of your spot'
                />
                <h2 className="newSpot-subHeader" >Set a base price for your spot.</h2>
                <p className="description" >Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div>
                $
                <input
                type='number'
                onChange={e => setPrice(e.target.value)}
                value={price}
                min='1'
                placeholder='Price per night (USD)'
                />
                </div>
                <h2 className="newSpot-subHeader" >Liven up your spot with photos</h2>
                <p className="description">Submit a link to at least one photo to publish your spot.</p>
                <input
                type='url'
                placeholder="Preview Image URL"
                onChange={e => setPreviewImage(e.target.value)}
                value={previewImage}
                required
                />
                <input
                type='url'
                placeholder="Image URL"
                onChange={e => setImage1(e.target.value)}
                value={image1}
                />
                <input
                type='url'
                placeholder="Image URL"
                onChange={e => setImage2(e.target.value)}
                value={image2}
                />
                <input
                type='url'
                placeholder="Image URL"
                onChange={e => setImage3(e.target.value)}
                value={image3}
                />
                <div className="end-form">
                <input
                className="last-input"
                type='url'
                placeholder="Image URL"
                onChange={e => setImage4(e.target.value)}
                value={image4}
                />
                </div>
            <button className="createSpot-button">Create Spot</button>
        </form>
        </div>
        </>
    )
}
