import { csrfFetch } from "./csrf";

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
        dispatch(getReviews(reviews));
        return reviews;
    }
};

export const createReviewFetch = (details, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(details)
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(createReview(review));
        return review;
    }
};

export const deleteReviewFetch = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
}


const initalState = {};

export default function reviewReducer(state = initalState, action) {
    switch(action.type) {
        case GET_REVIEWS: {
            const newState = {};
            action.reviews.Reviews.forEach((review) => (newState[review.id] = review))
            return newState
        }
        case CREATE_REVIEW: {
            const newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        }
        default:
            return state;
    }
}
