import React, { useState, useCallback } from 'react'
import { styled, Grid, Paper, Box, Tabs } from '@mui/material'
import MuiTab from '@mui/material/Tab'

import { categories, menu, discounts } from '../data'
import useLocalStorage from '../hooks/useLocalStorage'
import LayoutComponent from '../components/layout.component'
import MenuComponent from '../components/menu.component'
import DiscountComponent from '../components/discount.component'
import AlertComponent from '../components/alert.component'
import CartComponent from '../components/cart.component'

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
	const [cartItems, setCartItems] = useLocalStorage('cartItems', [])
	const handleTabChange = (_, newValue) => {
		setTabValue(newValue)
	}
	const handleAddToCart = useCallback(
		(item) => {
			const cartMenu = {
				id: item.id,
				sideDish: [],
				qty: 1,
				discount: 0,
				size: 'regular',
			}
			setCartItems((prev) => [...prev, cartMenu])
		},
		[setCartItems]
	)
	return (
		<LayoutComponent>
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
												<MenuComponent item={item} selected={cartItems.find((cartItem) => cartItem.id === item.id)} handleAddToCart={handleAddToCart} />
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
														<MenuComponent item={item} selected={cartItems.find((cartItem) => cartItem.id === item.id)} handleAddToCart={handleAddToCart} />
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
					<CartComponent />
				</Grid>
			</Grid>
		</LayoutComponent>
	)
}

export default TransactionPage
