import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewButton from "./DeleteReview/DeleteReviewButton";


const ReviewList = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const divRef = useRef();
    const reviews = useSelector(state=>state.reviews);
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
    const dateArr = date.toString().split(' ');
    const month = dateArr[1];
    const year = dateArr[3];

    return (
        <>
        {reviews && (
            <div>
                {Object.values(reviews).map(({id, review, User}) => (
                    <li key={id}>
                        {User.firstName}
                        <br/>
                        {month} {year}
                        <br/>
                        {review}
                        {sessionUser !== undefined && User.id === sessionUser?.id && (
                            <OpenModalButton
                                buttonText="Delete"
                                onButtonClick={closeModal}
                                modalComponent={<DeleteReviewButton id={id}/>}
                            />
                        )}
                    </li>
                ))}
            </div>
        )}
        </>
    )
}

export default ReviewList;
