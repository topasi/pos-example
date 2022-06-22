import React from 'react'
import NumberFormat from 'react-number-format'
import { truncate } from 'lodash'
import { Card, CardActionArea, CardMedia, CardContent, Stack, Typography, Box } from '@mui/material'
import CheckCircle from '@mui/icons-material/CheckCircle'

import { config } from '../config'

const MenuComponent = ({ item, selected, handleAddToCart }) => {
	return (
		<Card
			onClick={() => handleAddToCart(item)}
			sx={{
				height: '235px',
				borderRadius: '1rem',
			}}
		>
			<CardActionArea>
				{selected && (
					<Box
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '150px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
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
				<CardMedia component='img' height='150' image={item.image} alt={item.name} />
				<CardContent>
					<Stack spacing={2} direction='row'>
						<Typography gutterBottom variant='body1' component='div' flexGrow={1} height='50px'>
							{truncate(item.name, { length: 40 })}
						</Typography>
						<Typography gutterBottom variant='h6' component='div'>
							<NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={config.currency} />
						</Typography>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default MenuComponent
