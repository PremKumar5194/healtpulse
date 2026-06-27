import { useState, useEffect } from 'react'

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
    useEffect(() => {
        console.log("Page loaded! Fetching history...")
        setTimeout(() => {
            const fakePredictions = [
                { id: 1, age: 25, glucose: 150, result: "High Risk" },
                { id: 2, age: 30, glucose: 120, result: "Low Risk" },
                { id: 3, age: 45, glucose: 180, result: "High Risk" },
            ]
            setPredictions(fakePredictions)
        }, 1000)
    }, [])

    // Handle any input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // Handle form submit
    const handleSubmit = () => {
        if (!formData.age || !formData.glucose) {
            setError("Please fill all fields!")
            return
        }

        setLoading(true)
        setError(null)
        setResult(null)

        setTimeout(() => {
            const risk = formData.glucose > 140 ? "High Risk" : "Low Risk"
            setResult({
                result: risk,
                confidence: 87
            })
            setLoading(false)
        }, 1500)
    }

    return (
        <div>
            <h1>HealtPulse</h1>
            <p>AI Powered Disease Risk Checker</p>

            {/* Form Section */}
            <h2>Enter Health Data</h2>

            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                name="glucose"
                placeholder="Glucose"
                value={formData.glucose}
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                name="blood_pressure"
                placeholder="Blood Pressure"
                value={formData.blood_pressure}
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                name="bmi"
                placeholder="BMI"
                value={formData.bmi}
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                name="insulin"
                placeholder="Insulin"
                value={formData.insulin}
                onChange={handleChange}
            />
            <br />

            <button onClick={handleSubmit}>
                Check Risk
            </button>

            {/* Loading State */}
            {loading && <p>Calculating risk...</p>}

            {/* Error State */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Result State */}
            {result && (
                <div>
                    <h2>Result: {result.result}</h2>
                    <p>Confidence: {result.confidence}%</p>
                    {result.result === "High Risk" ? (
                        <p style={{ color: 'red' }}>
                            Please consult a doctor!
                        </p>
                    ) : (
                        <p style={{ color: 'green' }}>
                            You are doing well!
                        </p>
                    )}
                </div>
            )}

            <hr />

            {/* Show/Hide History */}
            <button onClick={() => setShowHistory(!showHistory)}>
                {showHistory ? "Hide History" : "Show History"}
            </button>

            {showHistory && (
                <div>
                    <h2>Prediction History</h2>
                    {predictions.length === 0 ? (
                        <p>No predictions yet!</p>
                    ) : (
                        predictions.map((prediction) => (
                            <div key={prediction.id}>
                                <p>ID: {prediction.id}</p>
                                <p>Age: {prediction.age}</p>
                                <p>Glucose: {prediction.glucose}</p>
                                <p>Result: {prediction.result}</p>
                                <hr />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default App