import React from 'react'
import { truncate, upperFirst } from 'lodash'
import { colors, Card, CardMedia, CardContent, Stack, Typography, Box } from '@mui/material'
import CheckCircle from '@mui/icons-material/CheckCircle'
import MoreIcon from '@mui/icons-material/More'

import CurrencyTypographyComponent from './currency-typography.component'
import placeholder from '../assets/placeholder.jpg'

const MenuItemComponent = ({ item, selected, handleMenuClick }) => {
	return (
		<Card
			onClick={() => handleMenuClick(item)}
			sx={{
				position: 'relative',
				height: '235px',
				borderRadius: '1rem',
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
						{selected.qty > 1 ? (
							<Box
								sx={{
									position: 'relative',
									top: '3px',
									left: '3px',
									width: '34px',
									height: '34px',
									backgroundColor: 'primary.main',
									borderRadius: '50%',
									fontSize: '20px',
									lineHeight: '34px',
									textAlign: 'center',
									color: 'background.default',
								}}
							>
								{selected.qty}
							</Box>
						) : (
							<CheckCircle
								sx={{
									fontSize: '40px',
									color: 'primary.main',
								}}
							/>
						)}
					</Box>
				</Box>
			)}
			<CardMedia component='img' height='150' image={item.image || placeholder} alt={item.name} />
			<CardContent>
				<Stack spacing={2} direction='row'>
					<Typography gutterBottom variant='body1' component='div' flexGrow={1} height='50px'>
						{truncate(item.name, { length: 40 })}
					</Typography>
					<Box display='flex' alignItems='flex-end' flexDirection='column'>
						<CurrencyTypographyComponent variant='h6' value={item.price} />
						{item?.sizes?.length > 1 || item?.sideDishes?.length > 0 ? (
							<MoreIcon sx={{ color: colors.grey[300] }} />
						) : (
							<Typography variant='body2' color={colors.grey[500]} fontSize='12px'>
								{upperFirst(item.sizes[0])}
							</Typography>
						)}
					</Box>
				</Stack>
			</CardContent>
		</Card>
	)
}

export default MenuItemComponent
