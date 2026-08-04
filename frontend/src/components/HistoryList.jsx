import { usePredictions } from '../context/PredictionContext'

function HistoryList() {
    const { predictions, handleDelete } = usePredictions()

    return (
        <div className="mt-6 text-left">
            <h2 className="text-lg mb-3" style={{ fontFamily: 'var(--heading)', fontWeight: 500, color: 'var(--text-h)' }}>
                Prediction History
            </h2>
            {predictions.length === 0 ? (
                <p style={{ color: 'var(--text)' }}>No predictions yet!</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {predictions.map((prediction) => {
                        const isHighRisk = prediction.result === "High Risk"
                        const riskColor = isHighRisk ? '#C4573B' : '#5B8C6E'
                        return (
                            <div
                                key={prediction.id}
                                className="rounded-md p-3 text-sm"
                                style={{
                                    background: 'var(--code-bg)',
                                    border: '1px solid var(--border)',
                                    borderLeft: `3px solid ${riskColor}`
                                }}
                            >
                                <p style={{ color: 'var(--text)' }}>ID: {prediction.id}</p>
                                {prediction.pregnancies !== null && prediction.pregnancies !== undefined && (
                                    <p style={{ color: 'var(--text)' }}>Pregnancies: {prediction.pregnancies}</p>
                                )}
                                <p style={{ color: 'var(--text)' }}>Age: {prediction.age}</p>
                                <p style={{ color: 'var(--text)' }}>Glucose: {prediction.glucose}</p>
                                <p style={{ fontWeight: 500, color: 'var(--text-h)' }}>
                                    Result: <span style={{ color: riskColor }}>{prediction.result}</span>
                                </p>
                                <button
                                    onClick={() => handleDelete(prediction.id)}
                                    className="mt-2 text-xs font-medium px-2 py-1 rounded transition"
                                    style={{ background: 'var(--accent-bg)', color: '#C4573B' }}
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default HistoryList