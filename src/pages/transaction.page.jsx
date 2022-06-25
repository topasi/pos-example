import React, { useState, useCallback, useMemo } from 'react'
import { styled, Grid, Paper, Box, Tabs } from '@mui/material'
import MuiTab from '@mui/material/Tab'

import useSettings from '../hooks/useSettings'
import useCategories from '../hooks/useCategories'
import useMenu from '../hooks/useMenu'
import useDiscounts from '../hooks/useDiscounts'
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
	const { settings } = useSettings()
	const { categories } = useCategories()
	const { discounts } = useDiscounts()
	const { menu } = useMenu()
	const [tabValue, setTabValue] = useState(0)
	const [snackbar, setSnackbar] = useState({
		open: false,
		severity: 'info',
		message: '',
	})
	const [openMenuOption, setOpenMenuOption] = useState(false)
	const [menuOption, setMenuOption] = useState({})
	const initialValues = useMemo(
		() => ({
			items: [],
			discounts: [],
			count: 0,
			subtotal: 0,
			vat: 0,
			vatPrice: 0,
			discountPercent: 0,
			discountPrice: 0,
			serviceCharge: 0,
			total: 0,
		}),
		[]
	)
	const [cart, setCart] = useLocalStorage('cart', initialValues)
	const handleTabChange = (_, newValue) => {
		setTabValue(newValue)
	}
	const handleSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }))
	}
	const handleAddToCart = useCallback(
		(cart) => {
			setCart(cart)
			setOpenMenuOption(false)
		},
		[setCart]
	)
	const handleCartUpdate = useCallback(
		(item, sizeIndex = -1, checkedMenuOption = []) => {
			const vat = parseInt(settings.vat)
			const vatDivisor = (100 + vat) / 100
			const serviceCharge = parseFloat(settings.serviceCharge)
			if (cart.items.find((cartItem) => cartItem.id === item.id)) {
				const cartItems = cart.items.map((cartItem) => {
					const isMatched = cartItem.id === item.id || checkedMenuOption.indexOf(cartItem.id) > -1
					const isAvailable = cartItem.qty < parseInt(cartItem.stocks)
					const isOutOfStock = cartItem.qty === parseInt(cartItem.stocks)
					const isSizeChange = sizeIndex > -1 && cartItem.size !== item.sizes[sizeIndex]
					if (isMatched && isOutOfStock) {
						setSnackbar({
							open: true,
							severity: 'warning',
							message: 'Menu is out of stock',
						})
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
				const cartSubtotal = cartItems.reduce((accumulator, cartItem) => accumulator + parseFloat(cartItem.price) * cartItem.qty, 0)
				const cartDiscounts = cart.discounts
				const cartVatPrice = cartDiscounts.find((cartDiscount) => cartDiscount.isTaxExempted === true) ? cartSubtotal / vatDivisor - cartSubtotal : cartSubtotal - cartSubtotal / vatDivisor
				const cartDiscountPercent = cartDiscounts.reduce((accumulator, cartDiscount) => accumulator + parseInt(cartDiscount.percentage), 0)
				const cartDiscountPrice = (cartSubtotal / vatDivisor) * (cartDiscountPercent / 100) * -1
				const cartTotal = cartSubtotal + (cartVatPrice + cartDiscountPrice + serviceCharge)
				const data = {
					...cart,
					items: cartItems,
					count: cartCount,
					subtotal: cartSubtotal,
					vat,
					vatPrice: cartVatPrice,
					discountPercent: cartDiscountPercent,
					discountPrice: cartDiscountPrice,
					serviceCharge,
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
							const categoryNames = cartItem.categories.map((category) => category.name).join(', ')
							const size = cartItem.sizes[sizeIndex > -1 ? sizeIndex : 0]
							return {
								id: cartItem.id,
								name: cartItem.name,
								price: parseFloat(cartItem.price),
								stocks: parseInt(cartItem.stocks),
								qty: 1,
								size,
								categories: categoryNames,
							}
						})
				)
				const cartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.qty, 0)
				const cartSubtotal = cartItems.reduce((accumulator, cartItem) => accumulator + parseFloat(cartItem.price) * cartItem.qty, 0)
				const cartDiscounts = cart.discounts
				const cartVatPrice = cartDiscounts.find((cartDiscount) => cartDiscount.isTaxExempted === true) ? cartSubtotal / vatDivisor - cartSubtotal : cartSubtotal - cartSubtotal / vatDivisor
				const cartDiscountPercent = cartDiscounts.reduce((accumulator, cartDiscount) => accumulator + parseInt(cartDiscount.percentage), 0)
				const cartDiscountPrice = (cartSubtotal / vatDivisor) * (cartDiscountPercent / 100) * -1
				const cartTotal = cartSubtotal + (cartVatPrice + cartDiscountPrice + serviceCharge)
				const data = {
					...cart,
					items: cartItems,
					count: cartCount,
					subtotal: cartSubtotal,
					vat,
					vatPrice: cartVatPrice,
					discountPercent: cartDiscountPercent,
					discountPrice: cartDiscountPrice,
					serviceCharge,
					total: cartTotal,
				}
				handleAddToCart(data)
			}
		},
		[cart, menu, handleAddToCart, settings]
	)
	const handleMenuClick = (item) => {
		if (item?.sizes?.length > 1 || item?.sideDishes?.length > 0) {
			setMenuOption(item)
			setOpenMenuOption(true)
		} else {
			handleCartUpdate(item)
		}
	}
	const handleAddDiscount = useCallback(
		(cart, discount) => {
			const vat = parseInt(settings.vat)
			const vatDivisor = (100 + vat) / 100
			const serviceCharge = parseFloat(settings.serviceCharge)
			if (cart.items.length > 0) {
				const discountItem = cart.discounts.find((cartDiscount) => cartDiscount.id === discount.id)
				if (discountItem) {
					const cartDiscounts = cart.discounts.filter((cartDiscount) => cartDiscount.id !== discountItem.id)
					const cartVatPrice = cartDiscounts.find((cartDiscount) => cartDiscount.isTaxExempted === true) ? cart.subtotal / vatDivisor - cart.subtotal : cart.subtotal - cart.subtotal / vatDivisor
					const cartDiscountPercent = cartDiscounts.reduce((accumulator, cartDiscount) => accumulator + parseInt(cartDiscount.percentage), 0)
					const cartDiscountPrice = (cart.subtotal / vatDivisor) * (cartDiscountPercent / 100) * -1
					const cartTotal = cart.subtotal + (cartVatPrice + cartDiscountPrice + serviceCharge)
					const data = {
						...cart,
						discounts: cartDiscounts,
						vat,
						vatPrice: cartVatPrice,
						discountPercent: cartDiscountPercent,
						discountPrice: cartDiscountPrice,
						serviceCharge,
						total: cartTotal,
					}
					handleAddToCart(data)
				} else {
					const cartDiscounts = cart.discounts.concat(discount)
					const cartVatPrice = cartDiscounts.find((cartDiscount) => cartDiscount.isTaxExempted === true) ? cart.subtotal / vatDivisor - cart.subtotal : cart.subtotal - cart.subtotal / vatDivisor
					const cartDiscountPercent = cartDiscounts.reduce((accumulator, cartDiscount) => accumulator + parseInt(cartDiscount.percentage), 0)
					const cartDiscountPrice = (cart.subtotal / vatDivisor) * (cartDiscountPercent / 100) * -1
					const cartTotal = cart.subtotal + (cartVatPrice + cartDiscountPrice + serviceCharge)
					const data = {
						...cart,
						discounts: cartDiscounts,
						vat,
						vatPrice: cartVatPrice,
						discountPercent: cartDiscountPercent,
						discountPrice: cartDiscountPrice,
						serviceCharge,
						total: cartTotal,
					}
					handleAddToCart(data)
				}
			} else {
				setSnackbar({
					open: true,
					severity: 'warning',
					message: 'Cart is empty',
				})
			}
		},
		[handleAddToCart, settings]
	)
	const handleDeleteItemFromCart = useCallback(
		(cart, item) => {
			const cartItems = cart.items.filter((cartItem) => cartItem.id !== item.id)
			const data = {
				...cart,
				items: cartItems,
			}
			handleAddToCart(data)
		},
		[handleAddToCart]
	)
	const handleResetCart = useCallback(() => {
		setCart(initialValues)
	}, [setCart, initialValues])
	return (
		<LayoutComponent>
			<SnackbarComponent open={snackbar.open} onClose={handleSnackbar} severity={snackbar.severity}>
				{snackbar.message}
			</SnackbarComponent>
			<MenuOptionComponent menuOption={menuOption} openMenuOption={openMenuOption} closeMenuOption={() => setOpenMenuOption(false)} handleCartUpdate={handleCartUpdate} />
			<Grid container spacing={3}>
				<Grid item xs={12} lg={8} xl={9} alignItems='stretch'>
					<Paper elevation={0} sx={{ height: '100%', borderRadius: '1rem' }}>
						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<Tabs value={tabValue} variant='scrollable' scrollButtons='auto' onChange={handleTabChange} aria-label='menu tabs' sx={{ maxWidth: '75vw' }}>
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
					<CartComponent cart={cart} setSnackbar={setSnackbar} handleCartUpdate={handleCartUpdate} handleDeleteItemFromCart={handleDeleteItemFromCart} handleResetCart={handleResetCart} />
				</Grid>
			</Grid>
		</LayoutComponent>
	)
}

export default TransactionPage
