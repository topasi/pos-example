import React, { useState } from 'react'
import { truncate } from 'lodash'
import { Card, CardMedia, CardContent, Stack, Typography, Box } from '@mui/material'
import CheckCircle from '@mui/icons-material/CheckCircle'

import useCart from '../hooks/useCart'
import CurrencyTypographyComponent from './currency-typography.component'
import MenuOptionComponent from './menu-option.component'
import placeholder from '../assets/placeholder.jpg'

const MenuItemComponent = ({ item, selected }) => {
	const { cart, handleCreateCartItem } = useCart()
	const [open, setOpen] = useState(false)
	const handleClick = (item) => {
		if (item?.sizes?.length > 1 || item?.sideDishes?.length) {
			setOpen(true)
		} else {
			handleCreateCartItem(item)
		}
	}
	return (
		<>
			{(item?.sizes?.length > 1 || item?.sideDishes?.length) > 0 && <MenuOptionComponent cart={cart} menu={item} open={open} onClose={() => setOpen(false)} handleCreateCartItem={handleCreateCartItem} />}
			<Card
				elevation={0}
				onClick={() => handleClick(item)}
				sx={{
					position: 'relative',
					height: '235px',
					borderRadius: '1rem',
					cursor: 'pointer',
					backgroundColor: 'primary.main',
				}}
			>
				{selected && (
					<Box
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'rgba(0,0,0,.15)',
						}}
					>
						<Box
							sx={{
								width: '40px',
								height: '40px',
								backgroundColor: 'background.default',
								borderRadius: '50%',
							}}
						>
							{selected.qty > 1 ? (
								<Box
									sx={{
										position: 'relative',
										top: '3px',
										left: '3px',
										width: '34px',
										height: '34px',
										backgroundColor: 'primary.main',
										borderRadius: '50%',
										fontSize: '20px',
										lineHeight: '34px',
										textAlign: 'center',
										color: 'background.default',
									}}
								>
									{selected.qty}
								</Box>
							) : (
								<CheckCircle
									sx={{
										fontSize: '40px',
										color: 'primary.main',
									}}
								/>
							)}
						</Box>
					</Box>
				)}
				<CardMedia component='img' height='150' image={item.image || placeholder} alt={item.name} />
				<CardContent>
					<Stack spacing={2} direction='row'>
						<Typography gutterBottom variant='body1' component='div' flexGrow={1} height='50px' sx={{ color: 'background.default' }}>
							{truncate(item.name, { length: 40 })}
						</Typography>
						<Box display='flex' alignItems='flex-end' flexDirection='column'>
							<CurrencyTypographyComponent variant='h6' value={item.price} sx={{ color: 'background.default' }} />
							<Typography variant='body2' fontSize='12px' sx={{ color: 'background.default' }}>
								Servings: {item.stocks - (cart.items.find((cartItem) => cartItem.id === item.id) ? cart.items.find((cartItem) => cartItem.id === item.id).qty : 0)}
							</Typography>
						</Box>
					</Stack>
				</CardContent>
			</Card>
		</>
	)
}

export default MenuItemComponent
