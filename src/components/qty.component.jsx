import React, { useRef } from 'react'
import { ButtonGroup, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const QtyComponent = ({ item, index }) => {
	const elQty = useRef([])
	const handleIncreaseQtyChange = (index, max) => {
		let qty = parseInt(elQty.current[index].innerHTML, 10)
		elQty.current[index].innerHTML = Math.min(qty + 1, max)
	}
	const handleReduceQtyChange = (index) => {
		let qty = parseInt(elQty.current[index].innerHTML, 10)
		elQty.current[index].innerHTML = Math.max(qty - 1, 1)
	}
	return (
		<ButtonGroup size='small' sx={{ height: '25px' }} disableElevation>
			<Button
				variant='contained'
				aria-label='reduce'
				onClick={() => handleReduceQtyChange(index)}
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
				<span ref={(el) => elQty.current.push(el)}>{item.qty}</span>
			</Button>
			<Button
				variant='contained'
				aria-label='increase'
				onClick={() => handleIncreaseQtyChange(index, item.max)}
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
