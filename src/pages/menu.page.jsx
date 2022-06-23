import React, { useCallback, useState } from 'react'
import { styled, colors, Stack, Grid, Box, Paper, ButtonGroup, Button, Typography, Table, TableBody, TableContainer, TableHead, Avatar, Chip } from '@mui/material'
import MuiTableCell, { tableCellClasses } from '@mui/material/TableCell'
import MuiTableRow from '@mui/material/TableRow'
import AddIcon from '@mui/icons-material/Add'

import { categories, menu } from '../data'
import LayoutComponent from '../components/layout.component'
import CurrencyTypographyComponent from '../components/currency-typography.component'
import MenuCreateComponent from '../components/menu-create.component'
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

const MenuPage = () => {
	const [openMenuModal, setOpenMenuModal] = useState(false)
	const handleOpenMenuModal = useCallback(() => {
		setOpenMenuModal(true)
	}, [setOpenMenuModal])
	const handleCloseMenuModal = useCallback(() => {
		setOpenMenuModal(false)
	}, [setOpenMenuModal])
	return (
		<LayoutComponent>
			<MenuCreateComponent openMenuModal={openMenuModal} handleCloseMenuModal={handleCloseMenuModal} />
			<Stack spacing={4} width='100%'>
				<Grid container>
					<Grid item xs={12}>
						<Paper elevation={0} sx={{ padding: '2rem', borderRadius: '1rem' }}>
							<Stack spacing={2} direction='row'>
								<Box flexGrow={1}>
									<Typography variant='h5' color={colors.grey[700]}>
										All Menu
									</Typography>
									<Typography variant='body2' marginBottom='1.5rem' color={colors.grey[400]}>
										Lis of all menu that can be used to order
									</Typography>
								</Box>
								<Box>
									<Button
										variant='contained'
										startIcon={<AddIcon />}
										disableElevation
										sx={{
											borderRadius: '.5rem',
											color: 'background.default',
										}}
										onClick={() => {
											handleOpenMenuModal()
										}}
									>
										Create Menu
									</Button>
								</Box>
							</Stack>
							<TableContainer component={Paper} elevation={0}>
								<Table sx={{ minWidth: 700 }} aria-label='customized table'>
									<TableHead>
										<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
											<TableCell sx={{ width: '35px' }}></TableCell>
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
									<TableBody>
										{menu.map((item) => (
											<MuiTableRow key={item.id}>
												<TableCell>
													<Avatar alt='' src={item.image} />
												</TableCell>
												<TableCell>{item.id}</TableCell>
												<TableCell>{item.name}</TableCell>
												<TableCell>
													{item.sideDishes.length > 0 ? (
														<Typography variant='body2' sx={{ color: colors.grey[500] }}>
															{menu
																.filter((menuItem) => item.sideDishes.includes(menuItem.id))
																.map((menuItem) => menuItem.name)
																.join(', ')}
														</Typography>
													) : (
														<Typography variant='body2' sx={{ color: colors.grey[500] }}>
															N/A
														</Typography>
													)}
												</TableCell>
												<TableCell>
													{item.categories.length > 0 ? (
														<Stack spacing={1} direction='row'>
															{categories
																.filter((category) => item.categories.includes(category.id))
																.map((category) => (
																	<Chip label={category.name} size='small' sx={{ color: colors.grey[700] }} key={category.id} />
																))}
														</Stack>
													) : (
														<Typography variant='body2' sx={{ color: colors.grey[500] }}>
															N/A
														</Typography>
													)}
												</TableCell>
												<TableCell>
													<Stack spacing={1} direction='row'>
														{item.sizes.map((size) => (
															<Chip label={upperFirst(size)} size='small' sx={{ color: colors.grey[700] }} key={size} />
														))}
													</Stack>
												</TableCell>
												<TableCell align='right'>
													<CurrencyTypographyComponent value={item.price} />
												</TableCell>
												<TableCell align='right'>{item.stocks}</TableCell>
												<TableCell align='right'>
													<ButtonGroup variant='outlined' aria-label='text button group' size='small'>
														<Button>Edit</Button>
														<Button>Delete</Button>
													</ButtonGroup>
												</TableCell>
											</MuiTableRow>
										))}
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

export default MenuPage
