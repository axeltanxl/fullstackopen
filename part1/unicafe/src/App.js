import { useState } from 'react'

const Button = (props) => {
    return <button onClick={props.handleClick} >{props.text}</button>
}

const Row = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const sum = props.good + props.bad + props.neutral;

    if (sum === 0){
        return (
            <p>No feedback given</p>
        )
    }

    return (
        // <div>
        //     <StatisticLine text="good" value={props.good}></StatisticLine>
        //     <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
        //     <StatisticLine text="bad" value={props.bad}></StatisticLine>
        //     <StatisticLine text="all" value={sum}></StatisticLine>
        //     <StatisticLine text="average" value={(props.good + props.bad * -1)/sum}></StatisticLine>
        //     <StatisticLine text="positive" value={props.good/sum * 100 + " %"}></StatisticLine>
        // </div>
        <div>
            <table>
                <tbody>
                    <Row text="good" value={props.good}></Row>
                    <Row text="neutral" value={props.neutral}></Row>
                    <Row text="bad" value={props.bad}></Row>
                    <Row text="all" value={sum}></Row>
                    <Row text="average" value={(props.good + props.bad * -1)/sum}></Row>
                    <Row text="positive" value={props.good/sum * 100 + " %"}></Row>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGood} text="good"></Button>
            <Button handleClick={handleNeutral} text="neutral"></Button>
            <Button handleClick={handleBad} text="bad"></Button>
            <h2>statistics</h2>
            <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
        </div>
    )
}

export default App