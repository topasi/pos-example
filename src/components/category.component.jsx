import React from 'react'
import { colors, Card, CardContent, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const CategoryComponent = ({ category, handleOpenDeleteDialog }) => {
	return (
		<Card
			sx={{
				height: '235px',
				borderRadius: '1rem',
				cursor: 'pointer,',
			}}
		>
			<CardContent
				sx={{
					position: 'relative',
					height: '235px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					backgroundColor: colors.deepOrange[400],
					'& .MuiSvgIcon-root': {
						color: 'background.default',
					},
				}}
			>
				<IconButton
					aria-label='delete'
					size='small'
					onClick={() => handleOpenDeleteDialog(category.id)}
					sx={{
						position: 'absolute',
						right: 0,
						top: 0,
						fontSize: '2rem',
					}}
				>
					<CloseIcon fontSize='inherit' />
				</IconButton>
				<Typography variant='h5' color='background.default' textAlign='center'>
					{category.name}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default CategoryComponent
