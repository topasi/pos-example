import React, { forwardRef, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { TextField } from '@mui/material'

import { config } from '../config'

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
	const { onChange, ...other } = props
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
			prefix={config.currency}
		/>
	)
})

const CurrencyTextFieldComponent = ({ selected, handleInputChange, ...others }) => {
	const [value, setValue] = useState('')
	useEffect(() => {
		if (value !== '' && selected.find((item) => item === true)) {
			setValue('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])
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
				inputComponent: NumberFormatCustom,
			}}
			{...others}
		/>
	)
}

export default CurrencyTextFieldComponent
