function HealthForm({ formData, handleChange, handleSubmit, loading, error }) {
    const isFemale = formData.gender === 'female'

    return (
        <div>
          

            <div className="flex flex-col gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full"
                        style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                    >
                        <option value="">Select gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Age</label>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full"
                        style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                    />
                </div>

                {isFemale && (
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Pregnancies</label>
                        <input
                            type="number"
                            name="pregnancies"
                            placeholder="Pregnancies"
                            value={formData.pregnancies}
                            onChange={handleChange}
                            className="rounded-md p-2 w-full"
                            style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Glucose</label>
                    <input
                        type="number"
                        name="glucose"
                        placeholder="Glucose"
                        value={formData.glucose}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full"
                        style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Blood Pressure</label>
                    <input
                        type="number"
                        name="blood_pressure"
                        placeholder="Blood Pressure"
                        value={formData.blood_pressure}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full"
                        style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>BMI</label>
                    <input
                        type="number"
                        name="bmi"
                        placeholder="BMI"
                        value={formData.bmi}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full"
                        style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Skin Thickness</label>
                    <input
                        type="number"
                        name="skin_thickness"
                        placeholder="Skin Thickness"
                        value={formData.skin_thickness}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full"
                        style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Insulin</label>
                    <input
                        type="number"
                        name="insulin"
                        placeholder="Insulin"
                        value={formData.insulin}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full"
                        style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Diabetes Pedigree Function</label>
                    <input
                        type="number"
                        step="0.01"
                        name="diabetes_pedigree_function"
                        placeholder="Diabetes Pedigree Function"
                        value={formData.diabetes_pedigree_function}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full"
                        style={{ border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
                    />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="font-medium px-4 py-2 rounded-md mt-4 transition"
                style={
                    loading
                        ? { background: 'var(--border)', color: 'var(--text)', cursor: 'not-allowed' }
                        : { background: 'var(--accent)', color: '#fff' }
                }
            >
                {loading ? "Checking..." : "Check Risk"}
            </button>

            {loading && (
                <p className="mt-4 animate-pulse" style={{ color: 'var(--accent)' }}>Calculating risk...</p>
            )}

            {error && (
                <div className="rounded-md p-3 mt-4" style={{ background: 'var(--accent-bg)', border: '1px solid #C4573B', color: '#C4573B' }}>
                    {error}
                </div>
            )}
        </div>
    )
}

export default HealthForm