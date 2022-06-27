import React from 'react'
import { colors, Stack, Typography } from '@mui/material'

const ErrorComponent = ({ statusCode, children }) => {
	return (
		<Stack
			spacung={0}
			alignItems='center'
			justifyContent='center'
			sx={{
				width: '100%',
				height: '100%',
				minHeight: '100vh',
			}}
		>
			<Typography
				variant='h1'
				component='div'
				sx={{
					fontSize: '25rem',
					fontWeight: '700',
					color: colors.grey[400],
				}}
			>
				{statusCode}
			</Typography>
			<Typography
				variant='h3'
				component='div'
				sx={{
					fontWeight: '700',
					color: colors.grey[400],
				}}
			>
				{children}
			</Typography>
			<Typography
				variant='h6'
				component='div'
				sx={{
					marginTop: '.5rem',
					marginBotton: '1.5rem',
					fontWeight: '700',
					color: colors.grey[400],
				}}
			>
				Handcrafted by Rafael Topasi
			</Typography>
			<Typography
				variant='body1'
				component='div'
				sx={{
					color: colors.grey[400],
				}}
			>
				All rights reserved. Copyright &copy; {new Date().getFullYear()}.
			</Typography>
		</Stack>
	)
}

export default ErrorComponent
