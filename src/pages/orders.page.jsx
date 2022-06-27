import React, { useCallback, useState } from 'react'
import moment from 'moment'
import { upperFirst } from 'lodash'
import { styled, colors, Stack, Grid, Box, Paper, ButtonGroup, Button, Typography, Table, TableBody, TableContainer, TableHead, Collapse, IconButton } from '@mui/material'
import MuiTableCell, { tableCellClasses } from '@mui/material/TableCell'
import MuiTableRow from '@mui/material/TableRow'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import useOrders from '../hooks/useOrders'
import LayoutComponent from '../components/layout.component'
import CurrencyTypographyComponent from '../components/currency-typography.component'
import DialogComponent from '../components/dialog.component'

const TableCell = styled(MuiTableCell)(({ theme }) => ({
	'&:first-of-type': {
		borderTopLeftRadius: '.5rem',
	},
	'&:last-of-type': {
		borderTopRightRadius: '.5rem',
	},
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const TableRow = styled(MuiTableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

const Row = ({ order, handleOpenDeleteDialog }) => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<MuiTableRow
				key={order.id}
				sx={{
					verticalAlign: 'middle',
				}}
			>
				<TableCell>
					<IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{order.id}</TableCell>
				<TableCell>{moment(order.createdAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm')}</TableCell>
				<TableCell>{order.paymentMethod}</TableCell>
				<TableCell align='right'>
					<CurrencyTypographyComponent value={order.vatPrice} />({order.vat}%)
				</TableCell>
				<TableCell align='right' sx={{ whiteSpace: 'nowrap' }}>
					<CurrencyTypographyComponent value={order.discountPrice} />({order.discountPercent}%)
				</TableCell>
				<TableCell align='right'>
					<CurrencyTypographyComponent value={order.serviceCharge} />
				</TableCell>
				<TableCell align='right'>
					<CurrencyTypographyComponent value={order.total} />
				</TableCell>
				<TableCell align='right'>
					<ButtonGroup variant='outlined' aria-label='text button group' size='small'>
						<Button onClick={() => handleOpenDeleteDialog(order.id)}>Delete</Button>
					</ButtonGroup>
				</TableCell>
			</MuiTableRow>
			<MuiTableRow
				sx={{
					verticalAlign: 'top',
				}}
			>
				<TableCell colSpan={10} style={{ paddingBottom: 0, paddingTop: 0 }}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant='h6' gutterBottom component='div'>
								History
							</Typography>
							<Table size='small' aria-label='purchases' sx={{ marginBottom: '1rem' }}>
								<TableHead>
									<MuiTableRow
										sx={{
											'& .MuiTableCell-root': {
												fontWeight: '700',
											},
										}}
									>
										<MuiTableCell sx={{ width: '250px' }}>ID</MuiTableCell>
										<MuiTableCell>Menu</MuiTableCell>
										<MuiTableCell>Size</MuiTableCell>
										<MuiTableCell align='right'>Price</MuiTableCell>
										<MuiTableCell align='right'>Qty</MuiTableCell>
										<MuiTableCell align='right'>Total Price</MuiTableCell>
									</MuiTableRow>
								</TableHead>
								<TableBody>
									{order.items.map((item) => (
										<MuiTableRow key={item.id}>
											<TableCell component='th' scope='row'>
												{item.id}
											</TableCell>
											<TableCell>{item.name}</TableCell>
											<TableCell>{upperFirst(item.size)}</TableCell>
											<TableCell align='right'>
												<CurrencyTypographyComponent value={item.price} />
											</TableCell>
											<TableCell align='right'>{item.qty}</TableCell>
											<TableCell align='right'>
												<CurrencyTypographyComponent value={item.price * item.qty} />
											</TableCell>
										</MuiTableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</MuiTableRow>
		</>
	)
}

const OrdersPage = () => {
	const { orders, handleDeleteOrder } = useOrders()
	const [deleteDialog, setDeleteDialog] = useState({
		open: false,
		id: '',
	})
	const handleOpenDeleteDialog = useCallback(
		(id) => {
			setDeleteDialog({
				open: true,
				id,
			})
		},
		[setDeleteDialog]
	)
	const handleCloseDeleteDialog = useCallback(() => {
		setDeleteDialog((prev) => ({ ...prev, open: false }))
	}, [setDeleteDialog])
	return (
		<LayoutComponent>
			<DialogComponent open={deleteDialog.open} onClose={handleCloseDeleteDialog} deleteId={deleteDialog.id} handleDeleteDialog={handleDeleteOrder} setDeleteDialog={setDeleteDialog} title='Delete Order'>
				Are you sure you want to delete this order? You will not be able to recover this once deleted.
			</DialogComponent>
			<Stack spacing={4} width='100%'>
				<Grid container>
					<Grid item xs={12}>
						<Paper elevation={0} sx={{ padding: '2rem', borderRadius: '1rem' }}>
							<Stack spacing={2} direction='row'>
								<Box flexGrow={1}>
									<Typography variant='h5' color={colors.grey[700]}>
										All Orders
									</Typography>
									<Typography variant='body2' marginBottom='1.5rem' color={colors.grey[400]}>
										Lis of all successful orders
									</Typography>
								</Box>
							</Stack>
							<TableContainer component={Paper} elevation={0}>
								<Table sx={{ minWidth: 700 }} aria-label='customized table'>
									<TableHead>
										<TableRow
											sx={{
												'& > *': { borderBottom: 'unset' },
												'& .MuiTableCell-root': {
													whiteSpace: 'nowrap',
												},
											}}
										>
											<TableCell sx={{ width: '35px' }}></TableCell>
											<TableCell sx={{ width: '250px' }}>ID</TableCell>
											<TableCell>Date Created</TableCell>
											<TableCell>Payment Method</TableCell>
											<TableCell align='right'>VAT</TableCell>
											<TableCell align='right'>Discount</TableCell>
											<TableCell align='right'>Service Charge</TableCell>
											<TableCell align='right'>Total Amount</TableCell>
											<TableCell align='right' sx={{ paddingRight: '35px' }}>
												Action
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{orders.length > 0 ? (
											orders.map((order) => <Row order={order} key={order.id} handleOpenDeleteDialog={handleOpenDeleteDialog} />)
										) : (
											<MuiTableRow>
												<TableCell colSpan={10}>
													<Typography variant='body2' textAlign='center' sx={{ color: colors.grey[700] }}>
														There's no orders available
													</Typography>
												</TableCell>
											</MuiTableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Grid>
				</Grid>
			</Stack>
		</LayoutComponent>
	)
}

export default OrdersPage
