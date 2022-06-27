import React from 'react'

import ErrorComponent from '../components/error.component'

const ServiceUnavailablePage = () => {
	return <ErrorComponent statusCode={503}>Page is under maintenance</ErrorComponent>
}

export default ServiceUnavailablePage
