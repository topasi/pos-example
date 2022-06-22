import { useState, useEffect } from 'react'

const getFromLocalStorate = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
    if (initialValue instanceof Function) return initialValue()
    return initialValue
}

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        return getFromLocalStorate(key, initialValue)
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
        // eslint-disable-next-line
    }, [value])
    return [value, setValue]
}

export default useLocalStorage