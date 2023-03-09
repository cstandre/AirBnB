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


    const firstName = Object.values(reviews).map(review => review.User.firstName)

    const date = Object.values(reviews).map((review) => new Date(review.createdAt));
    const dateArr = date.toString().split(' ');
    const month = dateArr[1];
    const year = dateArr[3];

    return (
        <>
            <div>
                {Object.values(reviews).map(({id, review}) => (
                    <li key={id}>
                        {firstName}
                        <br/>
                        {month} {year}
                        <br/>
                        {review}
                    </li>
                ))}
            </div>
        </>
    )
}

export default ReviewList;
