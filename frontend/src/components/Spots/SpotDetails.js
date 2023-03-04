import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { spotDetails } from "../../store/spots";
import { useEffect } from "react";


export default function SpotDetails () {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state=>state.spots?.currentSpot);

    useEffect(() => {
        dispatch(spotDetails(spotId));
    }, [dispatch, spotId])

    return (
        <>
        {spot && (
                <div>
                    <h1>{spot.name}</h1>
                    <p>
                    {spot.city}, {spot.state}, {spot.country}
                    {spot.SpotImages && spot.SpotImages.map((image) => <img key={image.id} src={image.url} alt='' />)}
                    Hosted By: {spot.Owner.firstName} {spot.Owner.lastName}
                    {spot.description}
                    </p>
                </div>
            )
        }
        </>
    )
}
