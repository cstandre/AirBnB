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

    // console.log(spot)

    useEffect(() => {
        dispatch(spotDetails(spotId));
    }, [dispatch, spotId])

    // if (spot.avgRating === null) spot.avgRating = 0
    // Object.values(spot.SpotImages).sort((a, b) => (a.id > b.id) ? 1 : -1)

    return (
        <div className="spot-detail-body">
            {spot && (
                <div classname='spot-details-container'>
                    <div className="page-header">
                        <h1 className="spot-name">
                            {spot?.name}
                        </h1>
                        <p className="quick-description">
                            <span className="quick-desc-txt">
                                <i className="fa-solid fa-star"></i>
                                <span className="avg-rate">{spot?.avgRating}</span>
                            </span>
                            <span className="quick-desc-txt">
                                {spot?.numReviews} review(s)
                            </span>
                            <span className="location">
                                {spot?.city}, {spot?.state}, {spot?.country}
                            </span>
                        </p>
                    </div>
                    <div className="img-container">
                        {spot?.SpotImages && Object.values(spot?.SpotImages).sort((a, b) => (a.id > b.id) ? 1 : -1).map((image, i) =>
                        <img key={image?.id} className={`img${i}`} src={image?.url} alt='' />)}
                    </div>
                    <div className="mid">
                        <div>
                            {spot.Owner && (
                                <h2 className="host">
                                Entire vacation home hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
                                </h2>
                            )}
                            <p className="spot-description">
                                {spot?.description}
                            </p>
                        </div>
                        <div className="reservation-box">
                            <div className="res-box-container">
                                <div className="res-box-header">
                                    <span>
                                        <span className="bold-price">${spot?.price}</span>
                                        <span>
                                            night
                                        </span>
                                    </span>
                                    <span>
                                        <i className="fa-solid fa-star"></i>
                                        <span className="avg-rate">{spot?.avgRating}</span>
                                        <span>
                                            {spot?.numReviews} review(s)
                                        </span>
                                    </span>
                                </div>
                                <div className="res-calendar">
                                    <span>check in</span> {/* This will be a calendar */}
                                    <span>check out</span> {/* This will be a calendar */}
                                    <p>guests</p> {/* This will be a drop down */}
                                    <button>Reserve</button>
                                    <p>You wont be charged yet</p>
                                </div>
                                <div className="res-price-section">
                                    <div className="calculated-price">
                                        <span>${spot?.price} x </span>
                                        <span>calculated amt</span> {/* Calculated amt of price x nights*/}
                                    </div>
                                    <div className="cleaning-fee">
                                        <span>Cleaning Fee</span>
                                        <span>$300</span>
                                    </div>
                                    <div>
                                        <span>Vaction Spots Service Fee</span>
                                        <span>$75</span>
                                    </div>
                                    <div className="calculated-total">
                                        <span>Total</span>
                                        <span>Total amt calculated</span> {/* calculated amt of everything */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    {(sessionUser !== undefined && spot?.Owner?.id !== sessionUser?.id && spot?.numReviews > 1) ? (
                        <div>
                            <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot?.avgRating} {spot?.numReviews} reviews
                            </h2>
                            {sessionUser !== undefined && (
                            <div className="reviewList">
                                <ReviewList />
                            </div>
                            )}
                        </div>
                    ): (sessionUser !== undefined && spot?.Owner?.id !== sessionUser?.id && spot?.numReviews === 1) ? (
                        <div>
                            <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot?.avgRating} {spot?.numReviews} review
                            </h2>
                            <div className="reviewList">
                                <ReviewList />
                            </div>
                        </div>
                    ): (sessionUser !== undefined && spot?.Owner?.id !== sessionUser?.id && spot?.numReviews <= 0) ? (
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
                    ) : (sessionUser !== undefined && spot?.Owner?.id === sessionUser?.id && spot?.numReviews > 1) ? (
                        <div>
                            <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot.avgRating} {spot?.numReviews} reviews
                            </h2>
                            <div className="reviewList">
                                <ReviewList spotOwnerId={spot?.Owner?.id}/>
                            </div>
                        </div>
                    ) : (sessionUser !== undefined && spot?.Owner?.id === sessionUser?.id && spot?.numReviews === 1) ? (
                        <div>
                            <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot?.avgRating} {spot?.numReviews} review
                            </h2>
                            <div className="reviewList">
                                <ReviewList spotOwnerId={spot?.Owner?.id}/>
                            </div>
                        </div>
                    ) : (sessionUser !== undefined && spot?.Owner?.id === sessionUser?.id && spot?.numReviews < 0) ? (
                        <div>
                            <h2>
                                <i className="fa-solid fa-star"></i>
                                NEW
                            </h2>
                        </div>
                    ) : (sessionUser === undefined && spot?.numReviews > 1) ? (
                        <div>
                            <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot?.avgRating} {spot?.numReviews} reviews
                            </h2>
                            <div className="reviewList">
                                <ReviewList />
                            </div>
                        </div>
                    ) : (sessionUser === undefined && spot?.numReviews === 1) ? (
                        <div>
                            <h2 className="review-header2">
                                <i className="fa-solid fa-star"></i>
                                {spot?.avgRating} {spot?.numReviews} review
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
            )}
        </div>
    )
}
