import React, { useState, useCallback } from 'react'
import { truncate } from 'lodash'
import { styled, Grid, Paper, Box, Tabs } from '@mui/material'
import MuiTab from '@mui/material/Tab'

import { categories, menu, discounts } from '../data'
import { config } from '../config'
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
	const [openAddDiscounts, setOpenAddDiscounts] = useState(false)
	const [openAddToCart, setOpenAddToCart] = useState(false)
	const [openDeleteItemFromcart, setOpenDeleteFromCart] = useState(false)
	const [menuOption, setMenuOption] = useState({})
	const [cart, setCart] = useLocalStorage('cart', {
		items: [],
		discounts: [],
		count: 0,
		subtotal: 0,
		vat: config.vat,
		vatPrice: 0,
		discountPercent: 0,
		discountPrice: 0,
		serviceCharge: config.serviceCharge,
		total: 0,
	})
	const handleTabChange = (_, newValue) => {
		setTabValue(newValue)
	}
	const handleAddToCart = useCallback(
		(cart) => {
			setCart(cart)
			setOpenAddToCart(true)
			setOpenMenuOption(false)
		},
		[setCart]
	)
	const handleCartUpdate = useCallback(
		(item, sizeIndex = -1, checkedMenuOption = []) => {
			if (cart.items.find((cartItem) => cartItem.id === item.id)) {
				const cartItems = cart.items.map((cartItem) => {
					const isMatched = cartItem.id === item.id || checkedMenuOption.indexOf(cartItem.id) > -1
					const isAvailable = cartItem.qty < cartItem.stocks
					const isOutOfStock = cartItem.qty === cartItem.stocks
					const isSizeChange = sizeIndex > -1 && cartItem.size !== item.sizes[sizeIndex]
					if (isMatched && isOutOfStock) {
						setOpenOutofStock(true)
					}
					if (isMatched && isSizeChange) {
						cartItem.size = item.sizes[sizeIndex]
					}
					if (isMatched && isAvailable && !isSizeChange) {
						cartItem.qty = item.qty ? item.qty : cartItem.qty + 1
					}
					return cartItem
				})
				const cartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.qty, 0)
				const cartSubtotal = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.price * cartItem.qty, 0)
				const cartDiscounts = cart.discounts
				const vat = (100 + cart.vat) / 100
				const cartVatPrice = cartDiscounts.find((cartDiscount) => cartDiscount.isTaxExempted === true) ? cartSubtotal / vat - cartSubtotal : cartSubtotal - cartSubtotal / vat
				const cartDiscountPercent = cartDiscounts.reduce((accumulator, cartDiscount) => accumulator + cartDiscount.percentage, 0)
				const cartDiscountPrice = (cartSubtotal / vat) * (cartDiscountPercent / 100) * -1
				const cartTotal = cartSubtotal + (cartVatPrice + cartDiscountPrice + cart.serviceCharge)
				const data = {
					...cart,
					items: cartItems,
					count: cartCount,
					subtotal: cartSubtotal,
					vatPrice: cartVatPrice,
					discountPercent: cartDiscountPercent,
					discountPrice: cartDiscountPrice,
					total: cartTotal,
				}
				handleAddToCart(data)
			} else {
				const cartItems = cart.items.concat(
					menu
						.filter((cartItem) => {
							return cartItem.id === item.id || checkedMenuOption.indexOf(cartItem.id) > -1
						})
						.map((cartItem) => {
							const categoryNames = categories
								.filter((category) => cartItem.categories.indexOf(category.id) > -1)
								.map((category) => category.name)
								.join(', ')
							const size = cartItem.sizes[sizeIndex > -1 ? sizeIndex : 0]
							return {
								id: cartItem.id,
								name: truncate(cartItem.name, 30),
								price: cartItem.price,
								stocks: cartItem.stocks,
								qty: 1,
								size,
								categories: truncate(categoryNames, 30),
							}
						})
				)
				const cartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.qty, 0)
				const cartSubtotal = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.price * cartItem.qty, 0)
				const cartDiscounts = cart.discounts
				const vat = (100 + cart.vat) / 100
				const cartVatPrice = cartDiscounts.find((cartDiscount) => cartDiscount.isTaxExempted === true) ? cartSubtotal / vat - cartSubtotal : cartSubtotal - cartSubtotal / vat
				const cartDiscountPercent = cartDiscounts.reduce((accumulator, cartDiscount) => accumulator + cartDiscount.percentage, 0)
				const cartDiscountPrice = (cartSubtotal / vat) * (cartDiscountPercent / 100) * -1
				const cartTotal = cartSubtotal + (cartVatPrice + cartDiscountPrice + cart.serviceCharge)
				const data = {
					...cart,
					items: cartItems,
					count: cartCount,
					subtotal: cartSubtotal,
					vatPrice: cartVatPrice,
					discountPercent: cartDiscountPercent,
					discountPrice: cartDiscountPrice,
					total: cartTotal,
				}
				handleAddToCart(data)
			}
		},
		[cart, setOpenOutofStock, handleAddToCart]
	)
	const handleMenuClick = (item) => {
		if (item.sizes.length > 1 || item.sideDishes.length > 0) {
			setMenuOption(item)
			setOpenMenuOption(true)
		} else {
			handleCartUpdate(item)
		}
	}
	const handleAddDiscount = useCallback(
		(cart, discount) => {
			if (cart.items.length > 0) {
				const discountItem = cart.discounts.find((cartDiscount) => cartDiscount.id === discount.id)
				if (discountItem) {
					const cartDiscounts = cart.discounts.filter((cartDiscount) => cartDiscount.id !== discountItem.id)
					const vat = (100 + cart.vat) / 100
					const cartVatPrice = cartDiscounts.find((cartDiscount) => cartDiscount.isTaxExempted === true) ? cart.subtotal / vat - cart.subtotal : cart.subtotal - cart.subtotal / vat
					const cartDiscountPercent = cartDiscounts.reduce((accumulator, cartDiscount) => accumulator + cartDiscount.percentage, 0)
					const cartDiscountPrice = (cart.subtotal / vat) * (cartDiscountPercent / 100) * -1
					const cartTotal = cart.subtotal + (cartVatPrice + cartDiscountPrice + cart.serviceCharge)
					const data = {
						...cart,
						discounts: cartDiscounts,
						vatPrice: cartVatPrice,
						discountPercent: cartDiscountPercent,
						discountPrice: cartDiscountPrice,
						total: cartTotal,
					}
					handleAddToCart(data)
				} else {
					const cartDiscounts = cart.discounts.concat(discount)
					const vat = (100 + cart.vat) / 100
					const cartVatPrice = cartDiscounts.find((cartDiscount) => cartDiscount.isTaxExempted === true) ? cart.subtotal / vat - cart.subtotal : cart.subtotal - cart.subtotal / vat
					const cartDiscountPercent = cartDiscounts.reduce((accumulator, cartDiscount) => accumulator + cartDiscount.percentage, 0)
					const cartDiscountPrice = (cart.subtotal / vat) * (cartDiscountPercent / 100) * -1
					const cartTotal = cart.subtotal + (cartVatPrice + cartDiscountPrice + cart.serviceCharge)
					const data = {
						...cart,
						discounts: cartDiscounts,
						vatPrice: cartVatPrice,
						discountPercent: cartDiscountPercent,
						discountPrice: cartDiscountPrice,
						total: cartTotal,
					}
					handleAddToCart(data)
				}
			} else {
				setOpenAddDiscounts(true)
			}
		},
		[handleAddToCart]
	)
	const handleDeleteItemFromCart = useCallback(
		(cart, item) => {
			const cartItems = cart.items.filter((cartItem) => cartItem.id !== item.id)
			const data = {
				...cart,
				items: cartItems,
			}
			handleAddToCart(data)
			setOpenDeleteFromCart(true)
		},
		[handleAddToCart]
	)
	const handleOutOfStockClose = () => {
		setOpenOutofStock(false)
	}
	const handleAddDiscountClose = () => {
		setOpenAddDiscounts(false)
	}
	const handleAddToCartClose = () => {
		setOpenAddToCart(false)
	}
	const handleDeleteItemFromCartClose = () => {
		setOpenDeleteFromCart(false)
	}
	return (
		<LayoutComponent>
			<SnackbarComponent open={openOutofStock} onClose={handleOutOfStockClose} severity='warning'>
				Out of Stock
			</SnackbarComponent>
			<SnackbarComponent open={openAddDiscounts} onClose={handleAddDiscountClose} severity='warning'>
				0 menu orders
			</SnackbarComponent>
			<SnackbarComponent open={openDeleteItemFromcart} onClose={handleDeleteItemFromCartClose} severity='warning'>
				Successfully deleted from cart
			</SnackbarComponent>
			<SnackbarComponent open={openAddToCart} onClose={handleAddToCartClose} severity='success'>
				Successfully added to Cart
			</SnackbarComponent>
			<MenuOptionComponent menuOption={menuOption} openMenuOption={openMenuOption} closeMenuOption={() => setOpenMenuOption(false)} handleCartUpdate={handleCartUpdate} />
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
											<Grid item xs={12} sm={6} md={4} xl={3} key={item.id}>
												<MenuItemComponent item={item} selected={cart.items.find((cartItem) => cartItem.id === item.id)} handleMenuClick={handleMenuClick} />
											</Grid>
										))}
										{discounts.map((discount) => (
											<Grid item xs={12} sm={6} md={4} xl={3} key={discount.id}>
												<DiscountComponent cart={cart} discount={discount} selected={cart.discounts.find((cartDiscount) => cartDiscount.id === discount.id)} handleAddDiscount={handleAddDiscount} />
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
											<Grid item xs={12} sm={6} md={4} xl={3} key={discount.id}>
												<DiscountComponent cart={cart} discount={discount} selected={cart.discounts.find((cartDiscount) => cartDiscount.id === discount.id)} handleAddDiscount={handleAddDiscount} />
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
													<Grid item xs={12} sm={6} md={4} xl={3} key={item.id}>
														<MenuItemComponent item={item} selected={cart.items.find((cartItem) => cartItem.id === item.id)} handleMenuClick={handleMenuClick} />
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
				<Grid item xs={12} lg={4} xl={3}>
					<CartComponent cart={cart} handleCartUpdate={handleCartUpdate} handleDeleteItemFromCart={handleDeleteItemFromCart} />
				</Grid>
			</Grid>
		</LayoutComponent>
	)
}

export default TransactionPage
