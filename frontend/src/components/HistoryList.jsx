import { usePredictions } from '../context/PredictionContext'
function HistoryList() {
    const { predictions, handleDelete } = usePredictions()

    return (
        <div className="mt-4 text-left">
            <h2 className="text-lg font-semibold mb-2">Prediction History</h2>
            {predictions.length === 0 ? (
                <p className="text-gray-500">No predictions yet!</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {predictions.map((prediction) => {
                        const isHighRisk = prediction.result === "High Risk"
                        return (
                            <div
                                key={prediction.id}
                                className={`border-l-4 rounded-md p-3 text-sm bg-white border border-gray-200 ${
                                    isHighRisk ? "border-l-red-400" : "border-l-green-400"
                                }`}
                            >
                                <p>ID: {prediction.id}</p>
                                <p>Age: {prediction.age}</p>
                                <p>Glucose: {prediction.glucose}</p>
                                <p className="font-medium">Result: {prediction.result}</p>
                                <button
                                    onClick={() => handleDelete(prediction.id)}
                                    className="mt-2 bg-red-50 text-red-600 text-xs font-medium px-2 py-1 rounded hover:bg-red-100 transition"
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default HistoryList