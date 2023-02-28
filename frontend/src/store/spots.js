import { csrfFetch } from "./csrf";


const GET_SPOTS = 'spots/getSpots'
const ADD_SPOT = 'spots/addSpots';
const EDIT_SPOTS = 'spots/editSpots';
const REMOVE_SPOT = 'spots/removeSpots';


export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
};

export const addSpots = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};


export const fetchSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = res.json();
        dispatch(getSpots(spots))
    };
};

export const createSpot = (details) => async (dispatch) => {
    // const {  }
    const res = await csrfFetch('/api/spots', {
        method: 'POST',

    })
}


export default function spotReducer(state, action) {
    switch(action.type) {
        case GET_SPOTS:
        default:
            return state;
    }
}
