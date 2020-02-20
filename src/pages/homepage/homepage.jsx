import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchBar from '../../components/SearchBar/SearchBar';
import AddModal from '../../components/AddModal/AddModal';
import MyPlaylist from '../../components/MyPlaylist/MyPlaylist';
import { fetchSongs } from '../../store/actions/actions';
import { connect } from 'react-redux';

const useStyle = makeStyles(theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
}));

function HomePage({ SongsData, fetchSong }) {
	const classes = useStyle();

	useEffect(() => {
		fetchSong();
	}, []);

	return (
		<div>
			<Header />
			<div className={classes.search}>
				<SearchBar fetchSong={fetchSong} />
			</div>
			<div>
			<AddModal fetchSong={fetchSong} />
			<MyPlaylist SongsData={SongsData} />
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		SongsData: state.songsData,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSong: search => dispatch(fetchSongs(search)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
