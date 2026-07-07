function RiskResult({ result }) {
    if (!result) {
        return null
    }

    return (
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
    )
}

export default RiskResult