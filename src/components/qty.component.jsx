import React from 'react'
import { ButtonGroup, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const QtyComponent = ({ item, index, handleElQty, handleIncreaseQtyChange, handleReduceQtyChange }) => {
	return (
		<ButtonGroup size='small' sx={{ height: '25px' }} disableElevation>
			<Button
				variant='contained'
				aria-label='reduce'
				onClick={() => handleReduceQtyChange(item, index)}
				sx={{
					width: '30px',
					minWidth: '0 !important',
					color: 'background.default',
				}}
			>
				<RemoveIcon fontSize='small' />
			</Button>
			<Button
				aria-label='quantity'
				sx={{
					width: '30px',
					minWidth: '0 !important',
					lineHeight: '24px',
				}}
				disableElevation
			>
				<span ref={(el) => handleElQty(el)}>{item.qty}</span>
			</Button>
			<Button
				variant='contained'
				aria-label='increase'
				onClick={() => handleIncreaseQtyChange(item, index)}
				sx={{
					width: '30px',
					minWidth: '0 !important',
					color: 'background.default',
				}}
				disableElevation
			>
				<AddIcon fontSize='small' />
			</Button>
		</ButtonGroup>
	)
}

export default QtyComponent
