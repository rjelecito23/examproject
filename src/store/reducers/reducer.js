import { FETCHING_SONGS_SUCCESS, FETCHING_SONGS_FAILURE } from '../actions/type';

const initialState = {
	errorMessage: '',
    songs: [],
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
				songs: action.payload,
            };
		default:
			return state;
	}
};

export default songsReducer;
