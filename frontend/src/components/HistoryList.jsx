function HistoryList({ predictions }) {
    return (
        <div className="mt-4 text-left">
            <h2 className="text-lg font-semibold mb-2">Prediction History</h2>
            {predictions.length === 0 ? (
                <p className="text-gray-500">No predictions yet!</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {predictions.map((prediction) => (
                        <div
                            key={prediction.id}
                            className="border border-gray-200 rounded-md p-3 text-sm"
                        >
                            <p>ID: {prediction.id}</p>
                            <p>Age: {prediction.age}</p>
                            <p>Glucose: {prediction.glucose}</p>
                            <p className="font-medium">Result: {prediction.result}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default HistoryList