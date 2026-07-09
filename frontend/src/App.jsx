import axios from 'axios'
import { useState, useEffect } from 'react'
import RiskResult from './components/RiskResult'
import HealthForm from './components/HealthForm'
import HistoryList from './components/HistoryList'

function App() {
    // Form data state
    const [formData, setFormData] = useState({
        age: '',
        glucose: '',
        blood_pressure: '',
        bmi: '',
        insulin: ''
    })

    // Result state
    const [result, setResult] = useState(null)

    // Loading state
    const [loading, setLoading] = useState(false)

    // Error state
    const [error, setError] = useState(null)

    // Show/Hide history state
    const [showHistory, setShowHistory] = useState(false)

    // History data state
    const [predictions, setPredictions] = useState([])

    // useEffect → fetch history when page loads
const fetchHistory = () => {
    axios.get("http://localhost:8000/predictions/")
        .then((response) => {
            setPredictions(response.data)
        })
        .catch((error) => {
            console.error("Failed to fetch history:", error)
        })
}

useEffect(() => {
    console.log("Page loaded! Fetching history...")
    fetchHistory()
}, [])

    // Handle any input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
const handleDelete = async (prediction_id) => {
    try {
        await axios.delete(`http://localhost:8000/predictions/${prediction_id}`)
        fetchHistory()  // Refresh the list after deleting
    } catch (error) {
        console.error("Delete failed:", error)
        setError("Failed to delete prediction.")
    }
}
    // Handle form submit
    const handleSubmit = async () => {
    if (!formData.age || !formData.glucose) {
        setError("Please fill all fields!")
        return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
        const response = await axios.post("http://localhost:8000/predictions/", formData)
        setResult(response.data)
        fetchHistory()  // Refresh history after a new prediction
    } catch (error) {
        console.error("Prediction failed:", error)
        setError("Something went wrong. Please try again.")
    } finally {
        setLoading(false)
    }
}

    return (
       <div className="max-w-md mx-auto mt-10 p-6">
<h1 className="text-3xl font-bold text-center mb-2">HealthPulse</h1>    <p className="text-center text-gray-500 mb-6">AI Powered Disease Risk Checker</p>
            {/* Form Section */}
<HealthForm
    formData={formData}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    loading={loading}
    error={error}
/>
         <RiskResult result={result} />

          <button
    onClick={() => setShowHistory(!showHistory)}
    className="mt-6 text-purple-600 underline hover:text-purple-800"
>
    {showHistory ? "Hide History" : "Show History"}
</button>

{showHistory && <HistoryList />}        </div>
    )
}

export default App