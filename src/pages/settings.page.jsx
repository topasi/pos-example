import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { colors, Stack, Grid, Box, Paper, InputLabel, Button, Typography, InputAdornment, FormGroup, FormControl, FormHelperText, OutlinedInput } from '@mui/material'

import useSettings from '../hooks/useSettings'
import LayoutComponent from '../components/layout.component'

const SettingsPage = () => {
	const { settings, handleCreateSettings } = useSettings()
	const [disabled, setDisabled] = useState(false)
	const initialValues = {
		currency: settings.currency,
		vat: settings.vat,
		serviceCharge: settings.serviceCharge,
	}
	const validationSchema = yup.object().shape({
		currency: yup.string().typeError('The currency is invalid').required('The currency is required'),
		vat: yup.number().typeError('The VAT is invalid').required('The VAT is required'),
		serviceCharge: yup.number().typeError('The service charge is invalid').required('The service charge is required'),
	})
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit(values) {
			setDisabled(true)
			handleCreateSettings(values, setDisabled)
		},
	})
	return (
		<LayoutComponent>
			<Stack spacing={4} width='100%'>
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={8} xl={6}>
						<Paper elevation={0} sx={{ padding: '2rem', borderRadius: '1rem' }}>
							<Typography variant='h5' marginBottom='1.5rem' color={colors.grey[700]}>
								Settings
							</Typography>
							<Box component='form' noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
								<Stack spacing={2}>
									<FormGroup>
										<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
											Currency Symbol *
										</InputLabel>
										<FormControl required error={formik.touched.currency && Boolean(formik.errors.currency)} variant='standard' fullWidth>
											<OutlinedInput value={formik.values.currency} onChange={formik.handleChange} id='currency' sx={{ borderRadius: '.5rem' }} />
											<FormHelperText>{formik.touched.currency && formik.errors.currency}</FormHelperText>
										</FormControl>
									</FormGroup>
									<FormGroup>
										<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
											VAT *
										</InputLabel>
										<FormControl required error={formik.touched.vat && Boolean(formik.errors.vat)} variant='standard' fullWidth>
											<OutlinedInput value={formik.values.vat} onChange={formik.handleChange} id='vat' endAdornment={<InputAdornment position='end'>%</InputAdornment>} sx={{ borderRadius: '.5rem' }} />
											<FormHelperText>{formik.touched.vat && formik.errors.vat}</FormHelperText>
										</FormControl>
									</FormGroup>
									<FormGroup>
										<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
											Service Charge *
										</InputLabel>
										<FormControl required error={formik.touched.serviceCharge && Boolean(formik.errors.serviceCharge)} variant='standard' fullWidth>
											<OutlinedInput value={formik.values.serviceCharge} onChange={formik.handleChange} id='serviceCharge' sx={{ borderRadius: '.5rem' }} />
											<FormHelperText>{formik.touched.serviceCharge && formik.errors.serviceCharge}</FormHelperText>
										</FormControl>
									</FormGroup>
									<FormGroup>
										<Button
											variant='contained'
											size='large'
											type='submit'
											disableElevation
											disabled={disabled}
											sx={{
												width: {
													sm: '100%',
													md: '150px',
												},
												minHeight: '50px',
												borderRadius: '.5rem',
												color: 'background.default',
											}}
										>
											Save
										</Button>
									</FormGroup>
								</Stack>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Stack>
		</LayoutComponent>
	)
}

export default SettingsPage
