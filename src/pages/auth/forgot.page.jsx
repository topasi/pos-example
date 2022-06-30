import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Box, Stack, Paper, FormGroup, InputLabel, FormControl, OutlinedInput, FormHelperText, Button, Typography, CircularProgress } from '@mui/material'
import MuiLink from '@mui/material/Link'

import { router } from '../../router'
import useAuth from '../../hooks/useAuth'
import HelmetComponent from '../../components/helmet.component'
import AlertComponent from '../../components/alert.component'
import logo from '../../assets/brand-full-colored.png'

const ForgotPage = () => {
	const { feedback, handleSendPasswordReset } = useAuth()
	const initialValues = useMemo(
		() => ({
			email: '',
		}),
		[]
	)
	const [disabled, setDisabled] = useState(false)
	const validationSchema = yup.object().shape({
		email: yup.string().typeError('The email address is invalid').required('The email address is required').email('The email address must be a valid email'),
	})
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
			setDisabled(true)
			handleSendPasswordReset(values, setDisabled, resetForm, setErrors)
		},
	})
	return (
		<React.Fragment>
			<HelmetComponent title={`UTAKPOS | ${router.forgot.name}`} />
			<Box
				sx={{
					width: '100%',
					height: '100%',
					minHeight: '100vh',
					backgroundColor: 'primary.main',
				}}
			>
				<Stack
					spacing={0}
					direction='row'
					alignItems='center'
					justifyContent='center'
					sx={{
						minHeight: '100vh',
					}}
				>
					<Paper
						sx={{
							width: '100%',
							maxWidth: '500px',
							margin: '1rem',
							padding: '2rem',
							backgroundColor: 'background.default',
							borderRadius: '1rem',
						}}
					>
						<Box
							sx={{
								minWidth: '200px',
								margin: '1rem 0',
								textAlign: 'center',
							}}
						>
							<Link to={router.login.path}>
								<img src={logo} alt='logo' style={{ width: '200px' }} />
							</Link>
						</Box>
						<Box
							sx={{
								margin: '1rem 0 2rem',
								textAlign: 'center',
							}}
						>
							<Typography variant='h6' fontWeight='700' color='primary' letterSpacing={5}>
								FORGOT PASSWORD
							</Typography>
						</Box>
						{feedback?.success === true && feedback?.router === router.forgot.path && (
							<Box
								sx={{
									marginBottom: '1.5rem',
									display: 'flex',
								}}
							>
								<AlertComponent severity='success'>{feedback?.message}</AlertComponent>
							</Box>
						)}
						{feedback?.success === false && feedback?.router === router.forgot.path && (
							<Box
								sx={{
									marginBottom: '1.5rem',
									display: 'flex',
								}}
							>
								<AlertComponent severity='error'>{feedback?.message}</AlertComponent>
							</Box>
						)}
						<Box component='form' noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
							<Stack spacing={2}>
								<FormGroup>
									<InputLabel htmlFor='email' sx={{ marginBottom: '.25rem' }}>
										Email Address *
									</InputLabel>
									<FormControl required error={formik.touched.email && Boolean(formik.errors.email)} variant='standard' fullWidth>
										<OutlinedInput id='email' value={formik.values.email} onChange={formik.handleChange} sx={{ borderRadius: '.5rem' }} />
										<FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
									</FormControl>
								</FormGroup>
								<FormGroup>
									<Button
										variant='contained'
										size='large'
										type='submit'
										disableElevation
										disabled={disabled}
										endIcon={
											disabled && (
												<CircularProgress
													color='inherit'
													sx={{
														width: '1rem !important',
														height: '1rem !important',
													}}
												/>
											)
										}
										sx={{
											minWidth: '150px',
											minHeight: '50px',
											borderRadius: '.5rem',
											color: 'background.default',
										}}
									>
										Reset Password
									</Button>
								</FormGroup>
								<FormGroup>
									<Typography variant='body2' align='center'>
										<MuiLink component={Link} underline='hover' to={router.login.path}>
											Back to Login
										</MuiLink>
									</Typography>
								</FormGroup>
							</Stack>
						</Box>
					</Paper>
				</Stack>
			</Box>
		</React.Fragment>
	)
}

export default ForgotPage
