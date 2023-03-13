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
                    <div>
                        <div>
                            <h1 className="spot-name">{spot.name}</h1>
                            <p>{spot.city}, {spot.state}, {spot.country}</p>
                            <div className="img-container">
                                {spot.SpotImages && spot.SpotImages.map((image, i) =>
                                <img key={image.id} className={`img${i}`} src={image.url} alt='' />)}
                            </div>
                        <div className="mid">
                        <div>
                        {spot.Owner && <h2 className="host">
                            Hosted By {spot.Owner?.firstName} {spot.Owner?.lastName}
                        </h2>}
                        </div>
                        <div>
                            <p className="spot-description">
                            {spot.description}
                            </p>
                        </div>
                        <div className="box">
                        {(spot.numReviews > 1) ? (
                            <div>
                            <h2 className="review-header3">
                            <i className="fa-solid fa-star"></i>
                            {spot.avgRating} <div className="space">.</div> {spot.numReviews} reviews
                            </h2>
                            </div>
                        ) : (spot.numReviews === 1) ? (
                            <div>
                            <h2 className="review-header3">
                            <i className="fa-solid fa-star"></i>
                            {spot.avgRating} <div className="space">.</div> {spot.numReviews} review
                            </h2>
                            </div>
                        ) : (
                            <h2>
                            <i className="fa-solid fa-star"></i>
                            NEW
                            </h2>
                        )}
                        </div>
                        </div>
                    <div>
                        {(sessionUser !== undefined && spot.Owner?.id !== sessionUser?.id && spot.numReviews > 1) ? (
                            <div>
                                <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} <div className="space">.</div> {spot.numReviews} reviews
                                </h2>
                                {sessionUser !== undefined && (
                                <div className="reviewList">
                                <ReviewList />
                                </div>
                                )}
                            </div>
                        ): (sessionUser !== undefined && spot.Owner?.id !== sessionUser.id && spot.numReviews === 1) ? (
                            <div>
                                    <h2 className="review-header2">
                                    <i className="fa-solid fa-star"></i>
                                    {spot.avgRating} <div className="space">.</div> {spot.numReviews} review
                                    </h2>
                                    <div className="reviewList">
                                    <ReviewList />
                                    </div>
                            </div>
                        ): (sessionUser !== undefined && spot.Owner?.id !== sessionUser?.id && spot.numReviews <= 0) ? (
                            <div>
                                <h2>
                                <i className="fa-solid fa-star"></i>
                                    NEW
                                </h2>
                                <h1 className="new-review">Be the first to post a review!</h1>
                                <OpenModalButton
                                    buttonText="Post Your Review"
                                    onButtonClick={closeModal}
                                    modalComponent={<CreateReviewModal userId={sessionUser?.id} spotId={spotId}/>}
                                />
                            </div>
                        ) : (sessionUser !== undefined && spot.Owner?.id === sessionUser?.id && spot.numReviews > 1) ? (
                            <div>
                                <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} <div className="space">.</div> {spot.numReviews} reviews
                                </h2>
                                <div className="reviewList">
                                <ReviewList spotOwnerId={spot.Owner.id}/>
                                </div>
                            </div>
                        ) : (sessionUser !== undefined && spot.Owner?.id === sessionUser?.id && spot.numReviews === 1) ? (
                            <div>
                                <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} <div className="space">.</div> {spot.numReviews} review
                                </h2>
                                <div className="reviewList">
                                <ReviewList spotOwnerId={spot.Owner.id}/>
                                </div>
                            </div>
                        ) : (sessionUser !== undefined && spot.Owner?.id === sessionUser?.id && spot.numReviews < 0) ? (
                            <div>
                                <h2>
                                <i className="fa-solid fa-star"></i>
                                NEW
                                </h2>
                            </div>
                        ) : (sessionUser === undefined && spot.numReviews > 1) ? (
                            <div>
                                <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} <div className="space">.</div> {spot.numReviews} reviews
                                </h2>
                                <div className="reviewList">
                                    <ReviewList />
                                </div>
                            </div>
                        ) : (sessionUser === undefined && spot.numReviews === 1) ? (
                            <div>
                                <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} <div className="space">.</div> {spot.numReviews} review
                                </h2>
                                <div className="reviewList">
                                    <ReviewList />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2>
                                    <i className="fa-solid fa-star"></i>
                                    NEW
                                </h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )
        }
        </>
    )
}


// spot.Owner.id !== sessionUser?.id && spot.numReviews === 1
