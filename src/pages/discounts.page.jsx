import React, { useState, useCallback } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { styled, colors, Stack, Grid, Box, Paper, InputLabel, Button, Typography, InputAdornment } from '@mui/material'
import MuiTextField from '@mui/material/TextField'

import { discounts } from '../data'
import LayoutComponent from '../components/layout.component'
import DiscountComponent from '../components/discount.component'
import DialogComponent from '../components/dialog.component'

const TextField = styled(MuiTextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		borderRadius: '.5rem',
	},
	'& .MuiFormHelperText-root': {
		marginLeft: 0,
	},
}))

const DiscountsPage = () => {
	const [openDeleteDiscountDialog, setOpenDeleteDiscountDialog] = useState(false)
	const handleDeleteDialog = useCallback(() => {
		setOpenDeleteDiscountDialog(false)
		alert()
	}, [])
	const handleOpenDeleteDiscountDialog = useCallback(() => {
		setOpenDeleteDiscountDialog(true)
	}, [setOpenDeleteDiscountDialog])
	const handleCloseDeleteDiscountDialog = useCallback(() => {
		setOpenDeleteDiscountDialog(false)
	}, [setOpenDeleteDiscountDialog])
	const initialValues = {
		name: '',
		percentage: '',
	}
	const validationSchema = yup.object().shape({
		name: yup.string().typeError('The name is invalid').required('The name is required'),
		percentage: yup.number().typeError('The percentage is invalid').required('The percentage is required'),
	})
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit(values) {
			console.log(values)
		},
	})
	return (
		<LayoutComponent>
			<DialogComponent open={openDeleteDiscountDialog} onClose={handleCloseDeleteDiscountDialog} handleDeleteDialog={handleDeleteDialog} title='Are you sure?'>
				Do you really want to delete? If you proceed this item will not be able to get back this forever.
			</DialogComponent>
			<Stack spacing={4} width='100%'>
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={8} xl={6}>
						<Paper elevation={0} sx={{ padding: '2rem', borderRadius: '1rem' }}>
							<Typography variant='h5' marginBottom='1.5rem' color={colors.grey[700]}>
								Create Discounts
							</Typography>
							<form onSubmit={formik.handleSubmit}>
								<Box paddingBottom='1rem'>
									<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
										Name *
									</InputLabel>
									<TextField id='name' variant='outlined' name='name' value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} fullWidth />
								</Box>
								<Box paddingBottom='1rem'>
									<InputLabel htmlFor='percentage' sx={{ marginBottom: '.25rem' }}>
										Percentage *
									</InputLabel>
									<TextField
										id='percentage'
										variant='outlined'
										name='percentage'
										value={formik.values.percentage}
										onChange={formik.handleChange}
										error={formik.touched.percentage && Boolean(formik.errors.percentage)}
										helperText={formik.touched.percentage && formik.errors.percentage}
										InputProps={{
											endAdornment: <InputAdornment position='end'>%</InputAdornment>,
										}}
										fullWidth
									/>
								</Box>
								<Button
									variant='contained'
									size='large'
									type='submit'
									disableElevation
									sx={{
										minWidth: '150px',
										minHeight: '50px',
										borderRadius: '.5rem',
										color: 'background.default',
									}}
								>
									Save
								</Button>
							</form>
						</Paper>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Paper elevation={0} sx={{ padding: '2rem', borderRadius: '1rem' }}>
							<Typography variant='h5' color={colors.grey[700]}>
								All Discounts
							</Typography>
							<Typography variant='body2' marginBottom='1.5rem' color={colors.grey[500]}>
								List of all discounts than can be used to transact.
							</Typography>
							<Grid container spacing={3}>
								{discounts.map((discount) => (
									<Grid item xs={12} sm={6} md={4} xl={3} key={discount.id}>
										<DiscountComponent discount={discount} handleOpenDeleteDiscountDialog={handleOpenDeleteDiscountDialog} />
									</Grid>
								))}
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Stack>
		</LayoutComponent>
	)
}

export default DiscountsPage
