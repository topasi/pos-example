import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

const DialogComponent = ({ open, onClose, handleDeleteDialog, title, children }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			sx={{
				'& .MuiPaper-root': {
					borderRadius: '.75rem',
				},
				'& .MuiDialogActions-root': {
					padding: '1rem',
				},
			}}
		>
			<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>{children}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} sx={{ color: 'text.primary' }}>
					No, Cancel
				</Button>
				<Button onClick={handleDeleteDialog} color='error' autoFocus>
					Yes, Proceed
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DialogComponent
