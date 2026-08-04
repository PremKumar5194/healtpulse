import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'

function RiskResult({ result }) {
    if (!result) {
        return null
    }

    const isHighRisk = result.result === "High Risk"
    const riskColor = isHighRisk ? '#C4573B' : '#5B8C6E'

    const chartData = result.shap_contributions
        ? Object.entries(result.shap_contributions)
            .map(([feature, value]) => ({ feature, value }))
            .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        : []

    return (
        <div
            className="p-5 rounded-xl"
            style={{ background: 'var(--code-bg)', border: '1px solid var(--border)' }}
        >
            <p
                className="text-xs uppercase tracking-wide mb-1"
                style={{ color: 'var(--text)', letterSpacing: '0.04em' }}
            >
                Result

            </p>
            <p
                className="mb-4"
                style={{ fontFamily: 'var(--heading)', fontWeight: 500, fontSize: '22px', color: riskColor }}
            >
                {result.result}
            </p>

            <p className="text-xs mb-1" style={{ color: 'var(--text)' }}>Confidence</p>
            <p
                className="mb-1"
                style={{ fontFamily: 'var(--mono)', fontWeight: 500, fontSize: '34px', color: 'var(--text-h)' }}
            >
                {(result.confidence * 100).toFixed(1)}%
            </p>

            <svg width="100%" height="24" viewBox="0 0 240 24" style={{ marginBottom: '16px' }}>
                <polyline
                    points="0,14 20,10 40,16 60,8 80,18 100,6 120,14 140,4 160,12 180,8 200,16 220,6 240,10"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    opacity="0.5"
                />
            </svg>

            {isHighRisk ? (
                <p className="font-medium mb-4" style={{ color: riskColor }}>Please consult a doctor!</p>
            ) : (
                <p className="font-medium mb-4" style={{ color: riskColor }}>You are doing well!</p>
            )}

            {chartData.length > 0 && (
                <div className="mt-4">
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                        What influenced this result
                    </p>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text)' }} />
                            <YAxis
                                type="category"
                                dataKey="feature"
                                width={110}
                                tick={{ fontSize: 11, fill: 'var(--text)' }}
                            />
                            <Tooltip formatter={(value) => value.toFixed(3)} />
                            <Bar dataKey="value">
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.value >= 0 ? "#C4573B" : "#5B8C6E"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs mt-2" style={{ color: 'var(--text)' }}>
                        Clay = pushes risk higher, sage = pushes risk lower
                    </p>
                </div>
            )}
        </div>
    )
}

export default RiskResult