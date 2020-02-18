import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchSongs } from '../../store/actions/actions';
import { connect } from 'react-redux';

const RemoveRow = ({ music, fetchSong }) => {

	const deleteItem = async (id) => {
		try {
			const res = await fetch('http://localhost:3000/songs/' + id ,{
				method: 'DELETE',
			})
			console.log(res)
			fetchSong()
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<button onClick={() => deleteItem(music.id)}>
				<DeleteIcon />
			</button>
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
		fetchSong: () => dispatch(fetchSongs())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveRow);
