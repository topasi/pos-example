import { useContext } from 'react'
import SettingsContext from '../contexts/settings.context'

const useSettings = () => {
	return useContext(SettingsContext)
}

export default useSettings
