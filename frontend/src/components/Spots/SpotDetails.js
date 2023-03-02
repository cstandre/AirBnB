import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { spotDetails } from "../../store/spots";
import { useEffect } from "react";


export default function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state=>state.spots[spotId]);

    useEffect(() => {
        dispatch(spotDetails(spot.id));
    }, [dispatch])

    return (
        <>
        <h1>{spot.name}</h1>
        {spot.city}, {spot.state}, {spot.country}
        <img src={spot.previewImage} alt="" />
        Hosted By: {spot.ownerId}
        {spot.description}
        </>
    )
}
