import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditIcon from '@material-ui/icons/Edit';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { fetchSongs } from '../../store/actions/actions';
import { connect } from 'react-redux';
import './edit.css';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: 200,
		},
	},
}));

const EditModal = ({ fetchSong, music }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [editItem, setEditItem] = useState({
		title: '',
		singer: '',
	});

	const handleOpen = (title, singer) => {
		setEditItem({ title, singer });
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEditItem = async () => {
		try {
			const res = await fetch('http://localhost:3000/songs/' + music.id, {
				method: 'PUT',
				body: JSON.stringify(editItem),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			console.log(res);
			console.log(editItem);
			fetchSong();
			setOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangeTitle = event => {
		setEditItem({
			...editItem,
			title: event.target.value,
		});
	};
	const handleChangeSinger = event => {
		setEditItem({
			...editItem,
			singer: event.target.value,
		});
	};

	return (
		<div>
			<button type="button" onClick={() => handleOpen(music.title, music.singer)}>
				<EditIcon />
			</button>
			<Modal className={classes.modal} open={open} closeAfterTransition>
				<Fade in={open}>
					<div className="modal-wrapper">
						<div className="modal-header">
							<h3>Edit Modal</h3>
							<span onClick={handleClose}>X</span>
						</div>
						<div className="modal-body">
							<form className={classes.root}>
								<TextField
									label="Song"
									value={editItem.title}
									variant="outlined"
									onChange={handleChangeTitle}
								/>
								<TextField
									label="Singer"
									value={editItem.singer}
									variant="outlined"
									onChange={handleChangeSinger}
								/>
							</form>
						</div>
						<div className="modal-footer">
							<button className="btn-cancel" onClick={handleClose}>
								Close
							</button>
							<button className="btn-save" onClick={handleEditItem}>
								Save
							</button>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSong: () => dispatch(fetchSongs()),
	};
};

export default connect(undefined, mapDispatchToProps)(EditModal);
