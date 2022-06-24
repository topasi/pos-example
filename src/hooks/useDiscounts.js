import { useContext } from 'react'
import DiscountsContext from '../contexts/discounts.context'

const useDiscounts = () => {
	return useContext(DiscountsContext)
}

export default useDiscounts
