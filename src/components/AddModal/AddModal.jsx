import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
	const [isOpen, setIsOpen] = useState(false);
	const [addItem, setAddItem] = useState({
		id: new Date().getTime(),
		title: '',
		singer: '',
	});

	const handleToogleModal = () => {
		setIsOpen(!isOpen);
		setAddItem({
			title: '',
			singer: ''
		})
	};

	const handleChange = event => {
		setAddItem({
			...addItem,
			[event.target.id]: event.target.value,
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
			handleToogleModal();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Button variant="contained" color="primary" type="button" onClick={handleToogleModal}>
				<AddIcon />
			</Button>
			<Modal className={classes.modal} open={isOpen} onClose={handleToogleModal}>
				<Fade in={isOpen}>
					<div className="modal-wrapper">
						<div className="modal-header">
							<h3>Add Modal</h3>
						</div>
						<div className="modal-body">
							<form className={classes.root}>
								<TextField
									label="Title"
									id="title"
									value={addItem.title}
									variant="outlined"
									onChange={handleChange}
								/>
								<TextField
									label="Singer"
									id="singer"
									value={addItem.singer}
									variant="outlined"
									onChange={handleChange}
								/>
							</form>
						</div>
						<div className="modal-footer">
							<button className="btn-cancel" onClick={handleToogleModal}>
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

export default AddModal;
