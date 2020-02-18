import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { fetchSongs } from '../../store/actions/actions';
import { connect } from 'react-redux';

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

const AddModal = ({ fetchSong }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [addItem, setAddItem] = useState({
		id: '',
		title: '',
		singer: '',
	});

	const handleOpenModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
	};

	const handleChangeId = event => {
		setAddItem({
			...addItem,
			id: event.target.value,
		});
	};

	const handleChangeTitle = event => {
		setAddItem({
			...addItem,
			title: event.target.value,
		});
	};

	const handleChangeSinger = event => {
		setAddItem({
			...addItem,
			singer: event.target.value,
		});
	};

	const handleAddItem = async () => {
		try {
			const res = await fetch('http://localhost:3000/songs/', {
				method: 'POST',
				body: JSON.stringify(addItem),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});

			fetchSong();
			setOpen(false);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<button type="button" onClick={handleOpenModal}>
				<AddIcon />
			</button>
			<Modal className={classes.modal} open={open} onClose={handleCloseModal} closeAfterTransition>
				<Fade in={open}>
					<div className="modal-wrapper">
						<div className="modal-header">
							<h3>Add Modal</h3>
							<span onClick={handleCloseModal}>X</span>
						</div>
						<div className="modal-body">
							<form className={classes.root}>
								<TextField label="ID" value={addItem.id} variant="outlined" onChange={handleChangeId} />
								<TextField
									label="Title"
									value={addItem.title}
									variant="outlined"
									onChange={handleChangeTitle}
								/>
								<TextField
									label="Singer"
									value={addItem.singer}
									variant="outlined"
									onChange={handleChangeSinger}
								/>
							</form>
						</div>
						<div className="modal-footer">
							<button className="btn-cancel" onClick={handleCloseModal}>
								Close
							</button>
							<button className="btn-save" onClick={() => handleAddItem()}>
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

export default connect(undefined, mapDispatchToProps)(AddModal);
