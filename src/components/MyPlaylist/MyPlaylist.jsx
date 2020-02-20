import React, { useState } from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditModal from '../EditModal/EditModal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteWarning from '../DeleteWarning/DeleteWarning';
import DeleteIcon from '@material-ui/icons/Delete';

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

const MyPlaylist = ({ SongsData }) => {
	const classes = useStyle();
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
	const [editItem, setEditItem] = useState({
		id: '',
		title: '',
		singer: '',
	});
	const [deleteItem, setDeleteItem] = useState({
		id: '',
	});

	const handleDeleteWarningModal = ({ id }) => {
		setDeleteItem({ id });
		setIsOpenWarningModal(!isOpenWarningModal);
	};

	const handleEditItemModal = ({ id, title, singer }) => {
		setEditItem({ id, title, singer });
		setIsOpen(!isOpen);
	};

	return (
		<div>
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
					<TableBody>
						{SongsData.map(music => (
							<StyledTableRow key={music.id}>
								<StyledTableCell component="th" scope="row">
									{music.title}
								</StyledTableCell>
								<StyledTableCell align="right">{music.singer}</StyledTableCell>
								<StyledTableCell align="right">
									<Button
										variant="contained"
										color="primary"
										type="button"
										onClick={() => handleEditItemModal(music)}
									>
										<EditIcon />
									</Button>
								</StyledTableCell>
								<StyledTableCell align="right">
									<Button
										variant="contained"
										color="secondary"
										type="button"
										onClick={() => handleDeleteWarningModal(music)}
									>
										<DeleteIcon />
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<EditModal editItem={editItem} setEditItem={setEditItem} isOpen={isOpen} setIsOpen={setIsOpen} />
			<DeleteWarning
				deleteItem={deleteItem}
				setDeleteItem={setDeleteItem}
				isOpenWarningModal={isOpenWarningModal}
				setIsOpenWarningModal={setIsOpenWarningModal}
			/>
		</div>
	);
};

export default MyPlaylist;
