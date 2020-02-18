import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fetchSongs } from '../../store/actions/actions';
import { connect } from 'react-redux';

const SearchBar = ({ fetchSong }) => {
	const [input, setInput] = useState('');
	const searchTracks = event => {
		setInput(event.target.value);
		fetchSong(event.target.value);
	};

	return (
		<div>
			<InputBase type="text" value={input} placeholder="Search…" onChange={searchTracks} />
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSong: search => dispatch(fetchSongs(search)),
	};
};

export default connect(undefined, mapDispatchToProps)(SearchBar);
