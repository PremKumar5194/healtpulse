import axios from 'axios'
import { useState } from 'react'
import RiskResult from './components/RiskResult'
import HealthForm from './components/HealthForm'
import HistoryList from './components/HistoryList'
import { usePredictions } from './context/PredictionContext'

/* ---------- Ambient drifting background ---------- */
function AmbientBackground() {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
            <div
                className="hp-blob"
                style={{ width: 480, height: 480, background: '#14B8A6', top: -140, left: -120, animationDuration: '22s' }}
            />
            <div
                className="hp-blob"
                style={{ width: 420, height: 420, background: '#C7B6FF', bottom: -160, right: -100, animationDuration: '26s', animationDelay: '-8s' }}
            />
            <div
                className="hp-blob"
                style={{ width: 320, height: 320, background: '#FF6B5D', bottom: 60, left: '38%', animationDuration: '30s', animationDelay: '-4s', opacity: 0.18 }}
            />
        </div>
    )
}

/* ---------- ECG pulse-line header signature ---------- */
function PulseLine({ state }) {
    // state: 'idle' | 'calm' | 'alert'
    const color = state === 'alert' ? 'var(--danger)' : 'var(--accent)'
    const duration = state === 'alert' ? '0.9s' : state === 'calm' ? '2.6s' : '3.4s'
    const seg = 'M0,30 L54,30 L64,8 L76,52 L86,14 L96,46 L106,30 L200,30'
    const offsets = [0, 200, 400, 600, 800, 1000, 1200, 1400]

    return (
        <div style={{ width: '100%', overflow: 'hidden', height: 34, opacity: 0.9 }}>
            <svg
                viewBox="0 0 800 60"
                preserveAspectRatio="none"
                style={{ width: 1600, height: 34, display: 'block', animation: `hp-marquee ${duration} linear infinite` }}
            >
                {offsets.map((x) => (
                    <path
                        key={x}
                        d={seg}
                        transform={`translate(${x},0)`}
                        fill="none"
                        stroke={color}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transition: 'stroke 0.4s ease' }}
                    />
                ))}
            </svg>
        </div>
    )
}

const INITIAL_FORM = {
    gender: '',
    age: '',
    pregnancies: '',
    glucose: '',
    blood_pressure: '',
    bmi: '',
    skin_thickness: '',
    insulin: '',
    diabetes_pedigree_function: '',
}

const REQUIRED_FIELDS = ['gender', 'age', 'glucose', 'blood_pressure', 'bmi', 'skin_thickness', 'insulin', 'diabetes_pedigree_function']

function App() {
    const [formData, setFormData] = useState(INITIAL_FORM)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showHistory, setShowHistory] = useState(false)

    const { fetchHistory } = usePredictions()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        // Use === '' (not falsy) so a legitimate 0 value doesn't get rejected
        const missing = REQUIRED_FIELDS.some((field) => formData[field] === '')
        if (missing) {
            setError('Please fill all required fields!')
            return
        }

        setLoading(true)
        setError(null)
        setResult(null)

        // Backend stores null for male pregnancies; ML pipeline gets 0 as placeholder
        const payload = {
            ...formData,
            pregnancies:
                formData.gender === 'female'
                    ? formData.pregnancies === '' ? 0 : formData.pregnancies
                    : null,
        }

        try {
            const response = await axios.post('http://localhost:8000/predictions/', payload)
            setResult(response.data)
            fetchHistory()
        } catch (err) {
            console.error('Prediction failed:', err)
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const pulseState = loading ? 'calm' : result ? (result.result === 'High Risk' ? 'alert' : 'calm') : 'idle'

    return (
        <div style={{ minHeight: '100svh', position: 'relative' }}>
            <AmbientBackground />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 920, margin: '0 auto', padding: '36px 20px' }}>
                <div className="hp-rise-in" style={{ textAlign: 'center', marginBottom: 18 }}>
                    <p
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.18em',
                            color: 'var(--accent)',
                            textTransform: 'uppercase',
                        }}
                    >
                        Diabetes Risk · AI Assessment
                    </p>
                    <h1 style={{ fontWeight: 800, fontSize: 30, margin: '4px 0 10px' }}>HealthPulse</h1>
                    <PulseLine state={pulseState} />
                </div>

                {/* Side-by-side: form on the left, result on the right. Stacks on small screens. */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 20,
                        alignItems: 'start',
                    }}
                    className="hp-check-grid"
                >
                    <div className="hp-rise-in" style={{ animationDelay: '.08s' }}>
                        <HealthForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                        />
                    </div>

                    <div className="hp-rise-in" style={{ animationDelay: '.14s' }}>
                        {result ? (
                            <RiskResult result={result} />
                        ) : (
                            <div
                                className="hp-glass-panel hp-card"
                                style={{
                                    padding: 22,
                                    minHeight: 200,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    gap: 8,
                                }}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" style={{ opacity: 0.7 }}>
                                    <path d="M12 3c3 4 6 7.4 6 11a6 6 0 1 1-12 0c0-3.6 3-8 6-11Z" strokeLinejoin="round" />
                                </svg>
                                <p style={{ fontSize: 13, color: 'var(--text)' }}>
                                    {loading ? 'Analyzing vitals…' : 'Your risk result will appear here'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--accent)',
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: 'pointer',
                        }}
                    >
                        {showHistory ? 'Hide History' : 'Show History'}
                    </button>
                </div>

                {showHistory && <HistoryList />}
            </div>

            <style>{`
                @media (max-width: 720px) {
                    .hp-check-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    )
}

export default App