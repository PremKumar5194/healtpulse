import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const PredictionContext = createContext()

export function PredictionProvider({ children }) {
    const [predictions, setPredictions] = useState([])

    const fetchHistory = () => {
        axios.get("http://localhost:8000/predictions/")
            .then((response) => setPredictions(response.data))
            .catch((error) => console.error("Failed to fetch history:", error))
    }

    const handleDelete = async (prediction_id) => {
        try {
            await axios.delete(`http://localhost:8000/predictions/${prediction_id}`)
            fetchHistory()
        } catch (error) {
            console.error("Delete failed:", error)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    return (
        <PredictionContext.Provider value={{ predictions, fetchHistory, handleDelete }}>
            {children}
        </PredictionContext.Provider>
    )
}

export function usePredictions() {
    return useContext(PredictionContext)
}