import React, { forwardRef } from 'react'
import NumberFormat from 'react-number-format'

const NumberFormatComponent = forwardRef(function NumberFormatComponent(props, ref) {
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
			prefix={`${currency} `}
		/>
	)
})

export default NumberFormatComponent
