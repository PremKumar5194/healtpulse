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
       <div className="max-w-md mx-auto mt-10 p-6">
    <h1 className="text-3xl font-bold text-center mb-2">HealtPulse</h1>
    <p className="text-center text-gray-500 mb-6">AI Powered Disease Risk Checker</p>
            {/* Form Section */}
  <h2 className="text-xl font-semibold mb-4">Enter Health Data</h2>

<div className="flex flex-col gap-3">
    <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full"
    />
    <input
        type="number"
        name="glucose"
        placeholder="Glucose"
        value={formData.glucose}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full"
    />
    <input
        type="number"
        name="blood_pressure"
        placeholder="Blood Pressure"
        value={formData.blood_pressure}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full"
    />
    <input
        type="number"
        name="bmi"
        placeholder="BMI"
        value={formData.bmi}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full"
    />
    <input
        type="number"
        name="insulin"
        placeholder="Insulin"
        value={formData.insulin}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full"
    />
</div>

           <button
    onClick={handleSubmit}
    className="bg-purple-600 text-white font-medium px-4 py-2 rounded-md mt-4 hover:bg-purple-700 transition"
>
    Check Risk
</button>

          {/* Loading State */}
{loading && (
    <p className="text-purple-600 mt-4 animate-pulse">Calculating risk...</p>
)}

{/* Error State */}
{error && (
    <div className="bg-red-50 border border-red-300 text-red-600 rounded-md p-3 mt-4">
        {error}
    </div>
)}

           {result && (
    <div className={`mt-6 p-4 rounded-md border ${
        result.result === "High Risk"
            ? "bg-red-50 border-red-300"
            : "bg-green-50 border-green-300"
    }`}>
        <h2 className="text-lg font-semibold mb-1">Result: {result.result}</h2>
        <p className="text-gray-600 mb-2">Confidence: {result.confidence}%</p>
        {result.result === "High Risk" ? (
            <p className="text-red-600 font-medium">
                Please consult a doctor!
            </p>
        ) : (
            <p className="text-green-600 font-medium">
                You are doing well!
            </p>
        )}
    </div>
)}

          <button
    onClick={() => setShowHistory(!showHistory)}
    className="mt-6 text-purple-600 underline hover:text-purple-800"
>
    {showHistory ? "Hide History" : "Show History"}
</button>

{showHistory && (
    <div className="mt-4 text-left">
        <h2 className="text-lg font-semibold mb-2">Prediction History</h2>
        {predictions.length === 0 ? (
            <p className="text-gray-500">No predictions yet!</p>
        ) : (
            <div className="flex flex-col gap-2">
                {predictions.map((prediction) => (
                    <div
                        key={prediction.id}
                        className="border border-gray-200 rounded-md p-3 text-sm"
                    >
                        <p>ID: {prediction.id}</p>
                        <p>Age: {prediction.age}</p>
                        <p>Glucose: {prediction.glucose}</p>
                        <p className="font-medium">Result: {prediction.result}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
)}
        </div>
    )
}

export default App