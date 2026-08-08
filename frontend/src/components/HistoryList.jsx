import { usePredictions } from '../context/PredictionContext'

function HistoryList() {
    const { predictions, handleDelete } = usePredictions()

    return (
        <div className="mt-4 text-left">
            <h2 style={{ fontSize: 16, marginBottom: 10 }}>Prediction History</h2>

            {predictions.length === 0 ? (
                <p style={{ color: 'var(--text)', fontSize: 13 }}>No predictions yet!</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {predictions.map((prediction, i) => {
                        const isHighRisk = prediction.result === 'High Risk'
                        const accentColor = isHighRisk ? 'var(--danger)' : 'var(--accent)'

                        return (
                            <div
                                key={prediction.id}
                                className="hp-glass-panel hp-rise-in"
                                style={{
                                    borderRadius: 12,
                                    padding: 12,
                                    borderLeft: `3px solid ${accentColor}`,
                                    animationDelay: `${i * 0.06}s`,
                                    fontSize: 13,
                                }}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span style={{ color: 'var(--text-h)', fontWeight: 600 }}>
                                        #{prediction.id}
                                    </span>
                                    <span style={{ color: accentColor, fontWeight: 600 }}>
                                        {prediction.result}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '2px 12px',
                                        color: 'var(--text)',
                                        fontFamily: 'var(--mono)',
                                        fontSize: 11.5,
                                    }}
                                >
                                    <span>Gender: {prediction.gender ?? '—'}</span>
                                    <span>Age: {prediction.age}</span>
                                    {prediction.pregnancies !== null && prediction.pregnancies !== undefined && (
                                        <span>Pregnancies: {prediction.pregnancies}</span>
                                    )}
                                    <span>Glucose: {prediction.glucose}</span>
                                    <span>Blood Pressure: {prediction.blood_pressure}</span>
                                    <span>BMI: {prediction.bmi}</span>
                                    <span>Skin Thickness: {prediction.skin_thickness}</span>
                                    <span>Insulin: {prediction.insulin}</span>
                                    <span>Pedigree: {prediction.diabetes_pedigree_function}</span>
                                    <span>Confidence: {prediction.confidence}%</span>
                                </div>

                                <button
                                    onClick={() => handleDelete(prediction.id)}
                                    className="hp-btn"
                                    style={{
                                        marginTop: 8,
                                        fontSize: 11,
                                        fontWeight: 600,
                                        padding: '4px 10px',
                                        borderRadius: 8,
                                        border: '1px solid var(--danger)',
                                        background: 'var(--danger-bg)',
                                        color: '#B4392E',
                                        cursor: 'pointer',
                                    }}
                                >
                                    🗑 Delete
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