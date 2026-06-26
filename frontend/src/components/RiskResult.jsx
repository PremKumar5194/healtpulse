function RiskResult({ result, confidence }) {
    if (!result) {
        return <p>No prediction yet. Submit your health data!</p>
    }

    return (
        <div>
            <h2>Prediction Result</h2>
            <p>Result: {result}</p>
            <p>Confidence: {confidence}%</p>
            {result === "High Risk" ? (
                <p>Please consult a doctor!</p>
            ) : (
                <p>You are doing well! Keep it up!</p>
            )}
        </div>
    )
}

export default RiskResult