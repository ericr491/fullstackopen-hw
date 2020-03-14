import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
    const content = () => parts.map((part) =>
        <Part name={part.name} key={part.id} exercises={part.exercises} />

    )

    return (
        // returns an array
        <div>
            {content()}
        </div>
    )
}

export default Content