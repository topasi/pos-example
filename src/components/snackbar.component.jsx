import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackbarComponent = ({ open, onClose, severity, children }) => {
	return (
		<Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
			<Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
				{children}
			</Alert>
		</Snackbar>
	)
}

export default SnackbarComponent
