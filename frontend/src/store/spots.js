import { csrfFetch } from "./csrf";


const GET_SPOTS = 'spots/getSpots';
const USER_SPOTS = 'spots/currentUser'
const GET_ONE = 'spots/getOneSpot'
const ADD_SPOT = 'spots/addSpots';
const ADD_IMG = 'spots/addImage';
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

// export const removeSpot = (spotId) => {
//     return {
//         type: REMOVE_SPOT,
//         spotId
//     }
// }


export const fetchSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = await res.json().then((data) => dispatch(getSpots(data)));
        // console.log(spots)
        return spots
    };
};

export const spotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json();
        spot.SpotImages.reverse()
        dispatch(getOneSpot(spot));
        return spot;
    }
}

export const createSpot = (details) => async (dispatch) => {
    const { handelImages } = details;
    const spotFetch = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(details)
    });

    if (spotFetch.ok) {
        const spot = await spotFetch.json();

        const imgArr = [];
        for await (let images of handelImages) {
            const imgFetch = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                body: JSON.stringify(images)
            });
            const image = await imgFetch.json()
            imgArr.push(image)
        }

        dispatch(addImage(imgArr));
        dispatch(addSpot(spot));
        return spot;
    }
}

export const editSpotForm = (details, id) => async (dispatch) => {
    const spotFetch = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify(details)
    })

    if (spotFetch.ok) {
        const updateSpot = await spotFetch.json();
        dispatch(addSpot(updateSpot));
        return updateSpot;
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
export const deleteSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(getCurrentSpots())
    }
}

const initalState = {};

export default function spotReducer(state = initalState, action) {
    switch(action.type) {
        case GET_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            // console.log(action.spotId, 1, "1")
            return newState;
        }
        case USER_SPOTS: {
            const newState = {};
            action.spots.Spot.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        case GET_ONE:{
            return {
                ...state,
                currentSpot: action.spot
            }
        }
        case ADD_SPOT: {
            // console.log(action.spot)
            const newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case ADD_IMG:
            // console.log(state)
            // console.log(action)
            return {
                ...state,
                [action.image.id]: {
                    ...state[action.image.id],
                }
            }
        // case REMOVE_SPOT: {
        //     const newState = { ...state };
        //     delete newState.spots[action.spotId];
        //     return newState;
        // }
        default:
            return state;
    }
}
