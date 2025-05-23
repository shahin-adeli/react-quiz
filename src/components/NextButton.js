import React from 'react';

export default function NextButton({ dispatch, userAnswer, index, questions }) {
    if (userAnswer === null) return null;

    if (index < questions.length - 1) {
        return (
            <button
                className='btn btn-ui'
                onClick={() => dispatch({ type: 'nextQuestion' })}
            >
                Next
            </button>
        );
    }

    if (index === questions.length - 1) {
        return (
            <button
                className='btn btn-ui'
                onClick={() => dispatch({ type: 'finish' })}
            >
                Finish
            </button>
        );
    }
}
