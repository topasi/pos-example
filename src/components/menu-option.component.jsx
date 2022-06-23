import React, { useState, useEffect } from 'react'
import { truncate } from 'lodash'
import { styled, colors, Box, Typography, Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, Checkbox, Stack, Button, Divider } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'

import { menu } from '../data'
import ModalComponent from './modal.component'
import CurrencyTypographyComponent from './currency-typography.component'

const ToggleButton = styled(MuiToggleButton)(({ value, theme }) => ({
	'&.Mui-selected': {
		backgroundColor: `${value === 'small' ? colors.yellow[700] : value === 'upsize' ? colors.red['A400'] : colors.green[500]} !important`,
		color: theme.palette.background.default,
	},
}))

const MenuOptionComponent = ({ menuOption, openMenuOption, closeMenuOption, handleCartUpdate }) => {
	const [sizes, setSizes] = useState([])
	const [sideDishes, setSideDishes] = useState([])
	const [selectedSize, setSelectedSize] = useState([])
	const [checkedMenuOption, setCheckedMenuOption] = useState([])
	const handleCheckedMenuOptionChange = (value) => {
		const currentIndex = checkedMenuOption.indexOf(value)
		const newChecked = [...checkedMenuOption]
		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}
		setCheckedMenuOption(newChecked)
	}
	useEffect(() => {
		if (menuOption?.sizes) {
			setSizes(menuOption.sizes)
			setSelectedSize(menuOption.sizes.map(() => false))
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
									selected={selectedSize[key]}
									onChange={() => {
										setSelectedSize((prev) => prev.map((item, index) => (index === key ? !item : false)))
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
										<Checkbox
											edge='end'
											onChange={() => {
												handleCheckedMenuOptionChange(sideDish.id)
											}}
											checked={checkedMenuOption.indexOf(sideDish.id) !== -1}
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
					disabled={!selectedSize.find((item) => item === true)}
					disableRipple
					disableElevation
					sx={{
						minHeight: '50px',
						borderRadius: '.5rem',
						color: 'background.default',
					}}
					onClick={() => handleCartUpdate(menuOption, selectedSize.indexOf(true), checkedMenuOption)}
				>
					Apply
				</Button>
			</Stack>
		</ModalComponent>
	)
}

export default MenuOptionComponent
