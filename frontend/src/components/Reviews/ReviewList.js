import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/reviews";


const ReviewList = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector(state=>state.reviews);

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId]);


    return (
        <>
            <h1>Reviews</h1>
            <ul>
                {Object.values(reviews).map(({id, review, stars}) => (
                    <li key={id}>
                        {review}<br/> {stars}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ReviewList;
