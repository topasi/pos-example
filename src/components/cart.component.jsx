import React, { useCallback, useEffect, useState, useRef } from 'react'
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { colors, Paper, Box, List, ListItem, ListItemText, Typography, Stack, Divider, Badge, Collapse, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import QtyComponent from './qty.component'
import CurrencyTypographyComponent from './currency-typography.component'
import CashComponent from './cash.component'
import AlertComponent from './alert.component'
import SnackbarComponent from './snackbar.component'

const CartComponent = ({ cart, handleCartUpdate, handleDeleteItemFromCart }) => {
	const [openOrder, setOpenOrder] = useState(true)
	const [openCash, setOpenCash] = useState(true)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartSubtotal, setCartSubTotal] = useState(0)
	const [vatPrice, setvatPrice] = useState(0)
	const [discountPercent, setDiscountPercent] = useState(0)
	const [discountPrice, setDiscountPrice] = useState(0)
	const [total, setTotal] = useState(0)
	const [change, setChange] = useState(0)
	const [openErrorPayment, setOpenErrorPayment] = useState(false)
	const elQty = useRef([])
	const handleOrderExpand = () => {
		setOpenOrder(!openOrder)
	}
	const handleCashExpand = () => {
		setOpenCash(!openCash)
	}
	const handleElQty = useCallback((el) => {
		// push if el is not null and not containing the same el
		if (el && !elQty.current.includes(el)) {
			elQty.current.push(el)
		}
	}, [])
	const handleIncreaseQtyChange = useCallback(
		(item, index) => {
			const value = parseInt(elQty.current[index].innerHTML, 10)
			const qty = Math.min(value + 1, item.stocks)
			elQty.current[index].innerHTML = qty
			item.qty = qty
			handleCartUpdate(item)
		},
		[handleCartUpdate]
	)
	const handleReduceQtyChange = useCallback(
		(item, index) => {
			const value = parseInt(elQty.current[index].innerHTML, 10)
			const qty = Math.max(value - 1, 1)
			elQty.current[index].innerHTML = qty
			item.qty = qty
			handleCartUpdate(item)
		},
		[handleCartUpdate]
	)
	const handleCashPayment = useCallback(
		(total, cash) => {
			setChange(cash - total)
		},
		[setChange]
	)
	const handlePaymentClick = () => {
		if (change > 0) {
			console.log(cart)
		} else {
			setOpenErrorPayment(true)
		}
	}
	const handleErrorPaymentClose = () => {
		setOpenErrorPayment(false)
	}
	useEffect(() => {
		setCartItems(cart.items)
		setCartCount(cart.count)
		setCartSubTotal(cart.subtotal)
		setvatPrice(cart.vatPrice)
		setDiscountPercent(cart.discountPercent)
		setDiscountPrice(cart.discountPrice)
		setTotal(cart.total)
		setChange(0)
	}, [cart])
	const trailingActions = (cart, item) => (
		<TrailingActions>
			<SwipeAction destructive={true} onClick={() => handleDeleteItemFromCart(cart, item)}>
				<Typography
					variant='body2'
					component='div'
					sx={{
						width: '75px',
						minHeight: '45px',
						marginLeft: '1rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: colors.red['A400'],
						color: 'background.default',
					}}
				>
					<DeleteIcon />
				</Typography>
			</SwipeAction>
		</TrailingActions>
	)
	return (
		<Paper elevation={0} sx={{ height: '100%', borderRadius: '1rem' }}>
			<SnackbarComponent open={openErrorPayment} onClose={handleErrorPaymentClose} severity='error'>
				Invalid amount
			</SnackbarComponent>
			<Stack spacing={3} direction='column' height='100%'>
				<Box flexGrow={1}>
					<List sx={{ padding: '1rem 0' }}>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='h6' sx={{ flexGrow: 1 }}>
									Cart
								</Typography>
								<Badge
									badgeContent={cartCount}
									color='primary'
									max={99}
									sx={{
										'& .BaseBadge-badge': {
											color: 'background.default',
										},
									}}
								>
									<ShoppingCartIcon />
								</Badge>
							</Stack>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem onClick={handleOrderExpand} sx={{ cursor: 'pointer' }}>
							<ListItemText primary='Order' />
							{openOrder ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						</ListItem>
						<Collapse in={openOrder} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								{cartItems.length > 0 ? (
									cartItems.map((item, key) => (
										<ListItem key={key}>
											<SwipeableList>
												<SwipeableListItem trailingActions={trailingActions(cart, item)}>
													<Stack spacing={2} direction='row' sx={{ width: '100%' }}>
														<ListItemText primary={item.name} secondary={item.categories} sx={{ margin: 0 }} />
														<QtyComponent item={item} index={key} handleElQty={handleElQty} handleIncreaseQtyChange={handleIncreaseQtyChange} handleReduceQtyChange={handleReduceQtyChange} />
														<CurrencyTypographyComponent value={item.price * item.qty} sx={{ width: '65px', textAlign: 'right' }} />
													</Stack>
												</SwipeableListItem>
											</SwipeableList>
										</ListItem>
									))
								) : (
									<ListItem>
										<AlertComponent severity='info'>0 menu orders</AlertComponent>
									</ListItem>
								)}
							</List>
						</Collapse>
					</List>
					<Divider />
					<List>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body2' fontWeight='700' flexGrow={1}>
									SUBTOTAL
								</Typography>
								<CurrencyTypographyComponent value={cartSubtotal} fontWeight='700' />
							</Stack>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body2' flexGrow={1}>
									VAT ({cart.vat}%)
								</Typography>
								<CurrencyTypographyComponent value={vatPrice} />
							</Stack>
						</ListItem>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body2' flexGrow={1}>
									Discount ({discountPercent}%)
								</Typography>
								<CurrencyTypographyComponent value={discountPrice} />
							</Stack>
						</ListItem>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body2' flexGrow={1}>
									Service Charge
								</Typography>
								<CurrencyTypographyComponent value={cart.serviceCharge} />
							</Stack>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body1' fontWeight='700' flexGrow={1}>
									TOTAL
								</Typography>
								<CurrencyTypographyComponent value={total} variant='body1' fontWeight='700' />
							</Stack>
						</ListItem>
					</List>
				</Box>
				<Box sx={{ paddingBottom: '1rem' }}>
					<List disablePadding>
						<ListItem onClick={handleCashExpand} sx={{ cursor: 'pointer' }}>
							<ListItemText primary='Payment' />
							{openOrder ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						</ListItem>
						<Collapse in={openCash} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								<ListItem>
									<CashComponent cart={cart} total={total} handleCashPayment={handleCashPayment} />
								</ListItem>
							</List>
						</Collapse>
						<ListItem>
							<Paper elevation={0} sx={{ width: '100%', backgroundColor: colors.teal[100], borderRadius: '.5rem' }}>
								<Stack spacing={2} direction='row' sx={{ padding: '.5rem 1rem' }}>
									<Typography variant='body1' fontWeight='700' flexGrow={1} color={colors.teal[500]}>
										CHANGE
									</Typography>
									<CurrencyTypographyComponent value={change} variant='body1' fontWeight='700' color={colors.teal[500]} />
								</Stack>
							</Paper>
						</ListItem>
						<ListItem>
							<Paper elevation={0} sx={{ width: '100%', backgroundColor: 'transparent' }}>
								<Stack spacing={2} direction='row'>
									<Button
										variant='outlined'
										size='large'
										fullWidth
										sx={{
											minHeight: '50px',
											borderRadius: '.35rem',
										}}
									>
										Cancel
									</Button>
									<Button
										variant='contained'
										size='large'
										fullWidth
										onClick={handlePaymentClick}
										sx={{
											minHeight: '50px',
											borderRadius: '.35rem',
											color: 'background.default',
										}}
									>
										Pay
									</Button>
								</Stack>
							</Paper>
						</ListItem>
					</List>
				</Box>
			</Stack>
		</Paper>
	)
}

export default CartComponent
