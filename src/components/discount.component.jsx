import React from 'react'
import { useLocation } from 'react-router-dom'
import { truncate } from 'lodash'
import { colors, Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import CheckCircle from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'

import { router } from '../router'
import useCart from '../hooks/useCart'

const DiscountComponent = ({ discount, selected, handleOpenDeleteDialog }) => {
	const location = useLocation()
	const { handleCreateDiscount } = useCart()
	return (
		<Card
			elevation={0}
			onClick={() => {
				location.pathname === router.transaction.path && handleCreateDiscount(discount.id)
			}}
			sx={{
				position: 'relative',
				height: '235px',
				borderRadius: '1rem',
				cursor: 'pointer,',
			}}
		>
			{selected && (
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'rgba(0,0,0,.15)',
						cursor: 'pointer',
					}}
				>
					<Box
						sx={{
							width: '40px',
							height: '40px',
							backgroundColor: 'background.default',
							borderRadius: '50%',
						}}
					>
						<CheckCircle
							sx={{
								fontSize: '40px',
								color: 'primary.main',
							}}
						/>
					</Box>
				</Box>
			)}
			<CardContent
				sx={{
					height: '235px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					backgroundColor: colors.blue[500],
					'& .MuiSvgIcon-root': {
						color: 'background.default',
					},
					cursor: 'pointer',
				}}
			>
				{handleOpenDeleteDialog && (
					<IconButton
						aria-label='delete'
						size='small'
						onClick={() => handleOpenDeleteDialog(discount.id)}
						sx={{
							position: 'absolute',
							right: 0,
							top: 0,
							fontSize: '2rem',
						}}
					>
						<CloseIcon fontSize='inherit' />
					</IconButton>
				)}
				<Typography variant='h2' color='background.default' textAlign='center'>
					{discount.percentage}%
				</Typography>
				<Typography variant='h6' color='background.default' textAlign='center'>
					{truncate(discount.name, { length: 40 })}
				</Typography>
				{discount.isTaxExempted && (
					<Typography
						textAlign='center'
						fontWeight='700'
						sx={{
							position: 'absolute',
							bottom: '1rem',
							fontSize: '11px',
							color: colors.yellow[500],
							letterSpacing: '5px',
						}}
					>
						VAT EXCLUSIVE
					</Typography>
				)}
			</CardContent>
		</Card>
	)
}

export default DiscountComponent
