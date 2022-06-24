import { useContext } from 'react'
import CategoriesContext from '../contexts/categories.context'

const useCategories = () => {
	return useContext(CategoriesContext)
}

export default useCategories
