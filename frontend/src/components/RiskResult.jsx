function RiskResult({ result }) {
    if (!result) return null

    const isHighRisk = result.result === 'High Risk'
    const accentColor = isHighRisk ? 'var(--danger)' : 'var(--accent)'

    const shapEntries = result.shap_contributions
        ? Object.entries(result.shap_contributions).sort(
              (a, b) => Math.abs(b[1]) - Math.abs(a[1])
          )
        : []

    const maxAbs = shapEntries.length
        ? Math.max(...shapEntries.map(([, v]) => Math.abs(v)))
        : 1

    const featureLabel = (key) =>
        key
            .split('_')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')

    return (
        <div
            className="hp-glass-panel hp-card hp-rise-in"
            style={{ padding: 22, borderLeft: `4px solid ${accentColor}` }}
        >
            <h2 style={{ fontSize: 17, marginBottom: 2 }}>
                {isHighRisk ? '⚠ High Risk' : '✓ Low Risk'}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>
                Confidence: {result.confidence}%
            </p>
            <p style={{ fontSize: 13, fontWeight: 500, color: accentColor, marginBottom: 14 }}>
                {isHighRisk ? 'Please consult a doctor!' : 'You are doing well!'}
            </p>

            {shapEntries.length > 0 && (
                <>
                    <p className="hp-label" style={{ marginBottom: 8 }}>
                        Feature Contribution (SHAP)
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {shapEntries.map(([feature, value], i) => {
                            const isRiskFeature = value > 0
                            const pct = (Math.abs(value) / maxAbs) * 100
                            return (
                                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span
                                        style={{
                                            width: 118,
                                            fontSize: 12,
                                            color: 'var(--text)',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {featureLabel(feature)}
                                    </span>
                                    <div
                                        style={{
                                            flex: 1,
                                            height: 10,
                                            borderRadius: 6,
                                            background: 'rgba(18,24,43,0.06)',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <div
                                            className="hp-bar"
                                            style={{
                                                height: '100%',
                                                width: `${pct}%`,
                                                borderRadius: 6,
                                                background: isRiskFeature ? 'var(--danger)' : 'var(--accent)',
                                                animationDelay: `${i * 0.06}s`,
                                            }}
                                        />
                                    </div>
                                    <span
                                        style={{
                                            width: 48,
                                            textAlign: 'right',
                                            fontSize: 11,
                                            fontFamily: 'var(--mono)',
                                            color: 'var(--text)',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {value > 0 ? '+' : ''}
                                        {value.toFixed(2)}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text)', marginTop: 10 }}>
                        <span style={{ color: 'var(--danger)' }}>■</span> increases risk &nbsp;
                        <span style={{ color: 'var(--accent)' }}>■</span> decreases risk
                    </p>
                </>
            )}
        </div>
    )
}

export default RiskResult