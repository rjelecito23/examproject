import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditModal from '../../components/edit-modal/edit';
import SearchBar from '../../components/search/search';
import RemoveRow from '../../components/remove/remove';
import AddModal from '../../components/add-modal/addModal'
import { fetchSongs } from '../../store/actions/actions';
import { connect } from 'react-redux';

const useStyle = makeStyles(theme => ({
	table: {
		minWidth: 650,
	},
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

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
}))(TableRow);

function HomePage({ Songs, fetchSong }) {
	const classes = useStyle();

	useEffect(() => {
		fetchSong();
	}, []);

	return (
		<div>
			<Header />
			<div className={classes.search}><SearchBar fetchSong={fetchSong} /></div>
			<TableContainer component={Paper}>
				<Table className={classes.table} arial-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Songs</StyledTableCell>
							<StyledTableCell align="right">Artists</StyledTableCell>
							<StyledTableCell align="right">Edit</StyledTableCell>
							<StyledTableCell align="right">Delete</StyledTableCell>
						</TableRow>
					</TableHead>
					<div><AddModal fetchSong={fetchSong} /></div>	
					<TableBody>
						{Songs.map(music => (
							<StyledTableRow key={music.id}>
								<StyledTableCell component="th" scope="row">
									{music.title}
								</StyledTableCell>
								<StyledTableCell align="right">{music.singer}</StyledTableCell>
								<StyledTableCell align="right"><EditModal music={music} fetchSong={fetchSong} /></StyledTableCell>
								<StyledTableCell align="right">
									<RemoveRow fetchSong={fetchSong} />
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		Songs: state.songs,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSong: () => dispatch(fetchSongs()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
