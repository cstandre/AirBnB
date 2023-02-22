

const SET_SESSION = 'session/setSession';
const REMOVE_SESSION = 'session/removeSessionUser';

const setSession = () => {
    type: SET_SESSION
};

const removeSessionUser = () => {
    type: REMOVE_SESSION
};


const login = () => async (dispatch) => {
    const response = await fetch(`/api/session`, {
        method: 'POST',
        // headers:
    });

}


const sessionReducer = (state = [], action) => {
    switch(action.type) {
        case setSession: {

        }
        case removeSessionUser: {

        }
        default:
        return state;
    }
};

export default sessionReducer;
