import { FETCHING_SONGS_SUCCESS, FETCHING_SONGS_FAILURE } from './type';

export const fetchSuccess = res => ({ type: FETCHING_SONGS_SUCCESS, payload: res });
export const fetchFailure = err => ({ type: FETCHING_SONGS_FAILURE, payload: err });


export const fetchSongs = (search) => {
	return async dispatch => {
		try {
			let url = 'http://localhost:3000/songs'
			if(search) {
				url = url + "?q=" + search
			}

			let res = await fetch(url);
            let json = await res.json()
			console.log(json);
			dispatch(fetchSuccess(json));
		} catch (err) {
			dispatch(fetchFailure(err));
		}
	};
};
