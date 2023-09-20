import { csrfFetch } from "./csrf";
import { spotDetails } from "./spots";

const GET_REVIEWS = 'reviews/getSpotReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';

export const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
};

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}


export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const reviews = await res.json()
        // console.log(reviews)
        dispatch(getReviews(reviews))
        return reviews;
    }
}

export const createReviewFetch = (review) => async (dispatch) => {
    const { spot } = review
    const res = await csrfFetch(`/api/spots/${spot}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const newReview = await res.json();
        dispatch(createReview(newReview))
        return newReview;
    }
};

export const deleteReviewFetch = (reviewId, spotId) => async (dispatch) => {
    const numSpotId = Number(spotId)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteReview(reviewId))
        dispatch(spotDetails(numSpotId))
    }
}


const initalState = {};

export default function reviewReducer(state = initalState, action) {
    switch(action.type) {
        case GET_REVIEWS: {
            // console.log(action.reviews.Reviews)
            const newState = {};
            action.reviews.Reviews.forEach((review) => (newState[review.id] = review))
            return newState
        }
        case CREATE_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review
            };
        }
        case DELETE_REVIEW: {
            // console.log(action)
            const newState = { ...state };
            delete newState[action.review];
            return newState;
        }
        default:
            return state;
    }
}
