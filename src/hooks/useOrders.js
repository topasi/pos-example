import { useContext } from 'react'
import OrdersContext from '../contexts/orders.context'

const useOrders = () => {
	return useContext(OrdersContext)
}

export default useOrders
