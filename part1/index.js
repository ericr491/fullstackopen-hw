import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick} > {text} </button>
    )
}

const Statistics = ({ text, value }) => {

    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anecdote = ({ title, numVotes, text }) => {
    return (
        <div>
            <h1>{title}</h1>
            {text} <br></br>
            has {numVotes} votes
        </div>
    )
}

const App = (props) => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + neutral + bad

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

    const vote = (selected) => () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    const mostVotes = (votes) => {
        const copy = [...votes]
        return (copy.indexOf(Math.max(...copy)))
    }



    return (
        <div>
            <div>
                <h1>Give feedback</h1>
                <Button text="good" onClick={() => setGood(good + 1)} />
                <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
                <Button text="bad" onClick={() => setBad(bad + 1)} />
            </div>
            <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <Statistics text="good" value={good} />
                        <Statistics text="neutral" value={neutral} />
                        <Statistics text="bad" value={bad} />
                        <Statistics text="all" value={all} />
                        <Statistics text="average" value={(good - bad) / all} />
                        <Statistics text="positive" value={(good / all * 100) + ' %'} />
                    </tbody>
                </table>
            </div>

            <br></br>

            <div>
                <Anecdote title="Anecdote of the day" numVotes={votes[selected]} text={props.anecdotes[selected]} />
                <Button text="next anecdote" onClick={() => setSelected((selected + 1) % 6)} />
                <Button text="vote" onClick={vote(selected)} />

                <Anecdote title="Anecdote with most votes" numVotes={votes[mostVotes(votes)]} text={props.anecdotes[mostVotes(votes)]} />
            </div>
        </div>
    )
}

ReactDOM.render(< App anecdotes={anecdotes} />, document.getElementById('root'))