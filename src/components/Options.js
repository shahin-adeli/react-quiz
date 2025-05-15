export default function Option({ question, dispatch, userAnswer }) {
    const hasAnswered = userAnswer !== null;
    return (
        <div className='options'>
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option 
                    ${index === userAnswer ? 'answer' : ''} 
                    ${
                        hasAnswered &&
                        (index === question.correctOption ? 'correct' : 'wrong')
                    }`}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() =>
                        dispatch({ type: 'newAnswer', payload: index })
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
