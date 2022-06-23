import React, { useCallback, useState } from 'react'
import { styled, colors, Stack, Grid, Box, Paper, ButtonGroup, Button, Typography, Table, TableBody, TableContainer, TableHead, Avatar, Chip } from '@mui/material'
import MuiTableCell, { tableCellClasses } from '@mui/material/TableCell'
import MuiTableRow from '@mui/material/TableRow'

import { categories, menu } from '../data'
import LayoutComponent from '../components/layout.component'
import CurrencyTypographyComponent from '../components/currency-typography.component'
import { upperFirst } from 'lodash'

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

const OrdersPage = () => {
	return (
		<LayoutComponent>
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
										<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
											<TableCell>ID</TableCell>
											<TableCell>Name</TableCell>
											<TableCell>Side Dishes</TableCell>
											<TableCell>Categories</TableCell>
											<TableCell>Sizes</TableCell>
											<TableCell align='right'>Price</TableCell>
											<TableCell align='right'>Stocks</TableCell>
											<TableCell align='right' sx={{ paddingRight: '100px' }}>
												Action
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody></TableBody>
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
