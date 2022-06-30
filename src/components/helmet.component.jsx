import React from 'react'
import { Helmet } from 'react-helmet-async'

const MetaComponent = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	)
}

MetaComponent.defaultProps = {
	title: 'UTAKPOS | Login',
	description: 'UTAK Point of Sale',
	keywords: 'utak, pos, point of sale',
}

export default MetaComponent
