import React from 'react';
import Options from './Options';

export default function Question({ question, dispatch, userAnswer }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options
                question={question}
                dispatch={dispatch}
                userAnswer={userAnswer}
            />
        </div>
    );
}
