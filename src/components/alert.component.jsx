import React from 'react'
import { Alert } from '@mui/material'

const AlertComponent = ({ severity, children }) => {
	return (
		<Alert severity={severity} sx={{ borderRadius: '.5rem' }}>
			{children}
		</Alert>
	)
}

export default AlertComponent
