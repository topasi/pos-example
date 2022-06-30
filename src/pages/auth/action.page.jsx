import React, { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { Stack, Paper, Box, Typography, Button, CircularProgress } from '@mui/material'

import { router } from '../../router'
import useAuth from '../../hooks/useAuth'
import HelmetComponent from '../../components/helmet.component'
import logo from '../../assets/brand-full-colored.png'

const ActionPage = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { feedback, handleSendEmailVerification, handleVerifyEmail } = useAuth()
	const [disabled, setDisabled] = useState(false)
	const [title, setTitle] = useState('')
	const mode = searchParams.get('mode')
	const oobCode = searchParams.get('oobCode')
	const apiKey = searchParams.get('apikey')
	const lang = searchParams.get('lang') || 'en'
	useEffect(() => {
		switch (mode) {
			case 'verifyEmail':
				setTitle('Verify Email Address')
				handleVerifyEmail(oobCode)
				break
			case 'resetPassword':
				navigate(`/reset-password?mode=${mode}&oobCode=${oobCode}&apikey=${apiKey}&lang=${lang}`, {
					state: { from: location },
					replace: true,
				})
				break
			default:
		}
	}, [mode, oobCode, apiKey, lang, location, navigate, handleVerifyEmail])
	return (
		<React.Fragment>
			<HelmetComponent title={`UTAKPOS | ${title}`} />
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
					alignItems='flex-start'
					justifyContent='center'
					sx={{
						minHeight: '100vh',
					}}
				>
					<Paper
						sx={{
							width: '100%',
							maxWidth: '769px',
							margin: '3rem 1rem',
							padding: '2rem',
							backgroundColor: 'background.default',
							borderRadius: '1rem',
						}}
					>
						<Box
							sx={{
								minWidth: '200px',
								margin: '1rem 0 2rem',
								textAlign: 'center',
							}}
						>
							<Link to={router.login.path}>
								<img src={logo} alt='logo' style={{ width: '200px' }} />
							</Link>
						</Box>
						<Stack spacing={3} alignItems='center' justifyContent='center'>
							{feedback?.success === true && feedback?.router === router.action.path && ['auth/verify-email-success', 'auth/request-verify-email-success'].indexOf(feedback?.code) > -1 ? (
								<>
									<Typography variant='h6'>{feedback?.message}</Typography>
									<Button
										variant='contained'
										size='large'
										color='primary'
										disableElevation
										component={Link}
										to={router.login.path}
										sx={{
											width: '150px',
											minHeight: '50px',
											borderRadius: '.5rem',
											color: 'background.default',
										}}
									>
										Login Now
									</Button>
								</>
							) : feedback?.success === false && feedback?.router === router.action.path && feedback?.code === 'auth/expired-action-code' ? (
								<>
									<Typography variant='h6'>{feedback?.message}</Typography>
									<Button
										variant='contained'
										size='large'
										color='primary'
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
										onClick={() => {
											setDisabled(true)
											handleSendEmailVerification(setDisabled)
										}}
										sx={{
											width: '150px',
											minHeight: '50px',
											borderRadius: '.5rem',
											color: 'background.default',
										}}
									>
										Resend Confirmation
									</Button>
								</>
							) : feedback?.success === false && feedback?.router === router.action.path ? (
								<>
									<Typography variant='h6'>{feedback?.message}</Typography>
									<Button
										variant='contained'
										size='large'
										color='primary'
										disableElevation
										component={Link}
										to={router.login.path}
										sx={{
											minHeight: '50px',
											borderRadius: '.5rem',
											color: 'background.default',
										}}
									>
										Back to Login
									</Button>
								</>
							) : (
								<CircularProgress />
							)}
						</Stack>
					</Paper>
				</Stack>
			</Box>
		</React.Fragment>
	)
}

export default ActionPage
