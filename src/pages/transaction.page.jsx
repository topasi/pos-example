import React, { useState, useCallback } from 'react'
import { truncate } from 'lodash'
import { styled, Grid, Paper, Box, Tabs } from '@mui/material'
import MuiTab from '@mui/material/Tab'

import { categories, menu, discounts } from '../data'
import useLocalStorage from '../hooks/useLocalStorage'
import LayoutComponent from '../components/layout.component'
import MenuItemComponent from '../components/menu-item.component'
import DiscountComponent from '../components/discount.component'
import AlertComponent from '../components/alert.component'
import CartComponent from '../components/cart.component'
import MenuOptionComponent from '../components/menu-option.component'
import SnackbarComponent from '../components/snackbar.component'

const Tab = styled(MuiTab)(() => ({
	padding: '2rem',
	'&.Mui-selected': {
		fontWeight: '700',
	},
}))

const TabPanel = (props) => {
	const { children, value, index, ...other } = props
	return (
		<div role='tabpanel' hidden={value !== index} id={`menu-tabpanel-${index}`} aria-labelledby={`menu-tab-${index}`} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

const a11yProps = (index) => {
	return {
		id: `menu-tab-${index}`,
		'aria-controls': `menu-tabpanel-${index}`,
	}
}

const TransactionPage = () => {
	const [tabValue, setTabValue] = useState(0)
	const [openMenuOption, setOpenMenuOption] = useState(false)
	const [openOutofStock, setOpenOutofStock] = useState(false)
	const [openAddToCart, setOpenAddToCart] = useState(false)
	const [menuOption, setMenuOption] = useState({})
	const [cartItems, setCartItems] = useLocalStorage('cartItems', [])
	const handleTabChange = (_, newValue) => {
		setTabValue(newValue)
	}
	const handleAddToCart = useCallback(
		(items) => {
			setCartItems(items)
			console.log(items)
			setOpenAddToCart(true)
			setOpenMenuOption(false)
		},
		[setCartItems]
	)
	const handleCartUpdate = useCallback(
		(item) => {
			if (cartItems.find((cartItem) => cartItem.id === item.id)) {
				const data = cartItems.map((cartItem) => {
					if (cartItem.qty === cartItem.stocks) {
						setOpenOutofStock(true)
					}
					if (cartItem.id === item.id && cartItem.qty < cartItem.stocks) {
						cartItem.qty = item.qty
						cartItem.price = item.price
					}
					return cartItem
				})
				handleAddToCart(data)
			} else {
				const categoryNames = categories
					.filter((category) => item.categories.indexOf(category.id) > -1)
					.map((category) => category.name)
					.join(', ')
				const data = [
					...cartItems,
					{
						id: item.id,
						name: truncate(item.name, 30),
						price: item.price,
						stocks: item.stocks,
						qty: 1,
						size: item.sizes[0],
						categories: truncate(categoryNames, 30),
					},
				]
				handleAddToCart(data)
			}
		},
		[cartItems, setOpenOutofStock, handleAddToCart]
	)
	const handleMenuClick = (item) => {
		if (item.sizes.length > 1 || item.sideDishes.length > 0) {
			setMenuOption(item)
			setOpenMenuOption(true)
		} else {
			handleCartUpdate(item)
		}
	}
	const handleOutOfStockClose = () => {
		setOpenOutofStock(false)
	}
	const handleAddToCartClose = () => {
		setOpenAddToCart(false)
	}
	return (
		<LayoutComponent>
			<SnackbarComponent open={openOutofStock} onClose={handleOutOfStockClose} severity='warning'>
				Out of Stock
			</SnackbarComponent>
			<SnackbarComponent open={openAddToCart} onClose={handleAddToCartClose} severity='success'>
				Added to Cart
			</SnackbarComponent>
			<MenuOptionComponent menuOption={menuOption} openMenuOption={openMenuOption} closeMenuOption={() => setOpenMenuOption(false)} handleAddToCart={handleAddToCart} cartItems={cartItems} setOpenOutofStock={setOpenOutofStock} />
			<Grid container spacing={3}>
				<Grid item xs={12} lg={8} xl={9} alignItems='stretch'>
					<Paper elevation={0} sx={{ height: '100%', borderRadius: '1rem' }}>
						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<Tabs value={tabValue} variant='scrollable' scrollButtons='auto' onChange={handleTabChange} aria-label='menu tabs'>
									<Tab label='All' {...a11yProps(0)} />
									<Tab label='Discounts' {...a11yProps(1)} />
									{categories.map((category, key) => (
										<Tab label={category.name} {...a11yProps(key + 2)} key={category.id} />
									))}
								</Tabs>
							</Box>
							<TabPanel value={tabValue} index={0}>
								{menu.length > 0 || discounts.length > 0 ? (
									<Grid container spacing={3}>
										{menu.map((item) => (
											<Grid item xs={4} key={item.id}>
												<MenuItemComponent item={item} selected={cartItems.find((cartItem) => cartItem.id === item.id)} handleMenuClick={handleMenuClick} />
											</Grid>
										))}
										{discounts.map((discount) => (
											<Grid item xs={4} key={discount.id}>
												<DiscountComponent discount={discount} />
											</Grid>
										))}
									</Grid>
								) : (
									<AlertComponent severity='info'>There's no items available.</AlertComponent>
								)}
							</TabPanel>
							<TabPanel value={tabValue} index={1}>
								{discounts.length > 0 ? (
									<Grid container spacing={3}>
										{discounts.map((discount) => (
											<Grid item xs={4} key={discount.id}>
												<DiscountComponent discount={discount} />
											</Grid>
										))}
									</Grid>
								) : (
									<AlertComponent severity='info'>There's no items available.</AlertComponent>
								)}
							</TabPanel>
							{categories.map((category, key) => (
								<TabPanel value={tabValue} index={key + 2} key={category.id}>
									{menu.filter((item) => item.categories.indexOf(category.id) > -1).length > 0 ? (
										<Grid container spacing={3}>
											{menu
												.filter((item) => item.categories.indexOf(category.id) > -1)
												.map((item) => (
													<Grid item xs={4} key={item.id}>
														<MenuItemComponent item={item} selected={cartItems.find((cartItem) => cartItem.id === item.id)} handleMenuClick={handleMenuClick} />
													</Grid>
												))}
										</Grid>
									) : (
										<AlertComponent severity='info'>There's no items available.</AlertComponent>
									)}
								</TabPanel>
							))}
						</Box>
					</Paper>
				</Grid>
				<Grid item xl={3}>
					<CartComponent items={cartItems} handleCartUpdate={handleCartUpdate} />
				</Grid>
			</Grid>
		</LayoutComponent>
	)
}

export default TransactionPage
