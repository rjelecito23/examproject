import { FETCHING_SONGS_SUCCESS, FETCHING_SONGS_FAILURE } from '../actions/constant';

const initialState = {
	errorMessage: '',
	songsData: [],
};

const songsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_SONGS_FAILURE:
			return {
				...state,
				errorMessage: action.payload,
			};
		case FETCHING_SONGS_SUCCESS:
			return {
				...state,
				songsData: action.payload,
			};
		default:
			return state;
	}
};

export default songsReducer;
