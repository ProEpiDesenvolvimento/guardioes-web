import {
	SET_EMAIL,
	SET_TOKEN,
	SET_USER,
	SET_APPS,
	SET_CONTENTS,
	SET_RUMORS,
	SET_SYMPTOMS,
	SET_CITY_MANAGERS,
	SET_GROUP_MANAGERS,
	SET_GROUP_MANAGER_TEAMS,
	SET_MANAGERS,
	SET_GROUPS,
	SET_FORM,
	SET_SYNDROMES,
	SET_VIGILANCE_SYNDROMES,
	SET_GO_DATA_TOKEN,
	SET_USERS,
	SET_ADMINS
} from 'constants/action-types';

const initialState = {
	email: "",
	token: "",
	user: {},
	apps: [],
	contents: [],
	rumors: [],
	symptoms: [],
	managers: [],
	city_managers: [],
	group_managers: [],
	group_manager_teams: [],
	groups: [],
	form: {},
	syndromes: [],
	vigilance_syndromes: [],
	godataToken: "",
	users: [],
	admins: []
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
		case SET_APPS:
			return {
				...state,
				apps: action.payload
			};
		case SET_CONTENTS:
			return {
				...state,
				contents: action.payload
			};
		case SET_RUMORS:
			return {
				...state,
				rumors: action.payload
			};
		case SET_SYMPTOMS:
			return {
				...state,
				symptoms: action.payload
			};
		case SET_CITY_MANAGERS:
			return {
				...state,
				city_managers: action.payload
			};
		case SET_GROUP_MANAGERS:
			return {
				...state,
				group_managers: action.payload
			};
		case SET_GROUP_MANAGER_TEAMS:
			return {
				...state,
				group_manager_teams: action.payload
			};
		case SET_MANAGERS:
			return {
				...state,
				managers: action.payload
			};
		case SET_SYNDROMES:
			return {
				...state,
				syndromes: action.payload
			};
		case SET_VIGILANCE_SYNDROMES:
			return {
				...state,
				vigilance_syndromes: action.payload
			};
		case SET_GO_DATA_TOKEN:
			return {
				...state,
				godataToken: action.payload
			};
		case SET_USERS:
			return {
				...state,
				users: action.payload
			};
		case SET_GROUPS:
			return {
				...state,
				groups: action.payload
			};
		case SET_FORM:
			return {
				...state,
				form: action.payload
			};
		case SET_ADMINS:
			return {
				...state,
				admins: action.payload
			};
		default:
			return {
				...state,
			};
	}
};

export default User;
