function HealthForm() {
    return (
        <div>
            <h2>Enter Health Data</h2>
            <input type="number" placeholder="Age" />
            <input type="number" placeholder="Glucose" />
            <input type="number" placeholder="Blood Pressure" />
            <input type="number" placeholder="BMI" />
            <input type="number" placeholder="Insulin" />
            <button>Check Risk</button>
        </div>
    )
}

export default HealthForm