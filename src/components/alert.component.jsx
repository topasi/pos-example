import React from 'react'
import { Alert } from '@mui/material'

const AlertComponent = ({ severity, children }) => {
	return (
		<Alert severity={severity} sx={{ width: '100%', borderRadius: '.5rem' }}>
			{children}
		</Alert>
	)
}

export default AlertComponent
