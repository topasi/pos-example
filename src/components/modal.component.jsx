import React from 'react'
import { Modal, IconButton, Box } from '@mui/material'
import MuiBox from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'

const ModalComponent = ({ open, onClose, children, width }) => {
	return (
		<Modal keepMounted open={open} onClose={onClose} aria-labelledby='keep-mounted-modal-title' aria-describedby='keep-mounted-modal-description'>
			<MuiBox
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: '100%',
					padding: '1rem',
					display: 'flex',
					justifyContent: 'center',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<Box
					sx={{
						position: 'relative',
						width: '100%',
						maxWidth: width ? width : '575px',
						padding: '2.5rem 2rem 2rem',
						backgroundColor: 'background.default',
						borderRadius: '.75rem',
					}}
				>
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
			</MuiBox>
		</Modal>
	)
}

export default ModalComponent
