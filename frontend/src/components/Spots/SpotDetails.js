import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { spotDetails } from "../../store/spots";
import { useEffect } from "react";
import ReviewList from "../Reviews/ReviewList";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../Reviews/CreateReviewModal";
import { useModal } from "../../context/Modal";



export default function SpotDetails () {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector(state=>state.spots?.currentSpot);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(spotDetails(spotId));
    }, [dispatch, spotId])

    // if (spot.avgRating === null) spot.avgRating = 0

    return (
        <>
        {spot && (
                <>
                    <div>
                        <h1>{spot.name}</h1>
                        <p>
                        {spot.city}, {spot.state}, {spot.country}
                        {spot.SpotImages && spot.SpotImages.map((image) => <img key={image.id} src={image.url} alt='' />)}
                        Hosted By: {spot.Owner?.firstName} {spot.Owner?.lastName}
                        {spot.description}
                        {spot.price}
                        </p>
                    </div>
                    <div>
                    {spot?.Owner?.id === sessionUser?.id && spot?.numReviews <= 0 && (
                            <div>
                                <i className="fa-solid fa-star"></i> NEW
                            </div>
                        )}
                    </div>
                    <div>
                    {spot?.Owner?.id !== sessionUser?.id && spot?.numReviews <= 0 && (
                            <div>
                                <i className="fa-solid fa-star"></i> NEW
                                <p>Be the first to review!!</p>
                                <OpenModalButton
                                buttonText="Post Your Review"
                                onButtonClick={closeModal}
                                modalComponent={<CreateReviewModal userId={sessionUser?.id} spotId={spotId}/>}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                    {spot?.Owner?.id !== sessionUser?.id && spot?.numReviews === 1 && (
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} {spot.numReviews} reviews
                                <OpenModalButton
                                buttonText="Post Your Review"
                                onButtonClick={closeModal}
                                modalComponent={<CreateReviewModal userId={sessionUser?.id} spotId={spotId}/>}
                                />
                                <ReviewList />
                            </div>
                        )}
                    </div>
                    <div>
                        {spot?.numReviews > 1 &&
                        (
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {spot?.avgRating} {spot?.numReviews} reviews
                                <OpenModalButton
                                buttonText="Post Your Review"
                                onButtonClick={closeModal}
                                modalComponent={<CreateReviewModal userId={sessionUser?.id} spotId={spotId}/>}
                                />
                                <ReviewList />
                            </div>
                        )}
                    </div>
                    <div>
                        {spot.numReviews === 1 && (
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {spot?.avgRating} {spot?.numReviews} review
                                <ReviewList />
                            </div>
                        )}
                    </div>
                </>
            )
        }
        </>
    )
}
