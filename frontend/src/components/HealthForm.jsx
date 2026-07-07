function HealthForm({ formData, handleChange, handleSubmit, loading, error }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Enter Health Data</h2>

            <div className="flex flex-col gap-3">
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                    type="number"
                    name="glucose"
                    placeholder="Glucose"
                    value={formData.glucose}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                    type="number"
                    name="blood_pressure"
                    placeholder="Blood Pressure"
                    value={formData.blood_pressure}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                    type="number"
                    name="bmi"
                    placeholder="BMI"
                    value={formData.bmi}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                    type="number"
                    name="insulin"
                    placeholder="Insulin"
                    value={formData.insulin}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white font-medium px-4 py-2 rounded-md mt-4 hover:bg-purple-700 transition"
            >
                Check Risk
            </button>

            {loading && (
                <p className="text-purple-600 mt-4 animate-pulse">Calculating risk...</p>
            )}

            {error && (
                <div className="bg-red-50 border border-red-300 text-red-600 rounded-md p-3 mt-4">
                    {error}
                </div>
            )}
        </div>
    )
}

export default HealthForm