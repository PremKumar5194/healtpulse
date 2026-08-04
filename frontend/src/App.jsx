import axios from 'axios'
import { useState } from 'react'
import RiskResult from './components/RiskResult'
import HealthForm from './components/HealthForm'
import HistoryList from './components/HistoryList'
import { usePredictions } from './context/PredictionContext'

function App() {
    const [formData, setFormData] = useState({
        gender: '',
        pregnancies: '',
        age: '',
        glucose: '',
        blood_pressure: '',
        skin_thickness: '',
        insulin: '',
        bmi: '',
        diabetes_pedigree_function: ''
    })

    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showHistory, setShowHistory] = useState(false)

    const { fetchHistory } = usePredictions()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

const handleSubmit = async () => {
    if (!formData.age || !formData.glucose || !formData.gender) {
        setError("Please fill all fields!")
        return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
        const { gender, ...rest } = formData
        const payload = {
            ...rest,
            pregnancies: gender === 'male' ? null: Number(formData.pregnancies)
        }
        const response = await axios.post("http://localhost:8000/predictions/", payload)
        setResult({ ...response.data, gender })
        fetchHistory()
    } catch (error) {
        console.error("Prediction failed:", error)
        setError("Something went wrong. Please try again.")
    } finally {
        setLoading(false)
    }
}

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px' }}>
                <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 500, fontSize: '32px', color: 'var(--text-h)', marginBottom: '4px' }}>
                    HealthPulse
                </h1>
                <p style={{ color: 'var(--text)', marginBottom: '32px' }}>
                    AI Powered Disease Risk Checker
                </p>

                <div className="grid gap-8" style={{ gridTemplateColumns: result ? '1fr 1fr' : '1fr' }}>
                    <div>
                        <HealthForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                        />
                    </div>

                    {result && (
                        <div>
                            <RiskResult result={result} />
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="mt-6 underline"
                    style={{ color: 'var(--accent)' }}
                >
                    {showHistory ? "Hide History" : "Show History"}
                </button>

                {showHistory && <HistoryList />}
            </div>
        </div>
    )
}

export default App