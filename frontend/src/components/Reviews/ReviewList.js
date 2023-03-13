import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReviewModal/CreateReviewModal";
import DeleteReviewButton from "./DeleteReview/DeleteReviewButton";

import './ReviewList.css'

const ReviewList = ({spotOwnerId}) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const divRef = useRef();
    const reviews = useSelector(state=>Object.values(state?.reviews)).reverse();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!showModal) return;

        const closeModal = (e) => {
            if (!divRef.current.contains(e.target)) {
                setShowModal(false)
            }
        };

        document.addEventListener('click', closeModal);
        return () => document.removeEventListener("click", closeModal);
    }, [showModal]);

    const closeModal = () => setShowModal(false);
    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId]);

    const date = Object.values(reviews).map((review) => new Date(review.createdAt));
    const dateArr = date.toString().split(' ')
    const month = dateArr[1];
    const year = dateArr[3];

    const userReview = Object.values(reviews).filter((review) => review.User?.id === sessionUser?.id)

    return (
        <>
        {reviews && (
            <div>
                {sessionUser !== undefined && !userReview.length && spotOwnerId !== sessionUser?.id && (
                    <OpenModalButton
                        buttonText="Post Your Review"
                        onButtonClick={closeModal}
                        modalComponent={<CreateReviewModal userId={sessionUser?.id} spotId={spotId}/>}
                    />
                )}
                {Object.values(reviews).map(({id, review, User}) => (
                    (User &&
                    <li className="review-details" key={id}>
                        <div className="reviewer">
                        {User.firstName}
                        </div>
                        <div>
                        {month} {year}
                        </div>
                        <div>
                        {review}
                        </div>
                        {sessionUser !== undefined && User.id === sessionUser?.id && (
                            <OpenModalButton
                                buttonText="Delete"
                                onButtonClick={closeModal}
                                modalComponent={<DeleteReviewButton id={id} spotId={spotId} />}
                            />
                        )}
                    </li>)
                ))}
            </div>
        )}
        </>
    )
}

export default ReviewList;
