import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'

function RiskResult({ result }) {
    if (!result) {
        return null
    }

    const isHighRisk = result.result === "High Risk"

    const chartData = result.shap_contributions
        ? Object.entries(result.shap_contributions)
            .map(([feature, value]) => ({ feature, value }))
            .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        : []

    return (
        <div className={`mt-6 p-4 rounded-md border ${
            isHighRisk
                ? "bg-red-50 border-red-300"
                : "bg-green-50 border-green-300"
        }`}>
            <h2 className="text-lg font-semibold mb-1">
                {isHighRisk ? "⚠️" : "✅"} Result: {result.result}
            </h2>
            <p className="text-gray-600 mb-2">
                Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
            {isHighRisk ? (
                <p className="text-red-600 font-medium mb-4">Please consult a doctor!</p>
            ) : (
                <p className="text-green-600 font-medium mb-4">You are doing well!</p>
            )}

            {chartData.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        What influenced this result
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="feature" width={110} tick={{ fontSize: 12 }} />
                            <Tooltip
                                formatter={(value) => value.toFixed(3)}
                            />
                            <Bar dataKey="value">
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.value >= 0 ? "#ef4444" : "#22c55e"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-500 mt-2">
                        Red = pushes risk higher, Green = pushes risk lower
                    </p>
                </div>
            )}
        </div>
    )
}

export default RiskResult