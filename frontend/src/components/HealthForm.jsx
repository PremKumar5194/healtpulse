import { useState, useEffect, useRef } from 'react'

function HealthForm({ formData, handleChange, handleSubmit, loading, error }) {
    const isFemale = formData.gender === 'female'

    return (
        <div className="hp-glass-panel hp-card hp-rise-in" style={{ padding: 22 }}>
            <div className="mb-5">
                <p
                    className="text-[11px] font-semibold uppercase mb-1"
                    style={{ color: 'var(--accent)', letterSpacing: '0.14em' }}
                >
                    Patient Vitals
                </p>
                <h2 style={{ fontSize: '20px' }}>Health Assessment</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {/* Gender — custom dropdown, fixes native <select> white-panel issue */}
                <CustomSelect
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={[
                        { value: 'female', label: 'Female' },
                        { value: 'male', label: 'Male' },
                    ]}
                    icon={
                        <path d="M12 8v0" strokeLinecap="round" />
                    }
                    genderIcon
                />

                {/* Age */}
                <Field
                    label="Age" name="age" unit="yrs" placeholder="34"
                    value={formData.age} onChange={handleChange}
                    icon={<path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />}
                    circle
                />

                {/* Pregnancies — conditional, female only */}
                {isFemale && (
                    <Field
                        label="Pregnancies" name="pregnancies" unit="count" placeholder="0"
                        value={formData.pregnancies} onChange={handleChange}
                        icon={<><circle cx="9" cy="9" r="3.2" /><circle cx="15" cy="15" r="3.2" /></>}
                    />
                )}

                {/* Glucose */}
                <Field
                    label="Glucose" name="glucose" unit="mg/dL" placeholder="120"
                    value={formData.glucose} onChange={handleChange}
                    icon={<path d="M12 3c3 4 6 7.4 6 11a6 6 0 1 1-12 0c0-3.6 3-8 6-11Z" strokeLinejoin="round" />}
                />

                {/* Blood Pressure */}
                <Field
                    label="Blood Pressure" name="blood_pressure" unit="mmHg" placeholder="80"
                    value={formData.blood_pressure} onChange={handleChange}
                    icon={<path d="M12 20.5s-7-4.6-7-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7 3.3c0 5.6-7 10.2-7 10.2Z" strokeLinejoin="round" />}
                />

                {/* BMI */}
                <Field
                    label="BMI" name="bmi" unit="kg/m²" placeholder="24.5"
                    value={formData.bmi} onChange={handleChange}
                    icon={<><rect x="4" y="3.5" width="16" height="17" rx="2" /><path d="M8 8h2M8 12h2M8 16h2" strokeLinecap="round" /></>}
                />

                {/* Skin Thickness */}
                <Field
                    label="Skin Thickness" name="skin_thickness" unit="mm" placeholder="20"
                    value={formData.skin_thickness} onChange={handleChange}
                    icon={<path d="M4 12h16M4 12v-3M8 12v-2M12 12v-4M16 12v-2M20 12v-3" strokeLinecap="round" />}
                />

                {/* Insulin */}
                <Field
                    label="Insulin" name="insulin" unit="µU/mL" placeholder="85"
                    value={formData.insulin} onChange={handleChange}
                    icon={<path d="M5 19 15 9M13 4l7 7-2.5 2.5L10 6l2.5-2.5-.02.02M7 17l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />}
                />

                {/* Diabetes Pedigree Function — full width, decimal */}
                <div className="col-span-2">
                    <Field
                        label="Diabetes Pedigree Function" name="diabetes_pedigree_function" unit="score" placeholder="0.45"
                        value={formData.diabetes_pedigree_function} onChange={handleChange}
                        icon={<path d="M4 18c3-1 3-10 6-10s3 9 6 9 3-6 4-6" strokeLinecap="round" strokeLinejoin="round" />}
                        step="0.01"
                    />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="hp-btn w-full font-medium rounded-lg mt-5 transition flex items-center justify-center gap-2"
                style={{
                    height: 44,
                    fontSize: 14,
                    fontFamily: 'var(--heading)',
                    fontWeight: 700,
                    border: 'none',
                    background: loading ? '#B7C6C3' : 'linear-gradient(135deg, var(--accent), #0EA5A0)',
                    color: '#fff',
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}
            >
                {loading ? (
                    <>
                        <span className="hp-spinner" />
                        Analyzing
                    </>
                ) : (
                    "Check Risk"
                )}
            </button>

            {error && (
                <div
                    className="hp-pop-in rounded-lg p-2.5 mt-3 text-[13px]"
                    style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger)', color: '#B4392E' }}
                >
                    {error}
                </div>
            )}
        </div>
    )
}

/* ---------- Custom glass dropdown (replaces native <select>) ---------- */
function CustomSelect({ label, name, value, onChange, options, genderIcon }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        function onDocClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', onDocClick)
        return () => document.removeEventListener('mousedown', onDocClick)
    }, [])

    const selected = options.find((o) => o.value === value)

    const select = (val) => {
        onChange({ target: { name, value: val } })
        setOpen(false)
    }

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <label className="hp-label">{label}</label>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="hp-field"
                style={{ justifyContent: 'space-between', cursor: 'pointer' }}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" width="15" height="15" style={{ flexShrink: 0 }}>
                        <circle cx="12" cy="8" r="3.2" />
                        <path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" strokeLinecap="round" />
                    </svg>
                    <span style={{ color: selected ? 'var(--text-h)' : 'var(--text)', fontSize: 14 }}>
                        {selected ? selected.label : 'Select'}
                    </span>
                </span>
                <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2"
                    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease', flexShrink: 0 }}
                >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <div
                    className="hp-glass-panel hp-pop-in"
                    style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 20, padding: 6, borderRadius: 12 }}
                >
                    {options.map((o) => (
                        <div
                            key={o.value}
                            onClick={() => select(o.value)}
                            style={{
                                padding: '8px 10px',
                                borderRadius: 8,
                                fontSize: 14,
                                color: 'var(--text-h)',
                                cursor: 'pointer',
                                background: o.value === value ? 'var(--accent-bg)' : 'transparent',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-bg)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = o.value === value ? 'var(--accent-bg)' : 'transparent')}
                        >
                            {o.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

/* ---------- Shared numeric input field ---------- */
function Field({ label, name, unit, placeholder, value, onChange, icon, circle, step }) {
    return (
        <div>
            <label className="hp-label">{label}</label>
            <div className="hp-field">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" width="15" height="15" style={{ flexShrink: 0 }}>
                    {circle && <circle cx="12" cy="12" r="8" />}
                    {icon}
                </svg>
                <input
                    type="number"
                    step={step}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none text-[14px] min-w-0"
                    style={{ color: 'var(--text-h)', fontFamily: 'var(--mono)' }}
                />
                <span className="ml-1.5 shrink-0 text-[10.5px] font-medium" style={{ color: 'var(--text)' }}>
                    {unit}
                </span>
            </div>
        </div>
    )
}

export default HealthForm