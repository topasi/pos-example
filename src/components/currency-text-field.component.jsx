import React, { forwardRef, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { TextField } from '@mui/material'

import useSettings from '../hooks/useSettings'

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
	const { currency, onChange, ...other } = props
	return (
		<NumberFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				})
			}}
			thousandSeparator
			prefix={currency}
		/>
	)
})

const CurrencyTextFieldComponent = ({ selected, cart, handleInputChange, ...others }) => {
	const [value, setValue] = useState('')
	const { settings } = useSettings()
	useEffect(() => {
		if (value !== '' && selected.find((item) => item === true)) {
			setValue('')
		}
	}, [selected, value, setValue])
	useEffect(() => {
		setValue('')
	}, [cart])
	return (
		<TextField
			variant='standard'
			label=''
			value={value}
			placeholder='Enter Amount'
			onChange={(e) => {
				setValue(e.target.value)
				handleInputChange(e.target.value)
			}}
			name='numberformat'
			InputProps={{
				inputProps: {
					currency: settings.currency,
				},
				inputComponent: NumberFormatCustom,
			}}
			{...others}
		/>
	)
}

export default CurrencyTextFieldComponent
