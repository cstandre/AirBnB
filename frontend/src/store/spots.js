import { csrfFetch } from "./csrf";


const GET_SPOTS = 'spots/getSpots';
const USER_SPOTS = 'spots/currentUser'
const GET_ONE = 'spots/getOneSpot'
const ADD_SPOT = 'spots/addSpots';
const ADD_IMG = 'spots/addImage';
const EDIT_SPOT = 'spots/editSpots';
// const REMOVE_SPOT = 'spots/removeSpots';


export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
};

export const currUserSpots = (spots) => {
    return {
        type: USER_SPOTS,
        spots
    }
}

export const getOneSpot = (spot) => {
    return {
        type: GET_ONE,
        spot
    }
}

export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};

export const addImage = (image) => {
    return {
        type: ADD_IMG,
        image
    }
}

export const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}


export const fetchSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = await res.json().then((data) => dispatch(getSpots(data)));
        return spots
    };
};

export const spotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json();
        dispatch(getOneSpot(spot));
        return res
    }
}

export const createSpot = (details) => async (dispatch) => {
    const { prevImage } = details;
    const spotFetch = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(details)
    });

    if (spotFetch.ok) {
        const spot = await spotFetch.json();
        dispatch(addSpot(spot));

        const imgFetch = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            body: JSON.stringify(prevImage)
        });

        const image = await imgFetch.json();
        dispatch(addImage(image));
        return spot;
    }
}

export const getCurrentSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');

    if (res.ok) {
        const userSpot = await res.json();
        dispatch(currUserSpots(userSpot));
        return userSpot;
    }
}

const initalState = {};

export default function spotReducer(state = initalState, action) {
    switch(action.type) {
        case GET_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        case USER_SPOTS: {
            const newState = {};
            action.spots.Spot.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        case GET_ONE:
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        case ADD_SPOT: {
            // console.log(state, action.spot)
            const newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case ADD_IMG:
            return {
                ...state,
                [action.image.id]: {
                    ...state[action.image.id],
                }
            }
        default:
            return state;
    }
}
