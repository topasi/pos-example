import React, { useCallback, useState } from 'react'
import { styled, colors, Stack, Paper, Typography, Grid } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'

import CurrencyTextFieldComponent from './currency-text-field.component'

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
	'&.Mui-selected': {
		backgroundColor: `${theme.palette.primary.main} !important`,
		color: theme.palette.background.default,
	},
}))

const CashComponent = () => {
	const [selected, setSelected] = useState(data.map(() => false))
	const handleButtonChange = (index) => {
		setSelected((prev) => prev.map((item, key) => (key === index ? !item : false)))
	}
	const handleInputChange = useCallback((value) => {
		if (value !== '') {
			setSelected(data.map(() => false))
		}
	}, [])
	return (
		<Stack spacing={2}>
			<Paper elevation={0} sx={{ padding: '1rem', backgroundColor: colors.grey[50], borderRadius: '1rem' }}>
				<Stack spacing={2} direction='row'>
					<Typography
						variant='h6'
						sx={{
							marginBottom: '1rem',
							flexGrow: 1,
						}}
					>
						CASH
					</Typography>
					<CurrencyTextFieldComponent selected={selected} handleInputChange={handleInputChange} inputProps={{ min: 0, style: { textAlign: 'center' } }} sx={{ maxWidth: '150px' }} />
				</Stack>
				<Grid container spacing={1}>
					{data.map((item, key) => (
						<Grid item xs={4} key={key}>
							<ToggleButton
								value={item}
								selected={selected[key]}
								size='small'
								onChange={() => {
									handleButtonChange(key)
								}}
								fullWidth
								disableRipple
							>
								{item}
							</ToggleButton>
						</Grid>
					))}
				</Grid>
			</Paper>
		</Stack>
	)
}

const data = ['1000', '1500', '2000', '2500', '3000', '3500']

export default CashComponent
