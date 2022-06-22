import React, { useState } from 'react'
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { colors, Paper, Box, List, ListItem, ListItemText, Typography, Stack, Divider, Badge, Collapse, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { config } from '../config'
import QtyComponent from './qty.component'
import CurrencyTextFieldComponent from './currency-text-field.component'
import CurrencyTypographyComponent from './currency-typography.component'
import CashComponent from './cash.component'
import { truncate } from 'lodash'

const CartComponent = () => {
	const [openOrder, setOpenOrder] = useState(true)
	const [openCash, setOpenCash] = useState(true)
	const [cash, setCash] = useState(0)
	const handleOrderExpand = () => {
		setOpenOrder(!openOrder)
	}
	const handleCashExpand = () => {
		setOpenCash(!openCash)
	}
	const leadingActions = () => (
		<LeadingActions>
			<SwipeAction onClick={() => console.info('swipe action triggered')}>
				<Typography
					variant='body2'
					component='div'
					sx={{
						width: '75px',
						marginRight: '1rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: colors.orange['A400'],
						color: 'background.default',
					}}
				>
					<EditIcon />
				</Typography>
			</SwipeAction>
		</LeadingActions>
	)
	const trailingActions = () => (
		<TrailingActions>
			<SwipeAction destructive={true} onClick={() => console.info('swipe action triggered')}>
				<Typography
					variant='body2'
					component='div'
					sx={{
						width: '75px',
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
					<List sx={{ padding: '1rem 0' }}>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='h6' sx={{ flexGrow: 1 }}>
									Cart
								</Typography>
								<Badge
									badgeContent={4}
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
								{[
									{
										name: 'Bagnet',
										qty: 1,
										max: 5,
										categories: [
											{
												name: 'Breakfast',
											},
											{
												name: 'Dinner',
											},
										],
									},
								].map((item, key) => (
									<ListItem key={key}>
										<SwipeableList>
											<SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
												<Stack spacing={2} direction='row' sx={{ width: '100%' }}>
													<ListItemText primary={truncate(item.name, 20)} secondary={truncate(item.categories.map((category) => category.name).join(', '), 20)} sx={{ margin: 0 }} />
													<QtyComponent item={item} index={key} />
													<CurrencyTypographyComponent value={0} />
												</Stack>
											</SwipeableListItem>
										</SwipeableList>
									</ListItem>
								))}
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
								<CurrencyTypographyComponent value={0} fontWeight='700' />
							</Stack>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body2' flexGrow={1}>
									Discount (20%)
								</Typography>
								<CurrencyTypographyComponent value={0} />
							</Stack>
						</ListItem>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body2' flexGrow={1}>
									VAT (12%)
								</Typography>
								<CurrencyTypographyComponent value={0} />
							</Stack>
						</ListItem>
						<ListItem>
							<Stack spacing={0} direction='row' sx={{ width: '100%' }}>
								<Typography variant='body2' flexGrow={1}>
									Service Charge
								</Typography>
								<CurrencyTypographyComponent value={0} />
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
								<CurrencyTypographyComponent value={0} variant='body1' fontWeight='700' />
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
									<CashComponent />
								</ListItem>
							</List>
						</Collapse>
						<ListItem>
							<Paper elevation={0} sx={{ width: '100%', backgroundColor: colors.teal[100], borderRadius: '.5rem' }}>
								<Stack spacing={2} direction='row' sx={{ padding: '.5rem 1rem' }}>
									<Typography variant='body1' fontWeight='700' flexGrow={1} color={colors.teal[500]}>
										CHANGE
									</Typography>
									<CurrencyTypographyComponent value={0} variant='body1' fontWeight='700' color={colors.teal[500]} />
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
