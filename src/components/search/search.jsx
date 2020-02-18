import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fetchSongs } from '../../store/actions/actions';
import { connect } from 'react-redux';

const SearchBar = ({ Songs, fetchSong, music }) => {
	const [input, setInput] = useState('');
	// const searchTracks = event => {
	// 	setInput(event.target.value);
	// 	if (event.target.value) {
	// 		Songs.filter(item => {
	// 			console.log(item.title);
	// 			return item.title.toLowerCase().includes(event.target.value.toLowerCase());
	// 		});
	// 	}
	// };
	const searchTracks = event => {
		setInput(event.target.value)
		fetchSong(event.target.value)

	}


	return (
		<div>
			<InputBase type="text" value={input} placeholder="Search…" onChange={searchTracks} />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		Songs: state.songs,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchSong: (search) => dispatch(fetchSongs(search))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);

// export default SearchBar;
