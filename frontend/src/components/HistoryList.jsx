function HistoryList() {
    const predictions = [
        { id: 1, age: 25, glucose: 150, result: "High Risk" },
        { id: 2, age: 30, glucose: 120, result: "Low Risk" },
        { id: 3, age: 45, glucose: 180, result: "High Risk" },
    ]

    return (
        <div>
            <h2>Prediction History</h2>
            {predictions.map((prediction) => (
                <div key={prediction.id}>
                    <p>ID: {prediction.id}</p>
                    <p>Age: {prediction.age}</p>
                    <p>Glucose: {prediction.glucose}</p>
                    <p>Result: {prediction.result}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default HistoryList