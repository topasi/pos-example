import React from 'react'
import { truncate } from 'lodash'
import { colors, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined'

const DiscountComponent = ({ discount }) => {
	return (
		<Card sx={{ borderRadius: '1rem' }}>
			<CardActionArea>
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
					}}
				>
					<DiscountOutlinedIcon
						sx={{
							position: 'absolute',
							right: '.5rem',
							top: '.75rem',
							fontSize: '2rem',
						}}
					/>
					<Typography variant='h2' color='background.default'>
						{discount.percentage}%
					</Typography>
					<Typography variant='h6' color='background.default'>
						{truncate(discount.name, { length: 40 })}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default DiscountComponent
