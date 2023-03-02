import { csrfFetch } from "./csrf";


const GET_SPOTS = 'spots/getSpots'
const ADD_SPOT = 'spots/addSpots';
// const EDIT_SPOTS = 'spots/editSpots';
// const REMOVE_SPOT = 'spots/removeSpots';


export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
};

export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};


export const fetchSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = res.json().then((data) => dispatch(getSpots(data)));
        return spots
    };
};

export const spotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    // console.log(res)

    if (res.ok) {
        const spot = res.json();
        dispatch(addSpot(spot));
    }
}

export const createSpot = (details) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(details)
    });

    if (res.ok) {
        res = await res.json();
        dispatch(addSpot(res));
        return res;
    }
}

const initalState = {};

export default function spotReducer(state = initalState, action) {
    switch(action.type) {
        case GET_SPOTS:
            const newState = {};
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        case ADD_SPOT:
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            }
        default:
            return state;
    }
}
