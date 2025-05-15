import React from 'react';

export default function FinishScreen({
    points,
    maxPossiblePoints,
    highScore,
    dispatch,
}) {
    const percentage = (points / maxPossiblePoints) * 100;

    let emoji = '🙈';

    if (percentage === 100) {
        emoji = '🥇';
    } else if (percentage >= 80) {
        emoji = '🎉';
    } else if (percentage >= 50) {
        emoji = '🙃';
    } else if (percentage > 0) {
        emoji = '🤨';
    }

    return (
        <>
            <p className='result'>
                <span>🧐</span> You scored <strong>{points}</strong> out of{' '}
                {maxPossiblePoints} ({Math.ceil(percentage)}%)
                <span> {emoji}</span>
            </p>

            <p className='highscore'>(Highscore : {highScore} points)</p>

            <button
                className='btn btn-ui'
                onClick={() => dispatch({ type: 'restart' })}
            >
                Restart Quiz
            </button>
        </>
    );
}
