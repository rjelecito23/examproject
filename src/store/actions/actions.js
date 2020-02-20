import { FETCHING_SONGS_SUCCESS, FETCHING_SONGS_FAILURE } from './constant';

export const fetchSuccess = res => ({ type: FETCHING_SONGS_SUCCESS, payload: res });
export const fetchFailure = err => ({ type: FETCHING_SONGS_FAILURE, payload: err });

export const fetchSongs = searchFilter => {
	return async dispatch => {
		try {
			let url = 'http://localhost:3000/songs';
			if (searchFilter) {
				url = url + '?q=' + searchFilter;
			}

			let res = await fetch(url);
			let json = await res.json();
			dispatch(fetchSuccess(json));
		} catch (err) {
			dispatch(fetchFailure(err));
		}
	};
};
