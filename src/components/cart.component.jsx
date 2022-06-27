import React, { useState } from 'react'
import { truncate } from 'lodash'
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { colors, Paper, Box, List, ListItem, ListItemText, Typography, Stack, Divider, Badge, Collapse, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import useCart from '../hooks/useCart'
import QtyComponent from './qty.component'
import CurrencyTypographyComponent from './currency-typography.component'
import CashComponent from './cash.component'
import AlertComponent from './alert.component'

const CartComponent = () => {
	const { cart, handleCreateOrder, handleDeleteCartItem, handleResetCart, change } = useCart()
	const [disabled, setDisabled] = useState(false)
	const [openOrder, setOpenOrder] = useState(true)
	const [openCash, setOpenCash] = useState(true)
	const handleOrderExpand = () => {
		setOpenOrder(!openOrder)
	}
	const handleCashExpand = () => {
		setOpenCash(!openCash)
	}
	const trailingActions = (cart, item) => (
		<TrailingActions>
			<SwipeAction
				destructive={true}
				onClick={() => {
					handleDeleteCartItem(item.id)
					// need reopen because of ui issue
					setOpenOrder(false)
					setTimeout(() => {
						setOpenOrder(true)
					}, 1000)
				}}
			>
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
			<Stack spacing={3} direction='column' height='100%'>
				<Box flexGrow={1}>
					<List sx={{ padding: '.3rem 0' }}>
						<ListItem>
							<Stack spacing={0} direction='row' alignItems='center' width='100%'>
								<Box flexGrow={1}>
									<Typography
										variant='h6'
										sx={{
											position: 'relative',
											top: '5px',
										}}
									>
										Cart
									</Typography>
									<Typography
										variant='caption'
										sx={{
											color: colors.grey[500],
										}}
									>
										Swipe to left to delete an order
									</Typography>
								</Box>
								<Badge
									badgeContent={cart.count}
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
							<ListItemText
								primary='ORDERS'
								sx={{
									'& .MuiListItemText-primary': {
										fontSize: '.875rem',
										fontWeight: '700',
									},
								}}
							/>
							{openOrder ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						</ListItem>
						<Collapse in={openOrder} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								{cart.items.length > 0 ? (
									cart.items.map((item, key) => (
										<ListItem key={key} sx={{ cursor: 'grab' }}>
											<SwipeableList>
												<SwipeableListItem trailingActions={trailingActions(cart, item)}>
													<Stack spacing={2} direction='row' sx={{ width: '100%' }}>
														<ListItemText
															primary={truncate(item.name, 30)}
															secondary={truncate(
																item.categories?.map((category) => category.name),
																100
															)}
															sx={{ margin: 0 }}
														/>
														<QtyComponent item={item} index={key} />
														<CurrencyTypographyComponent value={item.price * item.qty} sx={{ width: '65px', textAlign: 'right' }} />
													</Stack>
												</SwipeableListItem>
											</SwipeableList>
										</ListItem>
									))
								) : (
									<ListItem>
										<AlertComponent severity='info'>Empty Cart</AlertComponent>
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
								<CurrencyTypographyComponent value={cart.subtotal} fontWeight='700' />
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
								<CurrencyTypographyComponent value={cart.vatPrice} />
							</Stack>
						</ListItem>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body2' flexGrow={1}>
									Discount ({cart.discountPercent}%)
								</Typography>
								<CurrencyTypographyComponent value={cart.discountPrice} />
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
								<CurrencyTypographyComponent value={cart.total} variant='body1' fontWeight='700' />
							</Stack>
						</ListItem>
					</List>
				</Box>
				<Box sx={{ paddingBottom: '1rem' }}>
					<List disablePadding>
						<ListItem onClick={handleCashExpand} sx={{ cursor: 'pointer' }}>
							<ListItemText
								primary='PAYMENT'
								sx={{
									'& .MuiListItemText-primary': {
										fontSize: '.875rem',
										fontWeight: '700',
									},
								}}
							/>
							{openOrder ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						</ListItem>
						<Collapse in={openCash} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								<ListItem>
									<CashComponent />
								</ListItem>
							</List>
						</Collapse>
						<ListItem>
							<Paper elevation={0} sx={{ width: '100%', backgroundColor: colors.teal[100], borderRadius: '.5rem' }}>
								<Stack spacing={2} direction='row' alignItems='center' minHeight='50px' sx={{ padding: '.5rem 1rem' }}>
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
										disableElevation
										onClick={() => {
											handleResetCart({
												open: true,
												severity: 'warning',
												message: 'Cart is reset',
											})
										}}
										sx={{
											minHeight: '75px',
											borderRadius: '.35rem',
										}}
									>
										Reset
									</Button>
									<Button
										variant='contained'
										size='large'
										fullWidth
										disableElevation
										disabled={disabled}
										onClick={() => {
											handleCreateOrder(setDisabled)
										}}
										sx={{
											minHeight: '75px',
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
