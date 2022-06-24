import React from 'react'
import { colors, Stack, Typography } from '@mui/material'

import LayoutComponent from '../components/layout.component'

const NotFoundPage = () => {
	return (
		<LayoutComponent>
			<Stack spacung={0} alignItems='center' justifyContent='center' width='100%'>
				<Typography
					variant='h1'
					component='div'
					sx={{
						fontSize: '25rem',
						fontWeight: '700',
						color: colors.grey[400],
					}}
				>
					404
				</Typography>
				<Typography
					variant='h3'
					component='div'
					sx={{
						fontWeight: '700',
						color: colors.grey[400],
					}}
				>
					Page not found
				</Typography>
				<Typography
					variant='h6'
					component='div'
					sx={{
						marginBotton: '1.5rem',
						fontWeight: '700',
						color: colors.grey[400],
					}}
				>
					All right reserved. Copyright &copy; {new Date().getFullYear()}.
				</Typography>
				<Typography
					variant='body1'
					component='div'
					sx={{
						color: colors.grey[400],
					}}
				>
					Handcrafted by Rafael Topasi
				</Typography>
			</Stack>
		</LayoutComponent>
	)
}

export default NotFoundPage
