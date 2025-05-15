import { useEffect, useReducer } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from '../Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    //'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
    userAnswer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
};

function reducer(oldState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'dataReceived': {
            return {
                ...oldState,
                questions: payload,
                status: 'ready',
            };
        }
        case 'dataFailed': {
            return { ...initialState, status: 'error' };
        }
        case 'start': {
            return {
                ...oldState,
                status: 'active',
                secondsRemaining: oldState.questions.length * SECS_PER_QUESTION,
            };
        }

        case 'newAnswer': {
            const question = oldState.questions[oldState.index];

            return {
                ...oldState,
                userAnswer: payload,
                points:
                    payload === question.correctOption
                        ? oldState.points + question.points
                        : oldState.points,
            };
        }

        case 'nextQuestion': {
            return {
                ...oldState,
                index: oldState.index + 1,
                userAnswer: null,
            };
        }

        case 'finish': {
            return {
                ...oldState,
                status: 'finished',
                highScore:
                    oldState.points > oldState.highScore
                        ? oldState.points
                        : oldState.highScore,
            };
        }

        case 'restart': {
            return {
                ...initialState,
                questions: oldState.questions,
                status: 'ready',
                highScore: oldState.highScore,
            };
        }

        case 'tick': {
            return {
                ...oldState,
                secondsRemaining: oldState.secondsRemaining - 1,
                status:
                    oldState.secondsRemaining === 0
                        ? 'finished'
                        : oldState.status,
            };
        }

        default:
            throw new Error('The action is unknown');
    }
}

export default function App() {
    const [
        {
            questions,
            status,
            index,
            userAnswer,
            points,
            highScore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (sum, question) => sum + question.points,
        0
    );

    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((response) => response.json())
            .then((data) =>
                dispatch({
                    type: 'dataReceived',
                    payload: data,
                })
            )
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'dataFailed',
                });
            });
    }, []);

    return (
        <div className='app'>
            <Header />
            <Main className='main'>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === 'active' && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={questions.length}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            userAnswer={userAnswer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            userAnswer={userAnswer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                dispatch={dispatch}
                                userAnswer={userAnswer}
                                index={index}
                                questions={questions}
                            />
                        </Footer>
                    </>
                )}
                {status === 'finished' && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highScore={highScore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
