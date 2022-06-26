import React, { useCallback, useState } from 'react'
import { styled, colors, Stack, Paper, Typography, ToggleButtonGroup } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'

import useCart from '../hooks/useCart'
import CurrencyTextFieldComponent from './currency-text-field.component'

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
	'&.Mui-selected': {
		backgroundColor: `${theme.palette.primary.main} !important`,
		color: theme.palette.background.default,
	},
}))

const CashComponent = () => {
	const { cart, setPayment, setChange } = useCart()
	const [value, setValue] = useState('')
	const [activeButton, setActiveButton] = useState('')
	const handleActiveButton = (e, newActiveButton) => {
		const value = e.target.innerText
		if (newActiveButton === null) {
			setValue('')
		} else {
			setValue(value)
		}
		setActiveButton(newActiveButton)
	}
	const handleInputChange = useCallback(
		(value) => {
			if (value) {
				setPayment(value)
				setChange(value - cart.total)
			} else {
				setPayment(0)
				setChange(0)
			}
		},
		[cart.total, setPayment, setChange]
	)
	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Paper
				elevation={0}
				sx={{
					padding: '1rem',
					backgroundColor: colors.grey[50],
					borderRadius: '1rem',
				}}
			>
				<Stack spacing={2} direction='row'>
					<Typography
						variant='h6'
						color='primary'
						sx={{
							marginBottom: '1rem',
							flexGrow: 1,
						}}
					>
						CASH
					</Typography>
					<CurrencyTextFieldComponent
						value={value}
						setValue={setValue}
						setActiveButton={setActiveButton}
						handleInputChange={handleInputChange}
						inputProps={{
							min: 0,
							style: { textAlign: 'center' },
						}}
						sx={{
							maxWidth: '150px',
						}}
					/>
				</Stack>
				<ToggleButtonGroup
					value={activeButton}
					exclusive
					onChange={handleActiveButton}
					aria-label='cash'
					sx={{
						flexWrap: 'wrap',
						marginLeft: '-4px',
						marginRight: '-4px',
					}}
				>
					{data.map((item, key) => (
						<ToggleButton
							key={key}
							value={item}
							aria-label='cash'
							sx={{
								width: 'calc(33.33% - 8px)',
								margin: '4px !important',
								'&.MuiToggleButtonGroup-grouped': {
									borderRadius: '.5rem !important',
									border: '1px solid rgba(0,0,0,.12) !important',
								},
							}}
						>
							{item}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</Paper>
		</Stack>
	)
}

const data = ['1000', '1500', '2000', '2500', '3000', '3500', '4000', '4500', '5000']

export default CashComponent
