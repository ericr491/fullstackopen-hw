import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    // returns int
    const total = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <Course course={course} />
            <b>total of {total(course.parts)} exercises</b>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
