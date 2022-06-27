import React, { useState } from 'react'
import { truncate, upperFirst } from 'lodash'
import { styled, colors, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Checkbox, Stack, Button, Divider, FormControlLabel, Chip, Radio, FormGroup, FormControl, InputLabel } from '@mui/material'

import useMenu from '../hooks/useMenu'
import useCart from '../hooks/useCart'
import ModalComponent from './modal.component'
import CurrencyTypographyComponent from './currency-typography.component'

const FormControlChip = styled(FormControl)(({ theme }) => ({
	'& .MuiFormControlLabel-root': {
		margin: '10px 10px 0 0',
	},
	'& .MuiRadio-root': {
		display: 'none',
	},
	'& .MuiChip-root': {
		cursor: 'pointer',
	},
	'& .MuiRadio-root.Mui-checked ~ .MuiTypography-root .MuiChip-root': {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.background.default,
	},
}))

const MenuOptionComponent = ({ menu, open, onClose }) => {
	const { menu: allMenu } = useMenu()
	const { cart, handleCreateCartItem } = useCart()
	const [sizes, setSizes] = useState([])
	const [sideDishes, setSideDishes] = useState([])
	const handleToggle = (id) => () => {
		const sideDish = sideDishes.find((sideDish) => sideDish.id === id)
		if (sideDish) {
			const data = sideDishes.filter((dish) => dish.id !== sideDish.id)
			setSideDishes([...data])
		} else {
			const data = menu.sideDishes.find((sideDish) => sideDish.id === id)
			setSideDishes((prev) => [...prev, data])
		}
	}
	const handleFilter = (sideDish) => {
		return allMenu.find((item) => {
			const cartItem = cart.items.find((item) => item.id === sideDish.id)
			return item.id === sideDish.id && item.stocks - (cartItem?.qty || 0) > 0
		})
	}
	return (
		<ModalComponent open={open} onClose={onClose}>
			<Typography variant='h5' marginBottom='2rem' color={colors.grey[700]}>
				Add To Cart
			</Typography>
			<Stack spacing={2}>
				<FormGroup>
					<InputLabel htmlFor='stocks' sx={{ marginBottom: '.25rem' }}>
						Sizes *
					</InputLabel>
					{menu.sizes.length > 0 && (
						<FormControlChip variant='standard'>
							<Stack spacing={0} direction='row' flexWrap='wrap'>
								{menu.sizes.map((menuSize) => (
									<FormControlLabel
										key={menuSize}
										control={
											<Radio
												checked={sizes.includes(menuSize)}
												name='size'
												value={menuSize}
												onChange={() => {
													setSizes([menuSize])
												}}
											/>
										}
										label={<Chip label={upperFirst(menuSize)} sx={{ color: colors.grey[700] }} />}
									/>
								))}
							</Stack>
						</FormControlChip>
					)}
				</FormGroup>
			</Stack>
			<Divider sx={{ margin: '1.5rem 0' }} />
			{menu.sideDishes?.filter(handleFilter).length > 0 && (
				<Stack spacing={2}>
					<FormGroup>
						<InputLabel htmlFor='stocks' sx={{ marginBottom: '.5rem' }}>
							Side Dishes
						</InputLabel>
						<List
							sx={{
								width: '100%',
								maxHeight: '300px',
								overflowX: 'hidden',
								backgroundColor: 'background.default',
							}}
							disablePadding
						>
							{menu.sideDishes?.filter(handleFilter).map((sideDish) => (
								<ListItem
									key={sideDish.id}
									dense
									alignItems='flex-start'
									secondaryAction={
										<Stack spacing={1} direction='row' alignItems='center'>
											<CurrencyTypographyComponent value={sideDish.price} />
											<Checkbox
												edge='end'
												checked={sideDishes.find((dish) => dish.id === sideDish.id) ? true : false}
												onChange={handleToggle(sideDish.id)}
												inputProps={{
													'aria-labelledby': `checkbox-menu-${sideDish.id}`,
												}}
												sx={{
													'& .MuiSvgIcon-root': { fontSize: 28 },
												}}
											/>
										</Stack>
									}
									sx={{
										'& .MuiListItemSecondaryAction-root': {
											right: '-.5rem',
										},
									}}
									disablePadding
								>
									<ListItemAvatar>
										<Avatar alt={sideDish.name} src={sideDish.image} />
									</ListItemAvatar>
									<ListItemText id={`checkbox-list-secondary-label-${sideDish.id}`} primary={`${truncate(sideDish.name, 30)} ${sideDish.stocks}`} secondary={truncate(sideDish.description, 30)} />
								</ListItem>
							))}
						</List>
					</FormGroup>
				</Stack>
			)}
			<Stack spacing={1} marginTop={4}>
				<Button
					variant='contained'
					color='primary'
					size='large'
					fullWidth
					disableRipple
					disableElevation
					disabled={sizes.length === 0}
					sx={{
						minHeight: '50px',
						borderRadius: '.5rem',
						color: 'background.default',
					}}
					onClick={() => {
						handleCreateCartItem(menu, sizes, sideDishes)
						onClose()
					}}
				>
					Apply
				</Button>
				<Button
					variant='outlined'
					color='primary'
					size='large'
					fullWidth
					disableRipple
					disableElevation
					sx={{
						minHeight: '50px',
						borderRadius: '.5rem',
					}}
					onClick={onClose}
				>
					Cancel
				</Button>
			</Stack>
		</ModalComponent>
	)
}

export default MenuOptionComponent
