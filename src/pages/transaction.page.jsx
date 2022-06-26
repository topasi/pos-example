import React, { useState } from 'react'
import { styled, Grid, Paper, Box, Tabs } from '@mui/material'
import MuiTab from '@mui/material/Tab'

import useCategories from '../hooks/useCategories'
import useMenu from '../hooks/useMenu'
import useDiscounts from '../hooks/useDiscounts'
import useCart from '../hooks/useCart'
import LayoutComponent from '../components/layout.component'
import MenuItemComponent from '../components/menu-item.component'
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
	const { categories } = useCategories()
	const { discounts } = useDiscounts()
	const { menu } = useMenu()
	const { cart } = useCart()
	const [tabValue, setTabValue] = useState(0)
	const handleTabChange = (_, newValue) => {
		setTabValue(newValue)
	}
	return (
		<LayoutComponent>
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
												<MenuItemComponent item={item} selected={cart.items.find((cartItem) => cartItem.id === item.id)} />
											</Grid>
										))}
										{discounts.map((discount) => (
											<Grid item xs={12} sm={6} md={4} xl={3} key={discount.id}>
												<DiscountComponent discount={discount} selected={cart.discounts.find((cartDiscount) => cartDiscount.id === discount.id)} />
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
												<DiscountComponent discount={discount} selected={cart.discounts.find((cartDiscount) => cartDiscount.id === discount.id)} />
											</Grid>
										))}
									</Grid>
								) : (
									<AlertComponent severity='info'>There's no items available.</AlertComponent>
								)}
							</TabPanel>
							{categories.map((category, key) => (
								<TabPanel value={tabValue} index={key + 2} key={category.id}>
									{menu.filter((item) => item.categories.map((category) => category.id).indexOf(category.id) > -1).length > 0 ? (
										<Grid container spacing={3}>
											{menu
												.filter((item) => item.categories.map((category) => category.id).indexOf(category.id) > -1)
												.map((item) => (
													<Grid item xs={12} sm={6} md={4} xl={3} key={item.id}>
														<MenuItemComponent item={item} selected={cart.items.find((cartItem) => cartItem.id === item.id)} />
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
					<CartComponent />
				</Grid>
			</Grid>
		</LayoutComponent>
	)
}

export default TransactionPage
