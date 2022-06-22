import React from 'react'
import { styled, Modal, IconButton } from '@mui/material'
import MuiBox from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'

const Box = styled(MuiBox)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	width: '100%',
	maxWidth: '575px',
	padding: '2.5rem 2rem 2rem',
	transform: 'translate(-50%, -50%)',
	backgroundColor: theme.palette.background.default,
	borderRadius: '1rem',
}))

const ModalComponent = ({ open, onClose, children }) => {
	return (
		<Modal keepMounted open={open} onClose={onClose} aria-labelledby='keep-mounted-modal-title' aria-describedby='keep-mounted-modal-description'>
			<Box>
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: '1rem',
						top: '1rem',
					}}
				>
					<CloseIcon fontSize='inherit' />
				</IconButton>
				{children}
			</Box>
		</Modal>
	)
}

export default ModalComponent
