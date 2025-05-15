import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(oldState, action) {
    console.log(oldState, action);
    const { type, payload } = action;

    switch (type) {
        case 'dec': {
            return { ...oldState, count: oldState.count - oldState.step };
        }
        case 'inc': {
            return { ...oldState, count: oldState.count + oldState.step };
        }
        case 'setCount': {
            return { ...oldState, count: payload };
        }
        case 'setStep': {
            return { ...oldState, step: payload };
        }
        case 'reset': {
            return initialState;
        }
        default:
            throw new Error('Action is not valid');
    }
}

function DateCounter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const date = new Date('june 21 2027');
    date.setDate(date.getDate() + state.count);

    const dec = function () {
        dispatch({ type: 'dec' });
    };

    const inc = function () {
        dispatch({ type: 'inc' });
    };

    const defineCount = function (e) {
        dispatch({ type: 'setCount', payload: Number(e.target.value) });
    };

    const defineStep = function (e) {
        dispatch({ type: 'setStep', payload: Number(e.target.value) });
    };

    const reset = function () {
        dispatch({ type: 'reset' });
    };

    return (
        <div className='counter'>
            <div>
                <input
                    type='range'
                    min='0'
                    max='10'
                    value={state.step}
                    onChange={defineStep}
                />
                <span>{state.step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={state.count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
