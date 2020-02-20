import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';

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

export default SearchBar;
