import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
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

const EditModal = ({ fetchSong, editItem, setEditItem, isOpen, setIsOpen }) => {
	const classes = useStyles();
	const handleCloseEditModal = () => {
		setIsOpen(!isOpen);
	};

	const handleEditItem = async id => {
		try {
			const res = await fetch('http://localhost:3000/songs/' + id, {
				method: 'PUT',
				body: JSON.stringify(editItem),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			fetchSong();
			setIsOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = event => {
		setEditItem({
			...editItem,
			[event.target.id]: event.target.value,
		});
	};

	return (
		<div>
			<Modal className={classes.modal} open={isOpen}>
				<Fade in={isOpen}>
					<div className="modal-wrapper">
						<div className="modal-header">
							<h3>Edit Modal</h3>
						</div>
						<div className="modal-body">
							<form className={classes.root}>
								<TextField
									label="Song"
									id="title"
									value={editItem.title}
									variant="outlined"
									onChange={handleChange}
								/>
								<TextField
									label="Singer"
									id="singer"
									value={editItem.singer}
									variant="outlined"
									onChange={handleChange}
								/>
							</form>
						</div>
						<div className="modal-footer">
							<button className="btn-cancel" onClick={handleCloseEditModal}>
								Close
							</button>
							<button className="btn-save" onClick={() => handleEditItem(editItem.id)}>
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
