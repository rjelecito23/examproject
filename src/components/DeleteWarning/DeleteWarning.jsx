import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchSongs } from '../../store/actions/actions';
import { connect } from 'react-redux';

const DeleteWarning = ({ fetchSong, deleteItem, setDeleteItem, isOpenWarningModal, setIsOpenWarningModal }) => {
	const handleModal = () => {
		setIsOpenWarningModal(!isOpenWarningModal);
	};

	const handleDeleteItem = async id => {
		try {
			const res = await fetch('http://localhost:3000/songs/' + id, {
				method: 'DELETE',
			});
			fetchSong();
			setIsOpenWarningModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Dialog open={isOpenWarningModal} onClose={handleModal}>
				<DialogTitle>Are your sure?</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to delete this Song?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button>Cancel</Button>
					<Button onClick={() => handleDeleteItem(deleteItem.id)}>Delete</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSong: () => dispatch(fetchSongs()),
	};
};

export default connect(undefined, mapDispatchToProps)(DeleteWarning);
