import React from 'react'
import { ButtonGroup, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import useCart from '../hooks/useCart'

const QtyComponent = ({ item }) => {
	const { handleIncreaseCartItemQty, handleDecreaseCartItemQty } = useCart()
	return (
		<ButtonGroup size='small' sx={{ height: '25px', opacity: item.price > 0 ? 1 : 0 }} disableElevation>
			<Button
				variant='contained'
				aria-label='reduce'
				onClick={() => handleDecreaseCartItemQty(item.id)}
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
				{item.qty}
			</Button>
			<Button
				variant='contained'
				aria-label='increase'
				onClick={() => handleIncreaseCartItemQty(item.id)}
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
