import React from 'react'
import { Button, CircularProgress } from '@mui/material'

const ButtonComponent = ({ disabled, children }) => {
	return (
		<Button
			variant='contained'
			size='large'
			type='submit'
			disableElevation
			disabled={disabled}
			endIcon={
				disabled && (
					<CircularProgress
						color='inherit'
						sx={{
							width: '20px !important',
							height: '20px !important',
							marginRight: '-10px',
						}}
					/>
				)
			}
			sx={{
				minWidth: '150px',
				minHeight: '50px',
				borderRadius: '.5rem',
				color: 'background.default',
			}}
		>
			{children}
		</Button>
	)
}

export default ButtonComponent
