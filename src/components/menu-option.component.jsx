import React, { useState, useEffect } from 'react'
import { truncate } from 'lodash'
import { styled, colors, Box, Typography, Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, Checkbox, Stack, Button, Divider } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'

import { categories, menu } from '../data'
import ModalComponent from './modal.component'
import CurrencyTypographyComponent from './currency-typography.component'

const ToggleButton = styled(MuiToggleButton)(({ value, theme }) => ({
	'&.Mui-selected': {
		backgroundColor: `${value === 'small' ? colors.yellow[700] : value === 'upsize' ? colors.red['A400'] : colors.green[500]} !important`,
		color: theme.palette.background.default,
	},
}))

const MenuOptionComponent = ({ menuOption, openMenuOption, closeMenuOption, handleAddToCart, cartItems, setOpenOutofStock }) => {
	const [sizes, setSizes] = useState([])
	const [sideDishes, setSideDishes] = useState([])
	const [selected, setSelected] = useState([])
	const [checked, setChecked] = useState([])
	const handleButtonChange = (index) => {
		setSelected((prev) => prev.map((item, key) => (key === index ? !item : false)))
	}
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]
		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}
		setChecked(newChecked)
	}
	const handleApplyClick = () => {
		let index = -1
		selected.map((item, key) => {
			if (item === true) {
				index = key
			}
			return item
		})
		if (cartItems.find((cartItem) => cartItem.id === menuOption.id)) {
			const data = cartItems.map((cartItem) => {
				if (cartItem.qty === cartItem.stocks) {
					setOpenOutofStock(true)
				}
				if (cartItem.size !== menuOption.sizes[index]) {
					cartItem.size = menuOption.sizes[index]
				}
				if (cartItem.id === menuOption.id && cartItem.qty < cartItem.stocks && cartItem.size === menuOption.sizes[index]) {
					cartItem.qty++
				}
				return cartItem
			})
			handleAddToCart(data)
		} else {
			const data = [...cartItems].concat(
				menu
					.filter((item) => {
						return item.id === menuOption.id || checked.indexOf(item.id) > -1
					})
					.map((item) => {
						const categoryNames = categories
							.filter((category) => item.categories.indexOf(category.id) > -1)
							.map((category) => category.name)
							.join(', ')
						return {
							id: item.id,
							name: truncate(item.name, 30),
							price: item.price,
							stocks: item.stocks,
							qty: 1,
							size: menuOption.sizes[index],
							categories: truncate(categoryNames, 30),
						}
					})
			)
			handleAddToCart(data)
		}
	}
	useEffect(() => {
		if (menuOption?.sizes) {
			setSizes(menuOption.sizes)
			setSelected(menuOption.sizes.map(() => false))
		}
		if (menuOption?.sideDishes) {
			setSideDishes(
				menu.filter((item) => {
					return menuOption.sideDishes.indexOf(item.id) > -1
				})
			)
		}
	}, [menuOption])
	return (
		<ModalComponent open={openMenuOption} onClose={closeMenuOption}>
			{sizes.length > 0 && (
				<Box>
					<Typography variant='body2' fontWeight='700' marginBottom='.5rem'>
						AVAILABLE SIZES <span style={{ color: colors.red[500] }}>*</span>
					</Typography>
					<Grid container spacing={2}>
						{sizes.map((size, key) => (
							<Grid item xs={12 / sizes.length} key={key}>
								<ToggleButton
									value={size}
									selected={selected[key]}
									onChange={() => {
										handleButtonChange(key)
									}}
									sx={{
										borderRadius: '.5rem',
									}}
									fullWidth
									disableRipple
								>
									{size}
								</ToggleButton>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
			{sideDishes.length > 0 && (
				<Box paddingTop='1.5rem'>
					<Typography variant='body2' fontWeight='700' marginBottom='.5rem'>
						SIDE DISHES
					</Typography>
					<List sx={{ width: '100%', backgroundColor: 'background.default' }} disablePadding>
						{sideDishes.map((sideDish, key) => (
							<ListItem
								dense
								alignItems='flex-start'
								secondaryAction={
									<Stack spacing={1} direction='row' alignItems='center'>
										<CurrencyTypographyComponent value={sideDish.price} />
										<Checkbox edge='end' onChange={handleToggle(sideDish.id)} checked={checked.indexOf(sideDish.id) !== -1} inputProps={{ 'aria-labelledby': `checkbox-menu-${sideDish.id}` }} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
									</Stack>
								}
								sx={{
									'& .MuiListItemSecondaryAction-root': {
										right: '-.5rem',
									},
								}}
								key={key}
								disablePadding
							>
								<ListItemAvatar>
									<Avatar alt={sideDish.name} src={sideDish.image} />
								</ListItemAvatar>
								<ListItemText primary={truncate(sideDish.name, 30)} secondary={truncate(sideDish.description, 30)} />
							</ListItem>
						))}
					</List>
				</Box>
			)}
			<Divider sx={{ paddingTop: '1.5rem' }} />
			<Stack spacing={2} direction='row' paddingTop='1.5rem'>
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
					onClick={closeMenuOption}
				>
					Cancel
				</Button>
				<Button
					variant='contained'
					color='primary'
					size='large'
					fullWidth
					disabled={!selected.find((item) => item === true)}
					disableRipple
					disableElevation
					sx={{
						minHeight: '50px',
						borderRadius: '.5rem',
						color: 'background.default',
					}}
					onClick={handleApplyClick}
				>
					Apply
				</Button>
			</Stack>
		</ModalComponent>
	)
}

export default MenuOptionComponent
