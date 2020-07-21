import {
    SET_EMAIL, 
    SET_TOKEN, 
    SET_USER
} from 'constants/action-types';

const initialState = {
	email: "",
	token: "",
	purchases: {}
};

const User = (state = initialState, action) => {
	switch (action.type) {
		case SET_EMAIL:
			return {
				...state,
				email: action.payload,
			};
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case SET_TOKEN:
			return {
				...state,
				token: action.payload,
			};	
		default:
			return {
				...state,
			};
	}
};

export default User;
