import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { spotDetails } from "../../../store/spots";
import { useEffect } from "react";
import ReviewList from "../../Reviews/ReviewList";
import OpenModalButton from "../../OpenModalButton";
import CreateReviewModal from "../../Reviews/CreateReviewModal/CreateReviewModal";
import { useModal } from "../../../context/Modal";

import './SpotDetails.css';



export default function SpotDetails () {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector(state=>state?.spots?.currentSpot);
    const sessionUser = useSelector(state => state?.session?.user);

    useEffect(() => {
        dispatch(spotDetails(spotId));
    }, [dispatch, spotId])

    // if (spot.avgRating === null) spot.avgRating = 0

    return (
        <>
        {spot && (
                <>
                    <div>
                        <h1 className="spot-name">{spot.name}</h1>
                        <p>{spot.city}, {spot.state}, {spot.country}</p>
                        <div className="img-container">
                            {spot.SpotImages && spot.SpotImages.map((image) => <img key={image.id} className='img' src={image.url} alt='' />)}
                        </div>
                        {spot.Owner && <p>
                            Hosted By {spot.Owner?.firstName} {spot.Owner?.lastName}
                        </p>}
                        <p>
                            {spot.description}
                        </p>
                        <div>
                        {spot.price}
                        </div>
                    </div>
                    <div>
                        {(sessionUser !== undefined && spot.Owner?.id !== sessionUser?.id && spot.numReviews > 1) ? (
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} {spot.numReviews} reviews
                                <ReviewList />
                            </div>
                        ): (sessionUser !== undefined && spot.Owner?.id !== sessionUser.id && spot.numReviews === 1) ? (
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} {spot.numReviews} review
                                <ReviewList />
                            </div>
                        ): (sessionUser !== undefined && spot.Owner?.id !== sessionUser?.id && spot.numReviews <= 0) ? (
                            <div>
                                <i className="fa-solid fa-star"></i> NEW
                                <h1>Be the first to post a review!</h1>
                                <OpenModalButton
                                    buttonText="Post Your Review"
                                    onButtonClick={closeModal}
                                    modalComponent={<CreateReviewModal userId={sessionUser?.id} spotId={spotId}/>}
                                />
                            </div>
                        ) : (sessionUser !== undefined && spot.Owner?.id === sessionUser?.id && spot.numReviews > 1) ? (
                            <div>
                            <i className="fa-solid fa-star"></i>
                            {spot.avgRating} {spot.numReviews} reviews
                            <ReviewList spotOwnerId={spot.Owner.id}/>
                        </div>
                        ) : (sessionUser !== undefined && spot.Owner?.id === sessionUser?.id && spot.numReviews === 1) ? (
                            <div>
                            <i className="fa-solid fa-star"></i>
                            {spot.avgRating} {spot.numReviews} review
                            <ReviewList spotOwnerId={spot.Owner.id}/>
                        </div>
                        ) : (sessionUser !== undefined && spot.Owner?.id === sessionUser?.id && spot.numReviews < 0) ? (
                            <div>
                            <i className="fa-solid fa-star"></i> NEW
                        </div>
                        ) : (sessionUser === undefined && spot.numReviews > 1) ? (
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} {spot.numReviews} reviews
                                <ReviewList />
                            </div>
                        ) : (sessionUser === undefined && spot.numReviews === 1) ? (
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} {spot.numReviews} review
                                <ReviewList />
                            </div>
                        ) : (
                            <div>
                                <i className="fa-solid fa-star"></i> NEW
                            </div>
                        )}
                    </div>
                </>
            )
        }
        </>
    )
}


// spot.Owner.id !== sessionUser?.id && spot.numReviews === 1
