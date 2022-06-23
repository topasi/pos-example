import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { styled, colors, Stack, Grid, Box, Paper, InputLabel, Button, Typography, InputAdornment } from '@mui/material'
import MuiTextField from '@mui/material/TextField'

import LayoutComponent from '../components/layout.component'

const TextField = styled(MuiTextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		borderRadius: '.5rem',
	},
	'& .MuiFormHelperText-root': {
		marginLeft: 0,
	},
}))

const SettingsPage = () => {
	const initialValues = {
		currency: '',
		vat: '',
		serviceCharge: '',
	}
	const validationSchema = yup.object().shape({
		currency: yup.string().typeError('The currency is invalid').required('The currency is required'),
		vat: yup.number().typeError('The VAT is invalid').required('The VAT is required'),
		serviceCharge: yup.number().typeError('The service charge is invalid').required('The service charge is required'),
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
			<Stack spacing={4} width='100%'>
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={8} xl={6}>
						<Paper elevation={0} sx={{ padding: '2rem', borderRadius: '1rem' }}>
							<Typography variant='h4' marginBottom='1.5rem' color={colors.grey[700]}>
								Settings
							</Typography>
							<form onSubmit={formik.handleSubmit}>
								<Box paddingBottom='1rem'>
									<InputLabel htmlFor='currency' sx={{ marginBottom: '.25rem' }}>
										Currency *
									</InputLabel>
									<TextField id='currency' variant='outlined' name='currency' value={formik.values.currency} onChange={formik.handleChange} error={formik.touched.currency && Boolean(formik.errors.currency)} helperText={formik.touched.currency && formik.errors.currency} fullWidth />
								</Box>
								<Box paddingBottom='1rem'>
									<InputLabel htmlFor='vat' sx={{ marginBottom: '.25rem' }}>
										VAT Percentage *
									</InputLabel>
									<TextField
										id='vat'
										variant='outlined'
										name='vat'
										value={formik.values.vat}
										onChange={formik.handleChange}
										error={formik.touched.vat && Boolean(formik.errors.vat)}
										helperText={formik.touched.vat && formik.errors.vat}
										InputProps={{
											endAdornment: <InputAdornment position='end'>%</InputAdornment>,
										}}
										fullWidth
									/>
								</Box>
								<Box paddingBottom='1.5rem'>
									<InputLabel htmlFor='serviceCharge' sx={{ marginBottom: '.25rem' }}>
										Service Charge *
									</InputLabel>
									<TextField id='serviceCharge' variant='outlined' name='serviceCharge' value={formik.values.serviceCharge} onChange={formik.handleChange} error={formik.touched.serviceCharge && Boolean(formik.errors.serviceCharge)} helperText={formik.touched.serviceCharge && formik.errors.serviceCharge} fullWidth />
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
			</Stack>
		</LayoutComponent>
	)
}

export default SettingsPage
