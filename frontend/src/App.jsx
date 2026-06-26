import HealthForm from './components/HealthForm'
import RiskResult from './components/RiskResult'
import HistoryList from './components/HistoryList'

function App() {
    return (
        <div>
            <h1>Welcome to HealtPulse!</h1>
            <p>AI Powered Disease Risk Checker</p>
            <HealthForm />
            <RiskResult result="High Risk" confidence={87} />
            <HistoryList />
        </div>
    )
}

export default App